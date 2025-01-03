import { CSSProperties } from 'react';
//import ScavengerHunting from '../assets/ScavengerHunting.avif'; // Import the image
import type { ChangeEvent, FormEvent } from 'react';
import { GET_PLACES } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import CarouselImageReel from '../components/CarouselImageReel';
import ChallengeCard from '../components/ChallangeCard';

import { useMutation } from '@apollo/client';
import { CREATE_CHALLENGE } from '../utils/mutations';
// import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import '../Styles/App.css';

//import { text } from 'express';

const styles: { container: CSSProperties; image: CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '24px',
    color: '#333',
  },
  image: {
    display: 'block',
    margin: '20px auto 0', // Center the image and add margin at the top
    maxWidth: '50%', // Ensure the image is responsive
    padding: '80px',
    height: 'auto',
  },
};

const Home = () => {
  const [textQuery, setTextQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('Tourist Attractions');

  const [loadPlaces, { called, loading, data }] = useLazyQuery(GET_PLACES)
  const [createChallengeMutation] = useMutation(CREATE_CHALLENGE)
  /*, {
  refetchQueries: [
    GET_CHALLENGES,
    'getChallenges'
  ]
  });*/
  //console.log(textQuery)
  //console.log(data)
  
  const places = data?.textSearch;
  console.log("Places",places)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value);

  };
  

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const typeInput = searchType;
    const queryTouristAttr = textQuery + typeInput;
    await loadPlaces({
      variables: { query: queryTouristAttr }
    });
  }

  const handleCreateChallenge = async () => {
    if (!Auth.loggedIn()) {
      alert('You need to be logged in to save a challenge!');
      return;
    }
  
    if (!places || places.length === 0) {
      console.error('No places available to create challenges.');
      return;
    }
  
    try {
      for (const place of places) {
        // Validate the place object to ensure required fields exist
        if (!place || !place.geometry || !place.geometry.location) {
          console.error('Invalid place object:', place);
          continue; // Skip invalid places
        }
  
        const location = {
          type: "Point", // Required by schema
          coordinates: [
            place.geometry.location.lng, // Longitude
            place.geometry.location.lat, // Latitude
          ],
          name: place.name || "Unnamed Location", // Fallback name if missing
        };
  
        const image_url = place.photos?.[0] || 'default-placeholder.jpg'; // Fallback image
        const type = "Tourist Attraction"; // Static type
        const name = place.name || "Unnamed Challenge"; // Fallback name
        const task = `Visit ${place.name}`; 
        const address = place.formatted_address || "Address not available"; // Fallback address
        // Log the challenge input for debugging
        console.log('Creating Challenge:', {
          type,
          location,
          image_url,
          name,
          address,
          task
        });
  
        try {
          // Execute the mutation
          const { data } = await createChallengeMutation({
            variables: { input: { type, location, image_url, name, address, task } },
          });
  
          // Handle successful challenge creation
          if (data) {
            console.log('Challenge created successfully:', data);
          } else {
            console.error('No data returned from mutation for place:', place);
          }
        } catch (mutationError) {
          // Handle mutation-specific errors
          console.error('Error saving challenge for place:', place, mutationError);
        }
      }
  
      alert('All challenges processed!');
    } catch (err) {
      // Handle unexpected errors
      console.error('Unexpected error while creating challenges:', err);
      alert('Failed to save challenges.');
    }
  }

  if (called && loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={styles.container}>
      {/* Other content can go here*/}
      <CarouselImageReel/>
      <form onSubmit={handleFormSubmit}>
        
        <div className='search-bar'>
          <label htmlFor='searchbar' className='search-label'>Your Scavenger Hunt starts here! </label>
          <div className='city-container'> 
            <input
              type='text'
              placeholder=' Enter your city'
              name='city'
              onChange={handleInputChange}
              className="input"
              value={textQuery}
              required
            />
              <select
                value={searchType}
                onChange={e => setSearchType(e.target.value)} 
              >
                <option value="Tourist Attractions">Tourist Attractions</option>
                {/*<option value="Landmarks">Landmarks</option>*/}
                {/*<option value="Nature">Nature</option>*/}
                {/*<option value="Resturants">Resturants</option>*/}
                {/*<option value="Bars">Bars</option>*/}
              </select>
   
          </div>
        </div>
        <button
          disabled={!(textQuery)}
          type='submit'
          className="log-in"
        >
          Search for your Scavenger Hunt
        </button>
      </form>

      {called && !loading && places.length > 0 && (
        <div>
        <ChallengeCard places = {places}/>
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

export default Home;