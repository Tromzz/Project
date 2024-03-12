import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleViewZipFile = async (fileUrl) => {
        try {
            const response = await axios.post('http://localhost:3001/view-zip', { fileUrl });
            // Handle the response, e.g., display the contents of the zip file
            console.log(response.data);
        } catch (error) {
            console.error('Error viewing zip file:', error);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>View Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product, index) => (
                    <div key={index} style={{ margin: '10px', width: '300px' }}>
                        <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                            <h3 style={{ color: '#333', marginBottom: '10px' }}> Title : {product.title}</h3>
                            <p style={{ color: '#666', marginBottom: '10px' }}> Description :{product.description}</p>
                            <div style={{ display: 'flex' }}>
                              Image :  <img src={product.filename} alt={product.title} style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }} />
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                {/* <a href={product.link} target="_blank" rel="noopener noreferrer">
                                    <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>EDIT</button>
                                </a> */}
                                Zip File :<button onClick={() => handleViewZipFile(product.file)} style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}>View Zip File</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewProduct;
