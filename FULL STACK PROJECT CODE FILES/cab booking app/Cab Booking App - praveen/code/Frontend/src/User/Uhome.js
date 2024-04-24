import React from 'react'
import Unav from './Unav'
import SimpleMap from '../Components/GoogleMapsComponent'
import './uhome.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const Uhome = () => {
    const navigate=useNavigate();
  return (
    <div>
        <Unav/>
        <br/>
        
            <h1 className="text-center">Welcome to the Ucab </h1>
            <p className="text-center" style={{color:"white"}}> Cab Booking is the ultimate solution for all your transportation needs. Whether you're looking for a convenient ride to work, a hassle-free airport transfer,<br/> or a safe and reliable ride around town, our app has you covered.</p>
            <div style={{display:"flex",justifyContent:"center"}}>
       <img src='https://img.freepik.com/free-vector/enjoy-your-ride-mobile-interface-design_23-2148403284.jpg?w=996&t=st=1697613626~exp=1697614226~hmac=4ff797ce0ba1e52975d6462a3c96fb71eb2ecf0ca57e8ca615b7cb8c6c6fa44d' style={{display:"flex",justifyContent:"center",height:"500px",width:"80%"}}/>
  
        </div>
        <br/>
        <div >
         <h1 style={{color:"white"}}>Safety for all</h1>
 <p style={{fontSize:"30px"}}>At  Ucab  , they well being of our customers is above everything else.
 <br/>We are constantly in pursuit of enhancing our safety measures to ensure every 
 <br/>Ucab ride is a pleasent and comfortable  experiance</p>
        </div>
        <div>
            <h1 style={{color:'white'}}>Why use the Ucab app?</h1>
            <img src='https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_1440,h_338/v1536163144/assets/27/d1f66e-c9c5-455a-b912-234700f4c0d8/original/whyRideWithUs_desktop.svg' />
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <div>
                    <p style={{fontSize:"30px",color:"white"}}>Rides on demand</p>
                    <p style={{fontSize:"20px"}}>Request a ride at any time and on any day of the year.</p>
                </div>
                <div>
                    <p style={{fontSize:"30px",color:"white"}}>Budget-friendly options</p>
                    <p style={{fontSize:"20px"}}>Compare prices on every kind of ride, from daily commutes to special evenings out.</p>
                </div>
                <div>
                    <p style={{fontSize:"30px",color:"white"}}>An easy way to get around</p>
                    <p style={{fontSize:"20px"}}>Tap and let your driver take you where you want to go.</p>
                </div>
            </div>
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-between"}}>
<img src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_698,h_465/v1602280707/assets/ca/8ba51a-ac4a-438d-a62e-776bf6920c1a/original/Reserve_Web-4_Trip.jpg' style={{height:"400px"}}/>
       <div style={{paddingLeft:"30px",marginTop:"80px"}}>
       <h1 style={{color:"white"}}>Reserve a ride that's ready when you are</h1>
       <p style={{fontSize:"30px"}}>Now more than ever, reservations are a way of life. Reserve a premium Uber experience, up to 90 days in advance, for whenever you’re ready to ride.</p>
  </div>     
   </div>
        <br/>
        <button   className="bg" onClick={()=>{navigate('/ucabs')}}>Book Ride →</button>
             <br/>
             <br/>
        <SimpleMap/>
        <br/>
        <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-between">
        <div className="w-1/3">
          <h3 className="text-lg font-semibold mb-2">Contact Us:</h3>
          <p>📧 Email: support@ucab.com</p>
          <p>📞 Phone: +1-123-456-7890</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-lg font-semibold mb-2">Follow Us:</h3>
          <p>🌐 Website: <a href="http://www.ucab.com" className="text-blue-400" target="_blank" rel="noopener noreferrer">www.ucab.com</a></p>
          <p>📱 Social Media: [Insert Social Media Icons/Links]</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-lg font-semibold mb-2">Help & Support:</h3>
          <p>📝 <a href="/faqs" className="text-blue-400">FAQs</a></p>
          <p>🔒 <a href="/privacy-policy" className="text-blue-400">Privacy Policy</a></p>
          <p>📄 <a href="/terms-of-service" className="text-blue-400">Terms of Service</a></p>
        </div>
      </div>
      <p className="text-center mt-6">[ Ucab App ] - Your Trusted Transportation Partner</p>
      <p className="text-center text-sm">Copyright © {new Date().getFullYear()} - All rights reserved</p>
    </footer>
    </div>
  )
}

export default Uhome