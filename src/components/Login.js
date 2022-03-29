import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    let navigate = useNavigate()

    const [credential, setCredentials] = useState({
        email:'',
        password:''
    })

    const onChange=(e)=>{
        setCredentials({...credential,[e.target.name]:e.target.value})
    }

    const handleSubmit =async (e) =>{

        e.preventDefault()

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credential.email,password:credential.password} )
          });
      
          const json = await response.json()
          console.log(json)
          if(json.success){
              localStorage.setItem('token',json.authToken)
              navigate('/')
              props.showAlert("Logged-In Successfully","success")
          }else(
              props.showAlert("Invalid Credentials","danger")
          )
    }

    return (
        <div className='container'>
        <h1 className='text-center'>Login to your iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credential.email} className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credential.password} className="form-control" id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login