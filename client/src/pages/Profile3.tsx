import React, { CSSProperties, useState, useEffect } from 'react';
import '../Styles/profile.css'; // Import the CSS file
import clouds from '../assets/clouds.png'; // Import the image
// import { useQuery } from '@apollo/client';
// import { GET_CHALLENGES } from '../utils/queries';
// import { GET_CHALLENGES_NEAR } from '../utils/queries';
import { GET_HUNTS_BY_USER } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { haversineDistance } from '../utils/locver';
// import { MARK_CHALLENGE_COMPLETE } from '../utils/mutations';
import { UPDATE_HUNT_PROGRESS } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth'; // Import the Auth module
import { FaSyncAlt } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<{ [key: string]: boolean }>({});
  const styles: { cardContainer: CSSProperties, h3: CSSProperties, cardFlip: CSSProperties, cardFace: CSSProperties, cardFront: CSSProperties, cardBack: CSSProperties, flipButton: CSSProperties } = {
    h3: {
      textAlign: 'left',
    },
    cardContainer: {
      width: '300px',
      height: '350px',
      margin: '15px',
 
    },
    cardFlip: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.8s',
    },
    cardFace: {
      position:'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    cardFront: {
      backgroundColor: 'grey',
    },
    cardBack: {
      
      backgroundColor: '#f8f9fa',
      transform: 'rotateY(180deg)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    flipButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '24px',
      cursor: 'pointer',
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '5px',
      borderRadius: '50%',
      zIndex: 1,
    }

  };


  //  Query to fetch challenges
  // const { loading, error, data } = useQuery(GET_CHALLENGES);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  //const [verificationButton, setVerificationButton] = useState("Verify Location");
  // const [fetchChallengesNear, { loading, error, data }] = useLazyQuery(GET_CHALLENGES_NEAR);
  // const [markChallengeComplete] = useMutation(MARK_CHALLENGE_COMPLETE);
  const [fetchHuntsByUser, { loading, error, data }] = useLazyQuery(GET_HUNTS_BY_USER);
  const [updateHuntProgress] = useMutation(UPDATE_HUNT_PROGRESS);

  // Fetch user's GPS location
  useEffect(() => {
    const fetchData = async () => {
      const userId = Auth.getProfile()?.data?._id;
      if (!userId) {
        console.error('No user ID found')
        return
      }

      console.log("User ID: inside useeffect ", userId);

      try {
        await fetchHuntsByUser({
          variables: { userId },
        });

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = { lat: latitude, lng: longitude };
            setUserLocation(userLocation);
          },
          (error) => {
            console.error('Error fetching location:', error);
            alert('Failed to fetch location. Please enable location services.');
          }
        );
      } catch (error) {
        console.error('Error fetching hunts:', error)
      }
    };
    console.log('Hunts:', hunts);
    console.log('First hunt challenges:', hunts[0]?.challenges);
    fetchData();

    // console.log("Sending variables to GET_CHALLENGES_NEAR:", {
    //   location: {
    //     type: 'Point',
    //     coordinates: [longitude, latitude],
    //   },
    //   maxDistance: 5000,
    // });

    // fetchChallengesNear({
    //   variables: {
    //     location: {
    //       type: 'Point',
    //       coordinates: [longitude, latitude],
    //     },
    //     maxDistance: 5000,
    //   },
    // });

  }, [fetchHuntsByUser]);

  const handleFlip = (challengeId: string) => {
    setFlippedCard(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));
  };
  console.log("User Location: ", userLocation); // Debug the user's location




  // Destructure the challenges from data
  // const challenges = data?.getChallenges || [];

  // Extract challenges from data
  //  const challenges = data?.getChallengesNear || [];
  const hunts = data?.getHuntsByUser || [];
  // console.log("Challenges before the return in Profile.tsx : ",challenges); // Debug the data to confirm its structure
  console.log("Hunt before the return in Profile.tsx : ", hunts); // Debug the data to confirm its structure
  //const challenges = hunts?.challenges || [];

  const handleCompleteChallenge = async (huntId: string, challengeId: string) => {
    try {
      //const userId = Auth.getProfile()?.data?._id;
      //console.log("User ID: ", userId);
      //const huntId = hunts.id;
      // const { data } = await markChallengeComplete({
      //    variables: { id: challengeId },

      //  });
      const userId = Auth.getProfile()?.data?._id;
      const { data } = await updateHuntProgress({
        variables: { huntId, challengeId, status: 'completed' },
        refetchQueries: [{
          query: GET_HUNTS_BY_USER,
          variables: { userId }
        }]
      });

      // console.log(verificationButton)
      alert(`Challenge marked as completed!`);
      console.log('Challenge completion response:', data);
    } catch (err) {
      console.error('Error marking challenge as completed:', err);
      alert('Error marking challenge as completed. Please try again.');
    }
  };

  // Handle loading state
  if (loading) return <p>Loading challenges...</p>;

  // Handle error state
  if (error) return <p>Error fetching challenges: {error.message}</p>;

  return (
    <div className="profile-container">
      <div className="clouds">
        <img src={clouds} alt="clouds" className="cloud-image" />
      </div>

      <h1>Your Active Hunts</h1>

      {hunts.map((hunt: any) => (
        <React.Fragment key={hunt.id}>
          <h3 style={styles.h3}>Hunt for {hunt.city}:</h3>

          <div className="scroll-container">
            <div className="card-container">
              {hunt.challenges.map((challenge: any) => {
                const distance = userLocation
                  ? haversineDistance(
                    userLocation.lat,
                    userLocation.lng,
                    challenge.location.coordinates[1],
                    challenge.location.coordinates[0]
                  )
                  : null;

                const isNear = distance !== null && distance <= 5000;
                const isCompleted = challenge.status === 'completed';
                const isFlipped = flippedCard[challenge.challenge_id];

                return (
                  <div style={styles.cardContainer} key={challenge.challenge_id}>
                    <div
                      style={{
                        ...styles.cardFlip,
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front side of the Card */}
                      <div style={{...styles.cardFace, ...styles.cardFront}} className="challenge-card">
                        <img
                          src={challenge.image_url || 'default-placeholder.jpg'}
                          alt={challenge.name}
                          className={`challenge-image ${isCompleted ? 'completed-image' : ''}`}
                        />
                        {isCompleted && (
                          <div className="checkmark-overlay">
                            <span>&#10003;</span>
                          </div>
                        )}
                        <button
                          onClick={() => handleCompleteChallenge(hunt.id, challenge.challenge_id)}
                          disabled={!isNear || isCompleted}
                          className={`verify-button ${isCompleted ? 'completed' : isNear ? 'near' : 'not-near'}`}
                        >
                          {isCompleted ? 'Completed' : isNear ? 'In Range, Verify Location' : 'Not Near'}
                        </button>
                        <div
                          onClick={() => handleFlip(challenge.challenge_id)}
                          style={styles.flipButton}
                        >
                          <FaSyncAlt />
                        </div>
                      </div>

                      {/* Back side of the Card */}
                      <div style={{...styles.cardFace, ...styles.cardBack}}>
                        <h3>Looking for a hint?</h3>
                        <div>
                          <h4>Name of Attraction: </h4>
                          <span>{challenge.name}</span>
                          <button className="log-in">Click to reveal!</button>
                        </div>
                        <div>
                          <h4>Distance from you to Location: </h4>
                          <span>{distance} meters </span>
                          <button className="log-in">Click to reveal!</button>
                        </div>

                        <div
                          onClick={() => handleFlip(challenge.challenge_id)}
                          style={styles.flipButton}
                        >
                          <FaSyncAlt />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Profile;