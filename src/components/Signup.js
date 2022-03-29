import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  let navigate = useNavigate()

  const [credential, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  })

  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    });

    const json = await response.json()
    console.log(json.authToken)
    if(json.success){
      localStorage.setItem('token',json.authToken)
      navigate('/')
      props.showAlert("Accout created successfully","success")
  }else(
      props.showAlert("Invalid Credentials","danger")
  )
  }

  return (
    <div className='container'>
     <h1 className='text-center'>Create an account for your iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input type="text" onChange={onChange} value={credential.name} className="form-control" id="name" name='name' aria-describedby="emailHelp" minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" onChange={onChange} value={credential.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onChange} value={credential.password} className="form-control" id="password" name='password' minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" onChange={onChange} value={credential.cpassword} className="form-control" id="cpassword" name='cpassword' minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup