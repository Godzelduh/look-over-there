import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '50px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    padding: '20px',
    width: '300px',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardContent: {
    fontSize: '16px',
    color: '#666',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};

const AboutUs: React.FC = () => {
  return (
    <div style={styles.container}>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Our Mission</div>
          <div style={styles.cardContent}>
            Our mission is to provide the best scavenger hunt experience for our users.
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Our Vision</div>
          <div style={styles.cardContent}>
            Our vision is to be the leader in the traveling scene that implements a fun, yet useful game for our users to enjoy and learn from.
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Our Values</div>
          <div style={styles.cardContent}>
            We value user-friendly, challenging yet rewarding, and fun to discover new places.
          </div>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img src="/travel-image1.png" alt="Travel" style={styles.image} />
      </div>
    </div>
  );
};

export default AboutUs;
