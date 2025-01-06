import React, { CSSProperties, useState, useEffect } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_HUNTS_BY_USER } from '../utils/queries';
import { UPDATE_HUNT_PROGRESS } from '../utils/mutations';
import { haversineDistance } from '../utils/locver';
import Auth from '../utils/auth';
import '../Styles/profile.css';

const styles: { h3: CSSProperties } = {
  h3: {
    textAlign: 'left',
    fontSize: '45px'
  }}

const Profile: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<{ [key: string]: boolean }>({});
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [fetchHuntsByUser, { loading, error, data }] = useLazyQuery(GET_HUNTS_BY_USER);
  const [updateHuntProgress] = useMutation(UPDATE_HUNT_PROGRESS);


  useEffect(() => {
    const fetchData = async () => {
      const userId = Auth.getProfile()?.data?._id;
      if (!userId) {
        console.error('No user ID found');
        return;
      }

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
        console.error('Error fetching hunts:', error);
      }
    };

    fetchData();
  }, [fetchHuntsByUser]);

  const handleFlip = (challengeId: string) => {
    setFlippedCard(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));
  };

  const handleCompleteChallenge = async (huntId: string, challengeId: string) => {
    try {
      const userId = Auth.getProfile()?.data?._id;
      const { data } = await updateHuntProgress({
        variables: { huntId, challengeId, status: 'completed' },
        refetchQueries: [{
          query: GET_HUNTS_BY_USER,
          variables: { userId }
        }]
      });
      alert('Challenge marked as completed!');
      console.log('Challenge completion response:', data);
    } catch (err) {
      console.error('Error marking challenge as completed:', err);
      alert('Error marking challenge as completed. Please try again.');
    }
  };

  if (loading) return <p>Loading challenges...</p>;
  if (error) return <p>Error fetching challenges: {error.message}</p>;

  const hunts = data?.getHuntsByUser || [];

  return (
    <div className="profile-container">
      <div className="clouds-background" />
      
      <h2>Your Active Hunts</h2>

      {hunts.map((hunt: any) => (
        <div key={hunt.id} className="hunt-section">
          <h3 className="hunt-title" style={styles.h3}>Hunt for {hunt.city}:</h3>

          <div className="scroll-container">
            <div className="card-scroll">
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
                  <div key={challenge.challenge_id} className="card-wrapper">
                    <div className={`card ${isFlipped ? 'flipped' : ''} ${isCompleted ? 'completed' : ''}`}>
                      <div className="card-inner">
                        {/* Front of card */}
                        <div className="card-front">
                          <div className="image-container">
                            <img
                              src={challenge.image_url || '/default-placeholder.jpg'}
                              alt={challenge.name}
                              className="card-image"
                            />
                            {isCompleted && (
                              <div className="checkmark">✓</div>
                            )}
                            <button
                              onClick={() => handleFlip(challenge.challenge_id)}
                              className="flip-button"
                            >
                              <FaSyncAlt />
                            </button>
                          </div>
                          <button
                            onClick={() => handleCompleteChallenge(hunt.id, challenge.challenge_id)}
                            disabled={!isNear || isCompleted}
                            className={`verify-button ${
                              isCompleted ? 'completed' : isNear ? 'near' : 'not-near'
                            }`}
                          >
                            {isCompleted ? 'Completed' : isNear ? 'In Range: Click to Complete!' : 'Not Near'}
                          </button>
                        </div>

                        {/* Back of card */}
                        <div className="card-back">
                          <button
                            onClick={() => handleFlip(challenge.challenge_id)}
                            className="flip-button"
                          >
                            <FaSyncAlt />
                          </button>
                          
                          <div className="hint-section">
                            <h3 className="hint-title">Looking for a hint?</h3>
                            
                            <div className="hint-group">
                              <h4 className="hint-label">Name of Attraction:</h4>
                              <span>{challenge.name}</span>
                              <button className="hint-button">
                                Click to reveal!
                              </button>
                            </div>
                            
                            <div className="hint-group">
                              <h4 className="hint-label">Distance from Location:</h4>
                              <span>{distance} meters</span>
                              <button className="hint-button">
                                Click to reveal!
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;