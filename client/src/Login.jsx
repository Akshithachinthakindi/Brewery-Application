import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/login', {email, password})
            .then(result => {console.log(result)
                if(result.data === "Success") {
                    navigate('/brewerysearch')
                }
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" autoComplete="off" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <p className="mt-3">
          Don't have an account?{' '}
          <a href="/signup">Sign up here</a>
        </p>
        </form>
        </div> 
    );
}

export default Login;