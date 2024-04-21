import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './cars.css';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Anav from './Anav';
import { FaTrash,FaEdit } from 'react-icons/fa';

function Bookings() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      axios
        .get(`http://localhost:8000/getrides`)
        .then((response) => {
          const taskData = response.data;
          setCars(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
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
  
  const deletecar = (taskId) => {
    axios.delete(`http://localhost:8000/usercardelete/${taskId}`);
    window.location.assign('/bookings');
    alert('deleted');
  };

  return (
    <div>
      <Anav/>

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
                  <button onClick={() => deletecar(car._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                <FaTrash/>
              </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Bookings
