import React from 'react';
import { CSSProperties } from 'react';
import travelingmap from '../assets/travelingmap.jpg';
//import TravelTopFiveChoices from '../assets/traveltopfivechoices.png';

  const styles: { [key: string]: CSSProperties } = {
    container: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '24px',
      color: 'darkblue',
    },
    boxContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '40px',
    },
    box: {
      width: '30%',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      transition: 'box-shadow 0.3s ease',
      backgroundColor: 'darkblue',
    },
    boxTitle: {
      fontSize: '25px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#007bff',
    },
    boxContent: {
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#fff',
    },
    highlight: {
      fontWeight: 'bold',
      color: '#007bff',
    },
    imageContainer: {
      marginTop: '40px',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
    },
    topChoicesContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginTop: '40px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    topChoiceItem: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#fff',
    }
  };
  
  const AboutUs: React.FC = () => (
    <div style={styles.container}>
      <div style={styles.boxContainer}>
        <div style={styles.box} className="hover-box">
          <div style={styles.boxTitle}>Our Mission</div>
          <div style={styles.boxContent}>
            We want to implement a way for our users to enjoy the vast number of attractions regardless of their location. Whereever they are, there will always be something to find!
          </div>
        </div>
        <div style={styles.box} className="hover-box">
          <div style={styles.boxTitle}>Our Values</div>
          <div style={styles.boxContent}>
            We value user-friendly experience, that ensures they not only get to their locations safely, but also in a helpful challenge that will keep them coming back for future hunts.
          </div>
        </div>
        <div style={styles.box} className="hover-box">
          <div style={styles.boxTitle}>Our Future</div>
          <div style={styles.boxContent}>
            We want to continue to progress regardless of the point in time, from having augmented reality, to have nearly every crevice of the world become available for our users!
          </div>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img src={travelingmap} alt="Travel" style={styles.image} />
      </div>
    
          {/* <div className="side-image-container">
          <img src={TravelTopFiveChoices} alt="Top 5 Choices" className="side-image" />
          </div> */}
          </div> 
  );
export default AboutUs;