// // src/components/Map.tsx
// import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import dotenv from 'dotenv';
//
// dotenv.config({path:'../../../server/.env'});
// const containerStyle = {
//     width: '100%',
//     height: '400px'
// };
//
// const center = {
//     lat: -3.745,
//     lng: -38.523
// };
//
// const Marker: React.FC<{ lat: number; lng: number }> = () => <div>📍</div>;
//
// const Map: React.FC = () => {
//     return (
//         <div style={containerStyle}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key:(process.env.GOOGLE_MAP_API_KEY) }}
//                 defaultCenter={center}
//                 defaultZoom={10}
//             >
//                 <Marker lat={center.lat} lng={center.lng} />
//             </GoogleMapReact>
//         </div>
//     );
// };
//
// export default Map;