import React, { useState, useEffect } from 'react';

interface UserLocation {
    latitude: number;
    longitude: number;
}

const GPSLocation: React.FC = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

    useEffect(() => {
        const onSuccess = (position: GeolocationPosition) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            console.error('Error getting location:', error);
            // Handle location access error (e.g., user denied permission)
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div>
            {userLocation ? (
                <div>
                    Latitude: {userLocation.latitude}
                    <br />
                    Longitude: {userLocation.longitude}
                </div>
            ) : (
                <div>Getting location...</div>
            )}
        </div>
    );
};

export default GPSLocation;