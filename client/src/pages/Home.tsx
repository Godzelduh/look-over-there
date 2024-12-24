import { CSSProperties } from 'react';
import ScavengerHunting from '../assets/ScavengerHunting.avif'; // Import the image
import type { ChangeEvent, FormEvent } from 'react';
import { GET_PLACES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

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
  const [places, setPlaces] = useState<any>(null); // Adjust the type as necessary
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading to true while fetching data

    // Execute the query here
    const {data} = useQuery(GET_PLACES, {
      variables: {query: textQuery}
    })
    setPlaces(data.textSearch);
    setLoading(false); // Set loading to false after fetching data
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <img src={ScavengerHunting} alt="Found Locations" style={styles.image} />
      <form onSubmit={handleFormSubmit}>
        <div className='search-bar'>
          <label htmlFor='searchbar'>Create your own Scavenger Hunt!</label>
          <input
            type='text'
            placeholder='Enter your City'
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
          Search
        </button>
      </form>
      {places && <div>{/* Render places here */}</div>}
    </div>
  );
};

export default Home;
/*import { CSSProperties } from 'react';
import ScavengerHunting from '../assets/ScavengerHunting.avif'; // Import the image
import type { ChangeEvent, FormEvent } from 'react';
import { GET_PLACES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
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
  
  const {loading, data} = useQuery(GET_PLACES, {
    variables: {query: textQuery}
  })
   
  const places = data?.textSearch

  console.log(places)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextQuery(event.target.value);
 
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={styles.container}>
      {/* Other content can go here}
      <img src={ScavengerHunting} alt="Found Locations" style={styles.image} />
      <form onSubmit={handleFormSubmit}>
        <div className='search-bar'>
          <label htmlFor='searchbar'>Create your own Scavenger Hunt!</label>
          <input
            type='text'
            placeholder='Enter your City'
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
            Search
        </button>
       </form>
    </div>
  );
};

export default Home;

*/ 