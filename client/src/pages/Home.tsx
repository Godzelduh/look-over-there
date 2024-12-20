import React, { CSSProperties } from 'react';

const Home: React.FC = () => {
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
      Home
    </div>
  );
};

export default Home;