import {haversineDistance} from "./coordinateDistance.ts";

interface Location {
    latitude: number;
    longitude: number;
}

interface TargetLocation {
    lat: number;
    lng: number;
}

export function verifyLocation(userLocation: Location, targetLocation: TargetLocation) {
    try {
        const calculatedDistance = haversineDistance(
            userLocation.latitude,
            userLocation.longitude,
            targetLocation.lat,
            targetLocation.lng
        );
        return {
            isAtLocation: calculatedDistance <= 100, // 100 feet
            distance: calculatedDistance,
        };
    } catch (error) {
        console.error('Error verifying location:', error);
        return {
            isAtLocation: false,
            distance: null,
        };
    }
}