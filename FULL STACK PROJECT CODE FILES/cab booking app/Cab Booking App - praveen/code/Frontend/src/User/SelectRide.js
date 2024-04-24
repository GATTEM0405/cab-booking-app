// // src/components/SelectRide.js

// import React, { useState, useEffect } from 'react';

// const SelectRide = () => {
//   const [rides, setRides] = useState([]);
//   const [selectedRide, setSelectedRide] = useState(null);

//   // Fetch ride options from your backend (Node.js/Express)
//   useEffect(() => {
//     // Implement the API call to get available rides from your server
//     // Example:
//     // fetch('/api/rides')
//     //   .then((response) => response.json())
//     //   .then((data) => setRides(data))
//     //   .catch((error) => console.error('Error fetching rides:', error));
//   }, []);

//   const handleRideSelection = (rideId) => {
//     setSelectedRide(rideId);
//   };

//   return (
//     <div>
//       <h2>Select a Ride</h2>
//       <ul>
//         {rides.map((ride) => (
//           <li key={ride._id}>
//             <button onClick={() => handleRideSelection(ride._id)}>
//               {ride.name} - {ride.price}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {selectedRide && (
//         <div>
//           <h3>Selected Ride</h3>
//           <p>Ride ID: {selectedRide}</p>
//           {/* Display additional ride details here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectRide;
