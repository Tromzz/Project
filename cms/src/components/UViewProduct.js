import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UViewProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            console.log('Products response:', response.data);
            setProducts(response.data.products.map(product => ({
                ...product,
                fileId: product._id, // Assuming title can be used as fileId
            })));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // const handleViewSite = (link,fileId) => {
    //     console.log(link)
    //     console.log(fileId)
    //     navigate(`/iframe?url=${encodeURIComponent(link)}?_id=${fileId}`);
    // };
    const handleViewSite = (link, fileId) => {
        navigate(`/iframe?url=${encodeURIComponent(link)}&fileId=${fileId}`);
    };
    
    const handleDownload = (fileId) => {
        navigate(`/payment?fileId=${fileId}`);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>View Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product, index) => (
                    <div key={index} style={{ margin: '10px', width: '300px' }}>
                        <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                            <h3 style={{ color: '#333', marginBottom: '10px' }}> Title: {product.title}</h3><br></br>
                            <p style={{ color: '#666' }}> Description: {product.description}</p>
                            <p style={{ color: '#666'}}> Cost : {product.cost}</p><br></br>
                            <div style={{ display: 'flex' }}>
                               <img src={`http://localhost:3001/uploads/${product.image}`} alt={product.title} style={{ maxWidth: '70%', height: '50%', borderRadius: '5px' }} />
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                         
                                <button onClick={() => handleDownload(product.fileId)} style={{ backgroundColor: 'gray', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft: '2px', cursor: 'pointer' }}>Download</button>
                                <button onClick={() => handleViewSite(product.link, product.fileId)} style={{ backgroundColor: 'gray', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}>View Site</button>

                                {/* <button onClick={() => handleViewSite(product.link)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}>View Site</button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UViewProduct;
