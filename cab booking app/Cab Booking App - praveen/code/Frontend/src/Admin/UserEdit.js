import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Anav from './Anav'


const UserEdit = () => {
      const [name,setName]=useState()
      const [email,setEmail]=useState('')

      let {id}=useParams()
      console.log(id)
      let navigate=useNavigate()
    
      useEffect(()=>{
        axios.get('http://localhost:8000/getuser/'+id)
         .then((resp)=>{
        console.log(resp)
        setName(resp.data.name)
        setEmail(resp.data.email)
          })
         .catch(()=>{
           console.log(" DIDNT GET")
         })
         },[])
     
        let formHandle=(e)=>{
          e.preventDefault();
          let payload = { name,email }
              axios.put(`http://localhost:8000/useredit/${id}`,payload)
              .then((res)=>{
                  console.log(res)
            alert("data updated successfully")
              })
              navigate("/users")
          }
  return (
    <div>
      <Anav/>
      <br/>
     <div  >  
        <h1 className='text-center'>Update User</h1>    <br/>
        <form onSubmit={formHandle} className="max-w-md mx-auto mt-4 p-4 bg-red-300 rounded shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600">Name:</label>
       <input placeholder="name" onChange={(e)=> setName(e.target.value)}  value={name} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">Email:</label>
      <input placeholder=" Email" onChange={(e)=> setEmail(e.target.value)}  value={email}  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br/> 
     </div>

      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>

</form>
</div>  
    </div>
  )
}

export default UserEdit