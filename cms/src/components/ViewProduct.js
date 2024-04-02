import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const userRole = sessionStorage.getItem('userRole');
    useEffect(() => {
        const userRole = sessionStorage.getItem('userRole');
        fetchProducts();
        
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            console.log('Products response:', response.data); // Log the response data
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleViewSite = (link) => {
        console.log(link)
        navigate(`/iframe?url=${encodeURIComponent(link)}`);
    };

    const handleDownloadZip = async (zipFileName) => {
        try {
            if (!zipFileName) {
                console.error('Zip file name is undefined');
                return;
            }
    
            // Fetch the zip file from the server
            const response = await axios.get(`/uploads/${zipFileName}`, {
                baseURL: 'http://localhost:3001',
                responseType: 'blob', // Set the response type to 'blob'
            });
            
            // Create a URL for the blob object
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    
            // Create a temporary anchor element
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
    
            // Set the href attribute to the blob URL
            anchor.href = blobUrl;
    
            // Set the download attribute to the desired file name
            anchor.download = zipFileName;
    
            // Append the anchor to the document body
            document.body.appendChild(anchor);
    
            // Click the anchor to trigger the download
            anchor.click();
    
            // Remove the anchor and revoke the blob URL from memory
            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading zip file:', error);
            // Provide feedback to the user about the error
            // You can show a notification or an error message to the user
        }
    };
    
    
    

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>View Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product, index) => (
                    <div key={index} style={{ margin: '10px', width: '300px' }}>
                        <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                            <h3 style={{ color: '#333', marginBottom: '10px' }}> Title: {product.title}</h3>
                            <p style={{ color: '#666', marginBottom: '10px' }}> Description: {product.description}</p>
                            <div style={{ display: 'flex' }}>
                                Sample: <img src={`http://localhost:3001/uploads/${product.image}`} alt={product.title} style={{ maxWidth: '70%', height: '50%', borderRadius: '5px' }} />
                            </div>


                                {/* <p style={{ color: '#666', marginBottom: '10px' }}> Zip File Name: {product.file}</p> */}

                                {userRole ==="user" && (
            <>
                            
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                Zip File:
                                <button onClick={() => handleDownloadZip(product.file)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}>Download Zip</button>
                                <button onClick={() => handleViewSite(product.link)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}>View Site</button>
                            </div>
                            </>
          )}        
                              
                       
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewProduct;
