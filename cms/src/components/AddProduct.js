import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [cost, setCost] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('cost', cost);
    formData.append('image', image);
    formData.append('file', file);

    try {
        await axios.post('http://localhost:3001/addProduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert("Product Added Successfully")
          navigate('vw_product');

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="contact-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Link:</label>
          <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
        <div>
          <label>Cost:</label>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
