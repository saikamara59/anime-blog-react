import React from 'react';
import {useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';
import {  UserContext } from '../context/UserContext';


const SignIn = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username:"",
        password:""
    });

    const handleChange = (evt) => {
        setMessage('');
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const user = await signIn(formData);
            setUser(user);
            navigate('/dashboard');
        } catch (error) {
            setMessage(error.message);
        }
    }

    return(
        // <div
        // className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <main>
            <h1 className='text-2xl font-bold mb-4'>Sign In</h1>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-96'>
                <div className='mb-4'>
                    <label>
                        Username
                    </label>
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded'
                        required
                    />
                </div>
                {message && <p className='text-red-500 text-sm'>{message}</p>}
                <button
              type="button"
              className="w-full py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 shadow-xl delay-150"
              onClick={() => navigate("/home")}
            > Cancel 
                </button>
                {/* </div> */}
            </form>
        </main>   
    );
};

export default SignIn;