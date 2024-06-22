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