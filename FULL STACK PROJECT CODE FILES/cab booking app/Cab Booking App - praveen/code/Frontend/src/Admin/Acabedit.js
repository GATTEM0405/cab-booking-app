import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Anav from './Anav'


const Acabedit = () => {
    const [formData, setFormData] = useState({
        drivername:'',
        carname:'',
        cartype: '',
        carno: '',
        price:'',
        image:'',
      });

      let {id}=useParams()
      console.log(id)
      let navigate=useNavigate()
      console.log(id)
    
    
      useEffect(()=>{
        axios.get('http://localhost:8000/acar/'+id)
         .then((resp)=>{
        console.log(resp)
        setFormData(resp.data)
          })
         .catch(()=>{
           console.log(" DIDNT GET")
         })
         },[])

         const handleChange = (e) => {
            if (e.target.name === 'carImage') {
              setFormData({ ...formData, [e.target.name]: e.target.files[0] });
            } else {
              const { name, value } = e.target;
              setFormData({ ...formData, [name]: value });
            }
          };
    
       let formHandle=(e)=>{
          e.preventDefault();
          
              axios.put(`http://localhost:8000/acaredit/${id}`,formData)
              .then((res)=>{
                  console.log(res)
            alert("cab updated successfully")
              })
              navigate("/acabs")
          }
  return (
    <div>
      <Anav/>
      <br/>
      <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg" style={{backgroundColor:"lightskyblue"}}>
      <h2 className="text-2xl font-semibold mb-4">Edit Car Data</h2>
      <form onSubmit={formHandle}>
      <div className="mb-4">
          {/* <label className="block text-gray-600">Driver Name</label> */}
          <input
            type="text"
            name="drivername"
            placeholder='Driver Name'
            value={formData.drivername}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      <div className="mb-4">
          {/* <label className="block text-gray-600">Car Model</label> */}
          <input
            type="text"
            name="carname"
            placeholder='Car Model'
            value={formData.carname}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-600">Car Type</label> */}
          <input
            type="text"
            name="cartype"
            placeholder='Car Type'
            value={formData.cartype}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-600">Car no</label> */}
          <input
            type="text"
            name="carno"
            placeholder='Car No'
            value={formData.carno}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-600">Price</label> */}
          <input
            type="text"
            name="price"
            placeholder='Price'
            value={formData.price}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-600">Car Image</label>
          <input
            type="file"
            name="carImage"
            accept="image/*"
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.image}
          />
        </div> */}
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </form>
   
    </div>
    </div>
  )
}

export default Acabedit