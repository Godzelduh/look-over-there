import {useEffect} from "react";

export function useUserLocation(setUserLocation: (location: { latitude: number; longitude: number }) => void) {
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
    }, [setUserLocation]);
}