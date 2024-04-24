import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cars.css';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from './Unav';

function Mybookings() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:8000/getrides/${user.id}`)
        .then((response) => {
          const taskData = response.data;
          setCars(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  }, []);

  const getStatusAndColor = (car) => {
    const currentDate = new Date();
    const pickupDate = new Date(car.pickupdate);
    const dropDate = new Date(car.dropdate);

    if (currentDate < pickupDate) {
      return { status: 'Not Started', color: 'red' };
    } else if (currentDate >= pickupDate && currentDate <= dropDate) {
      return { status: 'On the Way', color: 'orange' };
    } else {
      return { status: 'Completed', color: 'green' };
    }
    return 'Unknown';
  };
  

  return (
    <div>
      <Navbar />

      <div>
        <h1>My Booking</h1>
        <div>
          {cars.map((car) => {
            const { status, color } = getStatusAndColor(car);

            return (
              <Card
                key={car._id}
                style={{
                  width: '90%',
                  marginLeft: '65px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  paddingTop: '15px',
                  marginBottom: '35px',
                  borderColor: color, // Set border color based on status
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <p>Cab Booked Date: <br />{car.bookeddate}</p>
                  <p>
                    Trip: <br />
                    {car.selectedPickupCity} To {car.selectedDropCity}
                  </p>
                  <p>
                    Pickup Time & Date <br />
                    {car.pickuptime}, {car.pickupdate}
                  </p>
                  <p>Drop Date :<br /> {car.droptime}{car.dropdate}</p>
                  <p>Driver Name: <br />{car.drivername}</p>
                  <p>Car Name: <br />{car.carname}</p>
                  <p>Car Type: <br />{car.cartype}</p>
                  <p>Car No: <br />{car.carno}</p>
                  <p>Amount Paid <br />₹{car.fare}</p>
                  <p>Status: <br /><span style={{ color }}>{status}</span></p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mybookings;




// import React, { useState } from 'react';

// const Mybookings = () => {
//   const loc = [
//     {
//       name: "delhi,delhi,5797",
//     },
//     {
//       name: "noida,delhi,5797",
//     },
//     {
//       name: "gugoan,delhi,5797",
//     },
//     {
//       name: "sss,delhi,5797",
//     },
//   ];

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredLoc, setFilteredLoc] = useState(loc);

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     const filteredResults = loc.filter((location) =>
//       location.name.toLowerCase().includes(query.toLowerCase())
//     );

//     setFilteredLoc(filteredResults);
//   };

//   return (
//     <div>
//       <h1>My Bookings</h1>

//       <input
//         type="text"
//         placeholder="Search Locations"
//         value={searchQuery}
//         onChange={handleSearch}
//       />

//       <ul>
//         {filteredLoc.map((location, index) => (
//           <li key={index}>{location.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Mybookings;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';
// import './BookRide.css'; // Import your CSS file
// import { useNavigate, useParams } from 'react-router-dom';

// const BookRide = () => {
//   // ... Your existing state and functions ...

//   const states = [
//     'Delhi',
//     'Maharashtra',
//     'Tamil Nadu',
//     'Karnataka', // Add more states
//   ];

//   // ... Your existing cities data ...

//   const handlesubmit = () => {
//     if (!selectedPickupCity || !selectedDropCity) {
//       alert('Please select both pickup and drop locations.');
//       return;
//     }

//     const pricingRules = {
//       'Noida-Pune': 800, // Example: Noida to Pune costs 800 rupees
//       // Add more pricing rules as needed
//     };

//     const routeKey = `${selectedPickupCity}-${selectedDropCity}`;
//     const fare = pricingRules[routeKey];

//     if (fare !== undefined) {
//       alert(`Cab booked successfully! Fare: ${fare} rupees`);
//       console.log('Ride booked successfully!');
//     } else {
//       alert('Pricing information not available for this route.');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="book-ride-containe bg-gray-100 p-4">
//         <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>

//         <form className="book-ride-form" onSubmit={handlesubmit}>
//           <h2>PickUp</h2>
//           <div id="pic">
//             {/* ... Your existing pickup form ... */}
//           </div>

//           <h2>Drop</h2>
//           <div id="pic">
//             {/* ... Your existing drop form ... */}
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Book Ride
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookRide;
