import { CSSProperties } from 'react';
//import ScavengerHunting from '../assets/ScavengerHunting.avif'; // Import the image
import type { ChangeEvent, FormEvent } from 'react';
import { GET_PLACES } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import CarouselImageReel from '../components/CarouselImageReel';
import ChallengeCard from '../components/ChallangeCard';

// import { useMutation } from '@apollo/client';
// import { CREATE_CHALLENGE } from '../utils/mutations';
// import { GET_ME } from '../utils/queries';
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
  },
};

const Home = () => {
  const [textQuery, setTextQuery] = useState<string>('');

  const [loadPlaces, { called, loading, data }] = useLazyQuery(GET_PLACES)
  //console.log(textQuery)
  //console.log(data)
  const places = data?.textSearch;
  console.log(places)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value);

  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryTouristAttr = textQuery + "Tourist Attraction";
    await loadPlaces({
      variables: { query: queryTouristAttr }
    });
  }

  const createChallange = async () => {
    if (Auth.loggedIn()) {
      /*const [createChallenge] = useMutation(CREATE_CHALLENGE, {
        refetchQueries: [
          GET_ME,
          'me'
        ]
      });*/
      const type = places.__typename;
      const location  = {
        type: places.geometry.__typename,
        coordinates: [places.geometry.location.lat, places.geometry.location.lng]
      }
      const task = places.name;
      const image_url = places.photos;
      console.log(`Type: ${type}, Location: ${location}, Task: ${task}, Images: ${image_url}`)
/*
      try {
        const { data } = await createChallenge({
          variables: { input: { type, location, task, image_url }}
        })
      }*/

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
          <label htmlFor='searchbar' className='search-label'>Your Scavenger Hunt starts here!  </label>
          <input
            type='text'
            placeholder=' Enter your city'
            name='city'
            onChange={handleInputChange}
            className="log-in"
            value={textQuery}
            required
          />
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
          onClick={createChallange}
          type='submit'
          className="log-in"
          >Start Challange!
        </button>
        </div>
      )}
    </div>
  );
};

export default Home;