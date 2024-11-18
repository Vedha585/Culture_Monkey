import React, { useContext, useState } from 'react';
import './Login.css'; // Optional: Create a CSS file for styling
import DataContext from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';
import loginData from '../Data/login.json'; // Import local JSON data

const Login = () => {
    const [username, setUsername] = useState('');  // Declare username state
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated, setUsername: setContextUsername } = useContext(DataContext);
    const navigate = useNavigate();

    const users = loginData.login; // Access login data directly from the JSON file

    const handleLogin = (event) => {
        event.preventDefault();

        // Validate user credentials
        const user = users.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            console.log(`Login successful`, user);
            setContextUsername(user.username);  // Set the username in context
            setIsAuthenticated(true);
            navigate('/Home');
            setError('');
        } else {
            setError(`Invalid username or password`);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}  // Update username state
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <br />
            </p>
            <button onClick={() => navigate('/Signup')}>Sign Up</button>
        </div>
    );
};

export default Login;
