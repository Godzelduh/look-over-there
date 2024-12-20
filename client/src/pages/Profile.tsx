import React, { CSSProperties } from 'react';

const Profile: React.FC = () => {
  const styles: { container: CSSProperties } = {
    container: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '24px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      Profile
    </div>
  );
};

export default Profile;