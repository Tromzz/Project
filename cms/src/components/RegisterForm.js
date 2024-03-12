import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    subject: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', formData);
      console.log(response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-form">
      <h3>Contact Us</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <span><label>NAME</label></span>
          <span><input type="text" name="name" value={formData.name} onChange={handleChange} /></span>
        </div>
        <div>
          <span><label>E-MAIL</label></span>
          <span><input type="text" name="email" value={formData.email} onChange={handleChange} /></span>
        </div>
        <div>
          <span><label>PASSWORD</label></span>
          <span><input type="password" name="password" value={formData.password} onChange={handleChange} /></span>
        </div>
        <div>
          <span><label>MOBILE</label></span>
          <span><input type="text" name="mobile" value={formData.mobile} onChange={handleChange} /></span>
        </div>
        <div>
          <span><label>ADDRESS</label></span>
          <span><textarea name="subject" value={formData.subject} onChange={handleChange} /></span>
        </div>
        <div>
          <span><input type="submit" value="Submit" style={{ color: 'white'}}/></span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
