import React, { CSSProperties } from 'react';

const Profile: React.FC = () => {
  const styles: { container: CSSProperties, image: CSSProperties } = {
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

  return (
    <div style={styles.container}>
      {/* Other content can go here */}
      <h1>Place Holder</h1>
    </div>
  );
};

export default Profile;