// import React, { Component } from 'react';

// class BookRide extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedState: '',
//       selectedCity: '',
//       selectedPincode: '',
//       date: '',
//       time: '',
//       states: ['Delhi', 'Maharashtra', 'Tamil Nadu'], // Replace with actual state data
//       cities: {
//         Delhi: [
//           { name: 'New Delhi', pincode: '110001' },
//           { name: 'Gurgaon', pincode: '122001' },
//           { name: 'Noida', pincode: '201301' },
//         ],
//         Maharashtra: [
//           { name: 'Mumbai', pincode: '400001' },
//           { name: 'Pune', pincode: '411001' },
//           { name: 'Nagpur', pincode: '440001' },
//         ],
//         'Tamil Nadu': [
//           { name: 'Chennai', pincode: '600001' },
//           { name: 'Coimbatore', pincode: '641001' },
//           { name: 'Madurai', pincode: '625001' },
//         ],
//       }, // Replace with actual city data
//     };
//   }

//   handleStateChange = (selectedState) => {
//     this.setState({
//       selectedState,
//       selectedCity: '',
//       selectedPincode: '',
//     });
//   }

//   handleCityChange = (selectedCity) => {
//     const { cities, selectedState } = this.state;
//     const selectedPincode = cities[selectedState].find((city) => city.name === selectedCity).pincode;
//     this.setState({ selectedCity, selectedPincode });
//   }

//   handleBookRide = () => {
//     // Your booking logic here
//   }

//   render() {
//     const { selectedState, selectedCity, selectedPincode, date, time, states, cities } = this.state;

//     return (
//       <div className="book-ride">
//         <h2>Book a Ride</h2>
//         <form>
//           <div className="form-group">
//             <label>State:</label>
//             <select
//               value={selectedState}
//               onChange={(e) => this.handleStateChange(e.target.value)}
//             >
//               <option value="">Select a state</option>
//               {states.map((state) => (
//                 <option key={state} value={state}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>City:</label>
//             <select
//               value={selectedCity}
//               onChange={(e) => this.handleCityChange(e.target.value)}
//             >
//               <option value="">Select a city</option>
//               {selectedState && cities[selectedState] ? (
//                 cities[selectedState].map((city) => (
//                   <option key={city.name} value={city.name}>
//                     {city.name}
//                   </option>
//                 ))
//               ) : null}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Pincode:</label>
//             <input
//               type="text"
//               name="pincode"
//               value={selectedPincode}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label>Date:</label>
//             <input
//               type="date"
//               name="date"
//               value={date}
//               onChange={(e) => this.handleInputChange('date', e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Time:</label>
//             <input
//               type="time"
//               name="time"
//               value={time}
//               onChange={(e) => this.handleInputChange('time', e.target.value)}
//             />
//           </div>
//           <button type="button" onClick={this.handleBookRide}>
//             Book Ride
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default BookRide;

import React, { useState,useEffect } from 'react';
import axios from 'axios'
import Navbar from "./Unav"
import './BookRide.css'; // Import your CSS file
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const BookRide = () => {
  const [selectedPickupState, setSelectedPickupState] = useState('');
  const [selectedPickupCity, setSelectedPickupCity] = useState('');
  const [selectedPickupPincode, setSelectedPickupPincode] = useState('');
  const [selectedDropState, setSelectedDropState] = useState('');
  const [selectedDropCity, setSelectedDropCity] = useState('');
  const [selectedDropPincode, setSelectedDropPincode] = useState('');
  const [pickupdate, setPickupDate] = useState('');
  const [pickuptime, setPickupTime] = useState('');
  const [dropdate, setDropDate] = useState('');
  const [droptime, setDropTime] = useState('');
  const [excludedCities, setExcludedCities] = useState([]);
  const [fare, setFare] = useState(null);
  const [cars, setCars] = useState([]);

  let {id}=useParams()

  const states = [
    'Delhi',
    'Maharashtra',
    'Tamil Nadu',
    'Karnataka', // Add more states
  ];

  const cities = {
    Delhi: [
      { name: 'New Delhi', pincode: '110001' },
      { name: 'Gurgaon', pincode: '122001' },
      { name: 'Noida', pincode: '201301' },
    ],
    Maharashtra: [
      { name: 'Mumbai', pincode: '400001' },
      { name: 'Pune', pincode: '411001' },
      { name: 'Nagpur', pincode: '440001' },
    ],
    'Tamil Nadu': [
      { name: 'Chennai', pincode: '600001' },
      { name: 'Coimbatore', pincode: '641001' },
      { name: 'Madurai', pincode: '625001' },
    ],
    Karnataka: [
      { name: 'Bangalore', pincode: '560001' },
      { name: 'Mysore', pincode: '570001' },
      { name: 'Hubli', pincode: '580001' },
    ],
    // Add more cities for other states
  };

  const handleStateChange = (selectedState, locationType) => {
    const setLocationTypeState = `setSelected${locationType}State`;
    const setLocationTypeCity = `setSelected${locationType}City`;
    const setLocationTypePincode = `setSelected${locationType}Pincode`;

    if (locationType === 'Pickup') {
      setSelectedPickupCity('');
      setSelectedPickupPincode('');
      // Clear the excluded city when the pickup state changes
      setExcludedCities([]);
    } else if (locationType === 'Drop') {
      setSelectedDropCity('');
      setSelectedDropPincode('');
    }

    // Set the selected state for the pickup or drop location
    eval(`${setLocationTypeState}('${selectedState}')`);
  };

  const handleCityChange = (selectedCity, locationType) => {
    const setLocationTypeCity = `setSelected${locationType}City`;
    const setLocationTypePincode = `setSelected${locationType}Pincode`;

    const selectedState = locationType === 'Pickup' ? selectedPickupState : selectedDropState;
    const cityData = cities[selectedState] || [];

    // Find the selected pincode
    const selectedPincode = cityData.find((city) => city.name === selectedCity)?.pincode || '';

    eval(`${setLocationTypeCity}('${selectedCity}')`);
    eval(`${setLocationTypePincode}('${selectedPincode}')`);
  };

  useEffect(()=>{
    axios.get('http://localhost:8000/car/'+id)
     .then((resp)=>{
    console.log(resp)
    setCars(resp.data)
      })
     .catch(()=>{
       console.log(" DIDNT GET")
     })
     },[])
  
   
    
  const handlesubmit = (e) => {
   
    const userName = JSON.parse(localStorage.getItem('user')).name;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const data = {
      selectedPickupState,selectedPickupCity,selectedPickupPincode,selectedDropState,selectedDropCity,  selectedDropPincode,pickupdate, pickuptime,dropdate,droptime,fare,userName,userId
    };
    const cardata= cars[0]; 
    const drivername=cardata.drivername;
    const carname=cardata.carname;
    const cartype=cardata.cartype;
    const carno=cardata.carno;
    const price=cardata.price;

    data.drivername=drivername
    data.carname=carname;
    data.cartype=cartype;
    data.carno=carno;
    data.price=price;
    axios
      .post('http://localhost:8000/rides', data)
      .then((response) => {
        // Handle success, for example, show a success message
        alert("Cab booked successfully:")
        console.log('Ride booked successfully:', response.data);
     
      })
      .catch((error) => {
        // Handle errors, for example, display an error message
        console.error('Error booking ride:', error);
      });
  };
  


  const pricingRules = {
    'Noida-Pune': 2000, // Example: Noida to Pune costs 800 rupees
     'Pune-Noida':2000,
     'Delhi-Mumbai':2500,
     'Mumbai-Delhi':2500,
     'New Delhi-Noida':400,
     'Noida-New Delhi':400,
     'New Delhi-Mumbai':2200,
     'Mumbai-New Delhi':2200,
     'Chennai-Bangalore':3400,
     'Bangalore-Chennai':3400,
     

    // Add more pricing rules as needed
  };

  const calculateFare = () => {
    if (!selectedPickupCity || !selectedDropCity) {
      alert('Please select both pickup and drop locations.');
      return;
    }

    const routeKey = `${selectedPickupCity}-${selectedDropCity}`;
    const calculatedFare = pricingRules[routeKey];

    if (calculatedFare !== undefined) {
      setFare(calculatedFare);
    } else {
      setFare(null);
      alert('Pricing information not available for this route.');
    }
  };

 
  const handleCityExclusion = (selectedCity, locationType) => {
    if (locationType === 'Pickup') {
      setExcludedCities([selectedCity]);
    } else if (locationType === 'Drop') {
      setExcludedCities([selectedCity]);
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="book-ride-containe bg-gray-100 p-4">
    <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
     
    <form className="book-ride-form"  onSubmit={handlesubmit}>
    <h2>PickUp</h2>
        <div id='pic'>
            
        <div className="form-group">
          {/* <label>Pickup State:</label> */}
          
          <select
            value={selectedPickupState}
            onChange={(e) => handleStateChange(e.target.value, 'Pickup')}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group"  >
          {/* <label>Pickup City:</label> */}
          <select
            value={selectedPickupCity}
            onChange={(e) => handleCityChange(e.target.value, 'Pickup')}
            onClick={() => handleCityExclusion(selectedDropCity, 'Pickup')}
          >
            <option value="">Select a city</option>
            {selectedPickupState && cities[selectedPickupState] ? (
              cities[selectedPickupState].map((city) => (
                <option
                  key={city.name}
                  value={city.name}
                  disabled={excludedCities.includes(city.name)}
                >
                  {city.name}
                </option>
              ))
            ) : null}
          </select>
        </div>
        <div className="form-group">
          <input type="text" value={selectedPickupPincode} readOnly />
        </div>
           <div className="form-group">
          {/* <label>Date:</label> */}
          <input
            type="date"
            value={pickupdate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* <label>Time:</label> */}
          <input
            type="time"
            value={pickuptime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>
        </div>
        

        
    <h2>Drop</h2>
        <div id='pic'>     
        <div className="form-group">
          {/* <label>Drop State:</label> */}
          <select
            value={selectedDropState}
            onChange={(e) => handleStateChange(e.target.value, 'Drop')}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          {/* <label>Drop City:</label> */}
          <select
            value={selectedDropCity}
            onChange={(e) => handleCityChange(e.target.value, 'Drop')}
            onClick={() => handleCityExclusion(selectedPickupCity, 'Drop')}
          >
            <option value="">Select a city</option>
            {selectedDropState && cities[selectedDropState] ? (
              cities[selectedDropState].map((city) => (
                <option
                  key={city.name}
                  value={city.name}
                  disabled={excludedCities.includes(city.name)}
                >
                  {city.name}
                </option>
              ))
            ) : null}
          </select>
        </div>
        <div className="form-group">
          <input type="text" value={selectedDropPincode} readOnly />
        </div>
        
        <div className="form-group">
          {/* <label>Date:</label> */}
          <input
            type="date"
            value={dropdate}
            onChange={(e) => setDropDate(e.target.value)}
          />
        </div>
        <div className="form-group">
        <Button onClick={calculateFare} style={{backgroundColor:"orangered",height:"40px",marginRight:"20px",border:"none"}} > 
            Show fare 
          </Button >
        {fare !== null && (
            <div className="fare-section">
              
              <h2 style={{marginTop:"8px"}}>₹ {fare}/day</h2>
            </div>
          )}
           
        </div> 




        </div> <br/>
        
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700">
            Book Ride
          </button>

        </div>
      </form>
      
    </div>
    </div>
  );
};

export default BookRide;
