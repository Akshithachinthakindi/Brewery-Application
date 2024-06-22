// SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { name, email, password });
            console.log(response.data); // Handle success message
            window.location.href = '/login'; // Redirect to login page upon successful sign-up
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.response.data.error || 'Error signing up');
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Sign Up</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
                <p className="mt-3">
          Already have an account?{' '}
          <a href="/login">Sign in here</a>
        </p>
            </form>
        </div>
    );
};

export default Signup;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// function Signup() {
//     const [name, setName] = useState()
//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState()
//     const navigate = useNavigate()

//     const handleSignUp = async () => {
//         try {
//             const response = await axios.post('/api/signup', { name, email, password });
//             console.log(response.data); // Handle success message
//             // Redirect or show success message
//         } catch (error) {
//             console.error('Error signing up:', error);
//             // Handle error response
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3001/api/signup', {name, email, password})
//             .then(result => {console.log(result)
//                 navigate('/login')
//             })
//             .catch(err => console.log(err))
//     }
    
//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email">
//                             <strong>Name</strong>
//                         </label>
//                         <input type="text"
//                         placeholder="Enter Name"
//                         autoComplete="off"
//                         name="email"
//                         className="form-control rounded-0"
//                         onChange={(e) => setName(e.target.value)}
//                          />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email">
//                             <strong>Email</strong>
//                         </label>
//                         <input type="email"
//                         placeholder="Enter Email"
//                         autoComplete="off"
//                         name="email"
//                         className="form-control rounded-0"
//                         onChange={(e) => setEmail(e.target.value)} />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email">
//                             <strong>Password</strong>
//                         </label>
//                         <input type="password"
//                         placeholder="Enter Password"
//                         name="password"
//                         className="form-control rounded-0"
//                         onChange={(e) => setPassword(e.target.value)} />
//                     </div>
//                     <button type="submit" className="btn btn-success w-100 rounded-0" onClick={handleSignUp}>
//                         Register
//                     </button>
//                     </form>
//                     <p>Already Have an Account?</p>
//                     <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//                         Login
//                 </Link>
//             </div>
//         </div> 
//     );
// }

// export default Signup;