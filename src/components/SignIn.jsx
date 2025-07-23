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
