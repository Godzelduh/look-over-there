import React, { CSSProperties } from 'react';
import '../Styles/profile.css'; // Import the CSS file
import clouds from '../assets/clouds.png'; // Import the image
const Profile: React.FC = () => {
  const styles: { container: CSSProperties, image: CSSProperties } = {
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
  };

  return (
    <div style={styles.container}>
      <div className="clouds">
        <img src={clouds} alt="clouds" style={styles.image} />
      </div> {/* Add the clouds div */}
      {/* Other content can go here */}
      <h1>Place Holder</h1>
    </div>
  );
};

export default Profile;