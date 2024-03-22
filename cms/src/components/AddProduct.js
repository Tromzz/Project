// Frontend code to submit the form data
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AddProductForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        file: null,
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('link', formData.link);
            formDataToSend.append('file', formData.file);
            formDataToSend.append('image', formData.image);

            await axios.post('http://localhost:3001/addProduct', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully');
            navigate('/vw_product');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    return (
        <div className="contact-form">
            
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Link:</label>
                    <input type="text" name="link" value={formData.link} onChange={handleChange} />
                </div>
                <div>
                    <label>File:</label>
                    <input type="file" name="file" onChange={handleFileChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddProductForm;
