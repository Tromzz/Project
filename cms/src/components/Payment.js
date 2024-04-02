import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cvv: '',
    validDate: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const fileId = new URLSearchParams(location.search).get('fileId');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
       const userId= sessionStorage.getItem('user_Id');
       console.log("current_user",userId)
      await axios.post('http://localhost:3001/store-book', {
        userId: userId, 
        fileId: fileId,
      });
      // Download the zip file
      await axios.get(`http://localhost:3001/download-book/${fileId}`, {
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.zip');
        document.body.appendChild(link);
        link.click();
      });
      alert("payment successfull , the zip file has been downloaded")
      navigate('/view_product');
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
          <span><label>CARD NUMBER</label></span>
          <span><input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required/></span>
        </div>
        <div>
          <span><label>CVV</label></span>
          <span><input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required /></span>
        </div>
        <div>
          <span><label>VALID DATE</label></span>
          <span><input type="text" name="validDate" value={formData.validDate} onChange={handleChange} required /></span>
        </div>
        <div>
          <span><input type="submit" value="Submit" /></span>
        </div>
      </form>
    </div>
  );
}

export default Payment;
