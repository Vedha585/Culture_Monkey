import React, { useContext, useState, useEffect } from 'react';
import './Signup.css'; // Optional: Create a CSS file for styling
import DataContext from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';
import loginData from '../Data/login.json'; // Import the JSON file with login data

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { users, setUsers } = useContext(DataContext); // Users from context
    const navigate = useNavigate();

    // Combine users from context and JSON on component mount
    useEffect(() => {
        // If users from context are empty, initialize them from loginData
        if (users.length === 0) {
            const initialUsers = loginData.login.map(({ username, password }) => ({ username, password }));
            setUsers(initialUsers);
        }
    }, [users, setUsers]);

    const handleSignup = (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Check if the user already exists in the loginData
        const userExists = users.find((user) => user.username === username);

        if (userExists) {
            setError('User already exists.');
            return;
        }

        // Add new user to the context state and loginData
        addUser();
        setError(''); // Clear any errors
        navigate('/'); // Redirect to the login page after successful signup
    };

    const addUser = () => {
        const newUser = { username, password, id: generateId() }; // Generate a new unique ID for the user
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);

        // For demonstration purposes, logging the new user addition
        console.log('New user added:', newUser);

        // Optionally, add the new user to the loginData as well (in a real application, save to backend)
        loginData.login.push(newUser);
    };

    const handleLogin = () => {
        navigate('/'); // Redirect to the login page
    };

    // Function to generate a unique user ID (you can replace it with your logic)
    const generateId = () => {
        return Math.random().toString(36).substr(2, 9); // Random 9 character string as ID
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Sign Up</button>
                {error === 'User already exists' && (
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                )}
            </form>
        </div>
    );
};

export default Signup;
