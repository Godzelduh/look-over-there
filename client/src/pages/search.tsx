// import { useState } from "react";
// //import { useLocation } from "react-router-dom";
// import { textSearch } from "../utils/api";
//
// const SearchPage = () => {
//     const [query, setQuery] = useState('');
//
//     interface Result {
//         name: string;
//         formatted_address: string;
//         photos: { photo_reference: string }[];
//     }
//
//     const [results, setResults] = useState<Result[]>([]);
//
//     const handleSearch = async () => {
//         try {
//             const response = await textSearch();
//             const data = await response.json();
//             setResults(data.results);
//         } catch (error) {
//             console.error('Error fetching data: 444', error);
//         }
//     };
//
//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Enter City"
//             />
//             <button onClick={handleSearch}>Search</button>
//             <div>
//                 {results.map((result, index) => (
//                     <div key={index}>
//                         <h3>{result.name}</h3>
//                         <p>{result.formatted_address}</p>
//                         {result.photos && result.photos.length > 0 && (
//                             <img
//                                 src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${GOOGLE_MAP_API_KEY}`}
//                                 alt={result.name}
//                             />
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default SearchPage;