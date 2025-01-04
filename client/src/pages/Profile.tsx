import React, { CSSProperties, useState, useEffect } from 'react';
import '../Styles/profile.css'; // Import the CSS file
import clouds from '../assets/clouds.png'; // Import the image
// import { useQuery } from '@apollo/client';
// import { GET_CHALLENGES } from '../utils/queries';
import { GET_CHALLENGES_NEAR } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { haversineDistance } from '../utils/locver';
import { MARK_CHALLENGE_COMPLETE } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Profile: React.FC = () => {
  const styles: { container: CSSProperties, image: CSSProperties, list: CSSProperties, card: CSSProperties } = {
    container: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '24px',
      color: '#333',
      position: 'relative', // Ensure the container is positioned relative
      overflow: 'hidden', // Hide overflow to ensure clouds don't show outside the container
    },
    image: {
      display: 'block',
      margin: '20px auto 0', // Center the image and add margin at the top
      maxWidth: '50%', // Ensure the image is responsive
      padding: '80px',
      height: 'auto',
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      maxWidth: '300px',
      textAlign: 'center',
    },
  };

   //  Query to fetch challenges
  // const { loading, error, data } = useQuery(GET_CHALLENGES);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [fetchChallengesNear, { loading, error, data }] = useLazyQuery(GET_CHALLENGES_NEAR);
  const [markChallengeComplete] = useMutation(MARK_CHALLENGE_COMPLETE);

    // Fetch user's GPS location
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setUserLocation(userLocation);
    
          console.log("Sending variables to GET_CHALLENGES_NEAR:", {
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            maxDistance: 5000,
          });
    
          fetchChallengesNear({
            variables: {
              location: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              maxDistance: 5000,
            },
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Failed to fetch location. Please enable location services.');
        }
      );
    }, [fetchChallengesNear]);
  
   console.log("User Location: ", userLocation); // Debug the user's location
    // Handle loading state
    if (loading) return <p>Loading challenges...</p>;
  
    // Handle error state
    if (error) return <p>Error fetching challenges: {error.message}</p>;
  
    // Destructure the challenges from data
    // const challenges = data?.getChallenges || [];
  
     // Extract challenges from data
     const challenges = data?.getChallengesNear || [];
    console.log("Challenges before the return in Profile.tsx : ",challenges); // Debug the data to confirm its structure
   const handleCompleteChallenge = async (challengeId: string) => {
      try {
        const { data } = await markChallengeComplete({
           variables: { id: challengeId },
           
         });
        alert(`Challenge marked as completed!`);
        console.log('Challenge completion response:', data);
      } catch (err) {
        console.error('Error marking challenge as completed:', err);
        alert('Error marking challenge as completed. Please try again.');
      }
    };

  return (
    <div style={styles.container}>
      <div className="clouds">
        <img src={clouds} alt="clouds" style={styles.image} />
      </div> {/* Add the clouds div */}
      {/* Other content can go here */}
      <h2>Your Challenges </h2>
      <div style={styles.list}>
        {challenges.map((challenge: any) => {
          const distance = userLocation
            ? haversineDistance(
                userLocation.lat,
                userLocation.lng,
                challenge.location.coordinates[1], // latitude
                challenge.location.coordinates[0] // longitude
              )
            : null;

          const isNear = distance !== null && distance <= 5500;

          return (
            <div key={challenge.id} style={styles.card}>
              <h3>{challenge.name}</h3>
              <p>Address: {challenge.address || 'Address not available'}</p>
              <p>
                Coordinates: {challenge.location.coordinates?.join(', ') || 'Coordinates not available'}
              </p>
              <p>Distance: {distance !== null ? `${Math.round(distance)} meters` : 'Calculating...'}</p>
              <img
                src={challenge.image_url || 'default-placeholder.jpg'}
                alt={challenge.name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '4px',
                }}
              />
              <button
                onClick={() => handleCompleteChallenge(challenge.id)}
                disabled={!isNear}
                style={{
                  width: '100%',
                  backgroundColor: isNear ? 'Green' : 'Red',
                  color: 'Black',
                  border: 'none',
                  // cursor: isNear ? 'pointer' : 'not-allowed',
                }}
              >
                {isNear ? 'Completed' : 'Not Near'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;