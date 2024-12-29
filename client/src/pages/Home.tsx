import { CSSProperties } from 'react';
import ScavengerHunting from '../assets/ScavengerHunting.avif'; // Import the image
import type { ChangeEvent, FormEvent } from 'react';
import { GET_PLACES } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { Place } from '../models/Place';
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

  if (called && loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={styles.container}>
      {/* Other content can go here*/}
      <img src={ScavengerHunting} alt="Found Locations" style={styles.image} />
      <form onSubmit={handleFormSubmit}>
        <div className='search-bar'>
          <label htmlFor='searchbar' className='search-label'>Your Scavenger Hunt starts here!</label>
          <input
            type='text'
            placeholder='          Enter your city'
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
          Begin Scavenger Hunt
        </button>
      </form>

      {called && !loading && places.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {places.map((place: Place, index: number) => (
              <li key={index}>
                <div>
                  {place.photos.map((photo: string, photoIndex: number) => (
                    <img key={photoIndex} src={photo} alt={`Image of results for city`} style={{ maxWidth: '100%', height: 'auto' }} />
                  ))}
                </div>

              </li> // Adjust based on your data structure
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;