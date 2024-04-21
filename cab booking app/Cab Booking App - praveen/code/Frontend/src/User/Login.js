import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar';




const Login =()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const navigate=useNavigate()

  axios.defaults.withCredentials =true;
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { email, password }
    axios.post("http://localhost:8000/login", payload)
      .then(res => {
        console.log("login: " + res.data.Status);
        if (res.data.Status === "Success") {
          console.log(res.data.user);
          localStorage.setItem('user',JSON.stringify(res.data.user))
          navigate('/cabs')
          //  alert("login sucessfull")
            } else {
          alert("wrong credentials")
        }
      }).catch(err => console.log(err))
  };
  let formHandle1 = (e) => {
    e.preventDefault()
    navigate("/signup")
  }
  return (
    <div >
       <NavBar/>
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8" >
      <div className="max-w-md w-full space-y-8" style={{padding:"30px", backgroundColor:"lightgreen",borderRadius:"25px",marginTop:"50px" }}>
        <div >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-dark group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
              >
              Log in
            </button>
            <br/>
          <p >Don't have account create
          <button
             onClick={formHandle1}
              className="bg-dark group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
            >
                Signup
             {/* <Link to='/signup' style={{textDecoration:"none", color:"white"}}>Signup</Link> */}
            </button>
          </p>
           
          </div>
        </form>
      </div>
    </div>
   
    </div>
  );
}

export default Login;


// import React, { useState,useEffect } from 'react';
// import axios from 'axios'
// import Navbar from "./Navbar"
// import './BookRide.css'; // Import your CSS file
// import { Button } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';


// const BookRide = () => {
//   const [cars, setCars] = useState([]);
//   const [selectedPickupState, setSelectedPickupState] = useState('');
//   const [selectedPickupCity, setSelectedPickupCity] = useState('');
//   const [selectedPickupPincode, setSelectedPickupPincode] = useState('');
//   const [selectedDropState, setSelectedDropState] = useState('');
//   const [selectedDropCity, setSelectedDropCity] = useState('');
//   const [selectedDropPincode, setSelectedDropPincode] = useState('');
//   const [pickupdate, setPickupDate] = useState('');
//   const [pickuptime, setPickupTime] = useState('');
//   const [dropdate, setDropDate] = useState('');
//   const [droptime, setDropTime] = useState('');
//   const [excludedCities, setExcludedCities] = useState([]);

//   let {id}=useParams()
//   console.log(id)
//   const states = [
//     'Delhi',
//     'Maharashtra',
//     'Tamil Nadu',
//     'Karnataka', // Add more states
//   ];

//   const cities = {
//     Delhi: [
//       { name: 'New Delhi', pincode: '110001' },
//       { name: 'Gurgaon', pincode: '122001' },
//       { name: 'Noida', pincode: '201301' },
//     ],
//     Maharashtra: [
//       { name: 'Mumbai', pincode: '400001' },
//       { name: 'Pune', pincode: '411001' },
//       { name: 'Nagpur', pincode: '440001' },
//     ],
//     'Tamil Nadu': [
//       { name: 'Chennai', pincode: '600001' },
//       { name: 'Coimbatore', pincode: '641001' },
//       { name: 'Madurai', pincode: '625001' },
//     ],
//     Karnataka: [
//       { name: 'Bangalore', pincode: '560001' },
//       { name: 'Mysore', pincode: '570001' },
//       { name: 'Hubli', pincode: '580001' },
//     ],
//     // Add more cities for other states
//   };

//   const handleStateChange = (selectedState, locationType) => {
//     const setLocationTypeState = `setSelected${locationType}State`;
//     const setLocationTypeCity = `setSelected${locationType}City`;
//     const setLocationTypePincode = `setSelected${locationType}Pincode`;

//     if (locationType === 'Pickup') {
//       setSelectedPickupCity('');
//       setSelectedPickupPincode('');
//       // Clear the excluded city when the pickup state changes
//       setExcludedCities([]);
//     } else if (locationType === 'Drop') {
//       setSelectedDropCity('');
//       setSelectedDropPincode('');
//     }

//     // Set the selected state for the pickup or drop location
//     eval(`${setLocationTypeState}('${selectedState}')`);
//   };

//   const handleCityChange = (selectedCity, locationType) => {
//     const setLocationTypeCity = `setSelected${locationType}City`;
//     const setLocationTypePincode = `setSelected${locationType}Pincode`;

//     const selectedState = locationType === 'Pickup' ? selectedPickupState : selectedDropState;
//     const cityData = cities[selectedState] || [];

//     // Find the selected pincode
//     const selectedPincode = cityData.find((city) => city.name === selectedCity)?.pincode || '';

//     eval(`${setLocationTypeCity}('${selectedCity}')`);
//     eval(`${setLocationTypePincode}('${selectedPincode}')`);
//   };

//   useEffect(()=>{
//     axios.get('http://localhost:8000/car/'+id)
//      .then((resp)=>{
//     console.log(resp)
//     setCars(resp.data)
//       })
//      .catch(()=>{
//        console.log(" DIDNT GET")
//      })
//      },[])
//   const handlesubmit = () => {
//     const userName = JSON.parse(localStorage.getItem('user')).name;
    
//     const data = {
//       selectedPickupState,selectedPickupCity,selectedPickupPincode,selectedDropState,selectedDropCity,  selectedDropPincode,pickupdate, pickuptime,dropdate,droptime,userName
//     };
    // const cardata= cars[0]; 
    // const drivername=cardata.drivername;

    // data.drivername=drivername

//     axios
//       .post('http://localhost:8000/rides', data)
//       .then((response) => {
//         // Handle success, for example, show a success message
//         alert("Cab booked successfully:")
//         console.log('Ride booked successfully:', response.data);
     
//       })
//       .catch((error) => {
//         // Handle errors, for example, display an error message
//         console.error('Error booking ride:', error);
//       });
//   };
  

//   const handleCityExclusion = (selectedCity, locationType) => {
//     if (locationType === 'Pickup') {
//       setExcludedCities([selectedCity]);
//     } else if (locationType === 'Drop') {
//       setExcludedCities([selectedCity]);
//     }
//   };

//   return (
//     <div>
//         <Navbar/>
//     <div className="book-ride-containe bg-gray-100 p-4">
//     <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
//     {/* {Array.isArray(cars) && cars.map((car) => (
//     <div key={car._id}>
//       <div>
//       <h1>{car.drivername}</h1>
//       </div>
//     </div>
//   ))} */}
//     <form className="book-ride-form"  onSubmit={handlesubmit}>
//     <h2>PickUp</h2>
//         <div id='pic'>
            
//         <div className="form-group">
//           {/* <label>Pickup State:</label> */}
          
//           <select
//             value={selectedPickupState}
//             onChange={(e) => handleStateChange(e.target.value, 'Pickup')}
//           >
//             <option value="">Select a state</option>
//             {states.map((state) => (
//               <option key={state} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group"  >
//           {/* <label>Pickup City:</label> */}
//           <select
//             value={selectedPickupCity}
//             onChange={(e) => handleCityChange(e.target.value, 'Pickup')}
//             onClick={() => handleCityExclusion(selectedDropCity, 'Pickup')}
//           >
//             <option value="">Select a city</option>
//             {selectedPickupState && cities[selectedPickupState] ? (
//               cities[selectedPickupState].map((city) => (
//                 <option
//                   key={city.name}
//                   value={city.name}
//                   disabled={excludedCities.includes(city.name)}
//                 >
//                   {city.name}
//                 </option>
//               ))
//             ) : null}
//           </select>
//         </div>
//         <div className="form-group">
//           <input type="text" value={selectedPickupPincode} readOnly />
//         </div>
//            <div className="form-group">
//           {/* <label>Date:</label> */}
//           <input
//             type="date"
//             value={pickupdate}
//             onChange={(e) => setPickupDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           {/* <label>Time:</label> */}
//           <input
//             type="time"
//             value={pickuptime}
//             onChange={(e) => setPickupTime(e.target.value)}
//           />
//         </div>
//         </div>
        

        
//     <h2>Drop</h2>
//         <div id='pic'>     
//         <div className="form-group">
//           {/* <label>Drop State:</label> */}
//           <select
//             value={selectedDropState}
//             onChange={(e) => handleStateChange(e.target.value, 'Drop')}
//           >
//             <option value="">Select a state</option>
//             {states.map((state) => (
//               <option key={state} value={state}>
//                 {state}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           {/* <label>Drop City:</label> */}
//           <select
//             value={selectedDropCity}
//             onChange={(e) => handleCityChange(e.target.value, 'Drop')}
//             onClick={() => handleCityExclusion(selectedPickupCity, 'Drop')}
//           >
//             <option value="">Select a city</option>
//             {selectedDropState && cities[selectedDropState] ? (
//               cities[selectedDropState].map((city) => (
//                 <option
//                   key={city.name}
//                   value={city.name}
//                   disabled={excludedCities.includes(city.name)}
//                 >
//                   {city.name}
//                 </option>
//               ))
//             ) : null}
//           </select>
//         </div>
//         <div className="form-group">
//           <input type="text" value={selectedDropPincode} readOnly />
//         </div>
        
//         <div className="form-group">
//           {/* <label>Date:</label> */}
//           <input
//             type="date"
//             value={dropdate}
//             onChange={(e) => setDropDate(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           {/* <label>Time:</label> */}
//           <input
//             type="time"
//             value={droptime}
//             onChange={(e) => setDropTime(e.target.value)}
//           />
//         </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Book Ride
//           </button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default BookRide;
