import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_NEARBY_PLACES } from '../utils/queries';
import { CREATE_CHALLENGE } from '../utils/mutations';
import { useUserLocation } from "../utils/userLocation.ts";
import Auth from '../utils/auth';
import CarouselImageReel from '../components/CarouselImageReel';
import ChallengeCard from '../components/ChallangeCard';
import { CSSProperties } from 'react';

const styles: { container: CSSProperties; image: CSSProperties } = {
    container: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '24px',
        color: '#333',
    },
    image: {
        display: 'block',
        margin: '20px auto 0',
        maxWidth: '50%',
        padding: '80px',
        height: 'auto',
    },
};

interface UserLocation {
    latitude: number;
    longitude: number;
}
interface Place {
    name: string,
    vicinity: string,
    photos: [string]
    geometry: {
        location: {
            lat: number,
            lng: number
        }
    }
}

const NearbyTest: React.FC = () => {
    const [userLocation, setUserLocation] = useState<UserLocation  | null>(null);
    const [nearbyPlaces, setNearbyPlaces] = useState<[]>([]);
    const [createChallengeMutation] = useMutation(CREATE_CHALLENGE);

    useUserLocation(setUserLocation);

    const { data, loading, error } = useQuery(GET_NEARBY_PLACES, {
        variables: {
            location: {
                latitude: userLocation ? userLocation.latitude : 0,
                longitude: userLocation ? userLocation.longitude : 0,
            },
            radius: 5000,
            type: 'tourist_attraction',
            excludedTypes: ['theme_park', 'zoo'],
        },
        skip: !userLocation,
    });

    useEffect(() => {
        if (data) {
            setNearbyPlaces(data.nearbySearch);
        }
    }, [data]);

    const handleCreateChallenge = async () => {
        if (!Auth.loggedIn()) {
            alert('You need to be logged in to save a challenge!');
            return;
        }

        if (!nearbyPlaces || nearbyPlaces.length === 0) {
            console.error('No places available to create challenges.');
            return;
        }

        try {
            for (const place of nearbyPlaces as Place[]) {
                if (!place || !place.geometry || !place.geometry.location) {
                    console.error('Invalid place object:', place);
                    continue;
                }

                const location = {
                    type: "Point",
                    coordinates: [
                        place.geometry.location.lng,
                        place.geometry.location.lat,
                    ],
                    name: place.name || "Unnamed Location",
                };

                const image_url = place.photos?.[0] || 'default-placeholder.jpg';
                const type = "Tourist Attraction";
                const name = place.name || "Unnamed Challenge";
                try {
                    const { data } = await createChallengeMutation({
                        variables: { input: { type, location, image_url, name } },
                    });

                    if (data) {
                        console.log('Challenge created successfully:', data);
                    } else {
                        console.error('No data returned from mutation for place:', place);
                    }
                } catch (mutationError) {
                    console.error('Error saving challenge for place:', place, mutationError);
                }
            }

            alert('All challenges processed!');
        } catch (err) {
            console.error('Unexpected error while creating challenges:', err);
            alert('Failed to save challenges.');
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div style={styles.container}>
            <CarouselImageReel />
            {nearbyPlaces.length > 0 && (
                <div>
                    <ChallengeCard places={nearbyPlaces} />
                    <button
                        onClick={handleCreateChallenge}
                        type='submit'
                        className="log-in"
                    >Start Challenge!
                    </button>
                </div>
            )}
        </div>
    );
};

export default NearbyTest;