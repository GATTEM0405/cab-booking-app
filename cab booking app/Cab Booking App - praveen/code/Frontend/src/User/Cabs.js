// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './cars.css'
// import { Button } from 'react-bootstrap';
// import { useNavigate,Link } from 'react-router-dom'
// import Navbar from "./Unav"

// function Cabs() {
//   const [cars, setCars] = useState([]);

//   const navigate=useNavigate()

//   useEffect(() => {
//     async function fetchCars() {
//       try {
//         const response = await axios.get('http://localhost:8000/cars');
//         setCars(response.data);
//       } catch (error) {
//         console.error('Error fetching cars: ', error);
//       }
//     }
//     fetchCars();
//   }, []);

//   const HandleChange=(()=>{
//     navigate('/bookcab')
//   })

//   return (
//     <div>
//       <Navbar/>
//     <div className="car-list">
//       <h1>Car List</h1>
//       <br/>
//       <br/>
//       <br/>
//       <div className="car-container" >
//         {cars.map((car) => (
//           <div className="car-card" key={car._id} id='pop'>
            
//             <img src={`http://localhost:8000/${car?.carImage}`} alt={`${car.carname} Image`}  />
            
//             <p>Driver Name:{  car.drivername}</p>
//             <p>Car Model: {car.carname}</p>
//             <p>Car Type: {car.cartype}</p>
//             <p>Car No:    {car.carno}</p>
//             <p>Pirce:    {car.price}/Km</p>
//             <div className='ml-auto'>
//         <Button style={{backgroundColor:"orangered",border:"none"}}> <Link to={`/bookcab/${car._id}`} style={{color:"white",textDecoration:"none"}} >book cab</Link></Button> 
//           </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Cabs;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cars.css';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "./Unav";

function Cabs() {
  const [cars, setCars] = useState([]);
  const [searchCarName, setSearchCarName] = useState('');
  const [searchCarType, setSearchCarType] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [sortPriceAscending, setSortPriceAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:8000/item');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    }
    fetchCars();
  }, []);

  const HandleChange = () => {
    navigate('/bookcab');
  };

  const handleSortPrice = () => {
    setSortPriceAscending(!sortPriceAscending);
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (sortPriceAscending) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const filteredCars = sortedCars.filter((car) => {
    const carNameMatches = car.carname.toLowerCase().includes(searchCarName.toLowerCase());
    const carTypeMatches = car.cartype.toLowerCase().includes(searchCarType.toLowerCase());
    const priceMatches = car.price.toString().includes(searchPrice);

    return carNameMatches && carTypeMatches && priceMatches;
  });

  return (
    <div>
      <Navbar />
      <div className="car-list">
        <h1>Car List</h1>
        <div  style={{display:"flex"}}>
          <input
          style={{marginRight:"20px"}}
            type="text"
            placeholder="Search by car name"
            value={searchCarName}
            onChange={(e) => setSearchCarName(e.target.value)}
          />
          <input
          style={{marginRight:"20px"}}

            type="text"
            placeholder="Search by car type"
            value={searchCarType}
            onChange={(e) => setSearchCarType(e.target.value)}
          />
          <Button
  onClick={handleSortPrice}
  style={{ backgroundColor: "orangered",width:"250px" }}
 
>
  Sort Price  ↓↑   {sortPriceAscending ? 'Low to High' : 'High to Low'}
</Button>
        </div>
        <br/>
<br/>

        <div className="car-container">
          {filteredCars.map((car) => (
            <div className="car-card" key={car._id} id='pop'>
              <img src={`http://localhost:8000/${car?.carImage}`} alt={`${car.carname} Image`} />
              <p>Driver Name: {car.drivername}</p>
              <p>Car Model: {car.carname}</p>
              <p>Car Type: {car.cartype}</p>
              <p>Car No: {car.carno}</p>
              <p>Price: {car.price}/Km</p>
              <div className='ml-auto'>
                <Button style={{ backgroundColor: "orangered", border: "none" }}>
                  <Link to={`/bookcab/${car._id}`} style={{ color: "white", textDecoration: "none" }}>
                    Book Cab
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cabs;
