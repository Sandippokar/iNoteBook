import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    const navigate = useNavigate();
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          if (json.success){
            //Save auth token and Redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/"); 
            props.showAlert("Account Createed Successfully", "success")
          }else {
            props.showAlert("Invalid Details", "danger")
          }
    }


  return (
    <div className='mt-2'>
        <h2 className='my-3'>Create an account to use iNotebool</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label HtmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label HtmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label HtmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label HtmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
  )
}