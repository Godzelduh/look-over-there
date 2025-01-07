import React, { useState, useEffect, CSSProperties } from "react";
import clouds from '../assets/clouds.png';
import { useLazyQuery } from '@apollo/client';
import { GET_NEARBY_PLACES } from '../utils/queries';
import { useUserLocation } from "../utils/userLocation.ts";


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
    name: string;
    vicinity: string;
    photos: string[];
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

const Explore: React.FC = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationType, setLocationType] = useState<string>('tourist_attraction');
    const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);

    useUserLocation(setUserLocation);

    const [getNearbyPlaces, { data, loading, error }] = useLazyQuery(GET_NEARBY_PLACES);

    useEffect(() => {
        if (data) {
            setNearbyPlaces(data.nearbySearch);
        }
    }, [data]);

    const handleLocationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocationType(event.target.value);
    };

    const handleSearchClick = () => {
        if (userLocation) {
            getNearbyPlaces({
                variables: {
                    location: {
                        latitude: userLocation ? userLocation.latitude : 0,
                        longitude: userLocation ? userLocation.longitude : 0,
                    },
                    radius: 18000,
                    type: locationType,
                    excludedTypes: ['theme_park', 'zoo'],
                },
            });
        }
    };

    return (
        <div style={styles.container}>
                  <div className="clouds">
        <img src={clouds} alt="clouds" style={styles.image} />
      </div>
      <div className="clouds">
        <img src={clouds} alt="clouds" style={styles.image} />
      </div>
            <h2>Explore Nearby Places</h2>
            <div className='hunt-description'>Not up for a full scavenger hunt? Continue exploring your location by searching for places nearby!</div>
            <div className='search-bar'>
                <label htmlFor='searchbar' className='search-label'></label>
                <div className={'city-container'}>
                    <select className= "log-in" style={{ textAlign:"center", color:"black", fontSize: "20px"}} value={locationType} onChange={handleLocationTypeChange}>
                        <option value="tourist_attraction">Tourist Attractions</option>
                        <option value="museum">Museums</option>
                        <option value="restaurant">Restaurants</option>
                        <option value="park">Parks</option>
                    </select>
                    <br/>
                <button className= "log-in" style={{color: "black", fontSize: "20px"}} onClick={handleSearchClick}> Search </button>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}
                </div>
            </div>
                <div>
                    <ul>
                    {nearbyPlaces.map((place: Place) => (
                        <li key={place.name}>
                            <h2>{place.name}</h2>
                            <p>{place.vicinity}</p>
                            {place.photos && <img src={place.photos[0]} alt={place.name}/>}
                        </li>
                    ))}
                </ul>
                </div>

        </div>
            );
            };

            export default Explore;