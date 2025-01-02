import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { GET_NEARBY_PLACES } from '../utils/queries';
import { useUserLocation} from "../utils/userLocation.ts";

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
            long: number
        }
    }
}


const NearbySearch: React.FC = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [nearbyPlaces, setNearbyPlaces] = useState<[]>([]);

    useUserLocation(setUserLocation);

    const { data, loading, error } = useQuery(GET_NEARBY_PLACES, {
        variables: {
            location: {
                latitude: userLocation ? userLocation.latitude : 0,
                longitude: userLocation ? userLocation.longitude : 0,
            },
            radius: 18000,
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
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <h1>Nearby Places</h1>
            <ul>
                {nearbyPlaces.map((place:Place) => (
                    <li key={place.name}>
                        <h2>{place.name}</h2>
                        <p>{place.vicinity}</p>
                        {place.photos && <img src={place.photos[0]} alt={place.name} />}
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NearbySearch;