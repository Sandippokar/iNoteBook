import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
          const json = await response.json();
          if (json.success){
            //Save auth token and Redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success")
            navigate("/"); 
          }else {
            props.showAlert("Invalid Creadentials", "danger")
          }
    }
    return (
        <div className='mt-2'>
        <h2 className='my-3'>Login to continue to iNotebool</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label HtmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label HtmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
    )
}