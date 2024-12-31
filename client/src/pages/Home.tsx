import { CSSProperties } from 'react';
//import ScavengerHunting from '../assets/ScavengerHunting.avif'; // Import the image
import type { ChangeEvent, FormEvent } from 'react';
import { GET_PLACES } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import CarouselImageReel from '../components/CarouselImageReel';
import ChallengeCard from '../components/ChallengeCard';

import { useMutation } from '@apollo/client';
import { CREATE_CHALLENGE } from '../utils/mutations';
//import { GET_CHALLENGES } from '../utils/queries';
import Auth from '../utils/auth';

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
  }
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
  console.log(places)
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
    if (Auth.loggedIn()) {


      for (const place in places) {
        const type = searchType;
        const location  = {
          coordinates: [
            places[place].geometry.location.lat, 
            places[place].geometry.location.lng
          ]
        }
        const name = places[place].name;
        const image_url = places[place].photos[0];;

        console.log(`Type: ${type}, Name: ${name}, Location: ${location.coordinates}, Images: ${image_url}`)

  
      try {
        const { data } = await createChallengeMutation({
          variables: { input: { type, location, image_url, name  }}
        })
        console.log(data, "Line 84")
      
        if (!data) {
          throw new Error('something went wrong!');
        }
        console.log("Challenge Created!!!")
      } catch (err) {
        console.error(err);
      } 
    }

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