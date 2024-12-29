import React, { useState, useEffect } from 'react';
import { haversineDistance } from '../utils/locver';
import { useQuery } from '@apollo/client';
import { GET_PLACES } from '../utils/queries';

interface UserLocation {
    latitude: number;
    longitude: number;
}

const GPSLocation: React.FC = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [isAtLocation, setIsAtLocation] = useState<boolean | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [targetLat, setTargetLat] = useState<number | null>(null);
    const [targetLng, setTargetLng] = useState<number | null>(null);
    const [query, setQuery] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { data, loading, error } = useQuery(GET_PLACES, {
        variables: { query: searchQuery + " Tourist Attraction" },
        skip: !searchQuery,
    });

    useEffect(() => {
        const onSuccess = (position: GeolocationPosition) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                //latitude: 29.418614370372968, //Use for dummy data
                //longitude: -98.48359925277157,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            console.error('Error getting location:', error);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (userLocation && data) {
            try {
                const targetLocation = data.textSearch[0].geometry.location;
                const targetName = data.textSearch[0].name;
                const calculatedDistance = haversineDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    targetLocation.lat,
                    targetLocation.lng
                );
                setIsAtLocation(calculatedDistance <= 100); // 100 feet
                setLocationName(targetName);
                setDistance(calculatedDistance);
                setTargetLat(targetLocation.lat);
                setTargetLng(targetLocation.lng);
            } catch (error) {
                console.error('Error verifying location:', error);
            }
        }
    }, [userLocation, data]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchQuery(query);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading location data.</div>;

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter target location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {userLocation ? (
                <div>
                    User:
                    <br />
                    Latitude: {userLocation.latitude}
                    <br />
                    Longitude: {userLocation.longitude}
                    <br />
                    {locationName && (
                        <div>
                            Location: {locationName}
                            <br />
                            Latitude: {targetLat}
                            <br />
                            Longitude: {targetLng}
                        </div>
                    )}
                    {distance !== null && <div>Distance: {distance.toFixed(2)} Meters</div>}
                    {isAtLocation !== null && (
                        <div>
                            {isAtLocation ? 'User is at the location.' : 'User is not at the location.'}
                        </div>
                    )}
                </div>
            ) : (
                <div>Getting location...</div>
            )}
        </div>
    );
};

export default GPSLocation;