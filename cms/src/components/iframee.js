import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Iframe() {
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); 
    const [headingText, setHeadingText] = useState(''); 
    const [isEditing, setIsEditing] = useState(false);
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const siteUrl = urlParams.get('url');
    const fileId = urlParams.get('fileId'); 

    const handleImageChange = async (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);
    };
    const handleDownload = () => {
        window.location.href = `/payment?fileId=${fileId}`;
    };
    
    const handleHeadingInputChange = (event) => {
        setHeadingText(event.target.value);
    };

    const applyHeadingText = () => {
        setIsEditing(false);
        const iframe = document.getElementById('siteIframe');
        if (iframe) {
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow) {
                iframeWindow.postMessage({
                    type: 'UPDATE_HEADING_TEXT',
                    text: headingText,
                    fileId: fileId 
                }, '*');
            }
        }
    };
    

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'UPDATE_HEADING_TEXT') {
                const headingElement = document.querySelector('h1');
                if (headingElement) {
                    headingElement.innerText = event.data.text;
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    useEffect(() => {
        const fetchSiteContent = async () => {
            try {
                await axios.get(siteUrl); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching site content:', error);
                setLoading(false);
            }
        };

        if (siteUrl) {
            fetchSiteContent();
        }
    }, [siteUrl]);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>View Site</h2>
            <div className="contact" style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <label htmlFor="imageUpload">
                        Change Image
                        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    </label>
                </div>
                <div>
                    {isEditing ? (
                        <input type="text" value={headingText} onChange={handleHeadingInputChange} />
                    ) : (
                        <span><input type="button" value="Change Heading" onClick={() => setIsEditing(true)} /></span>
                    )}
                    <br />
                </div>
                <div>
                    <span><input type="button" value="Apply" onClick={applyHeadingText} /></span>
                </div>
                <div>
                    <span><input type="button" value="Download" onClick={handleDownload} /></span>
                </div>

            </div>
            <div className="loading-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <iframe id="siteIframe" src={siteUrl} title="External Site" style={{ width: '100%', height: '500px', border: 'none' }} />
                )}
            </div>
        </div>
    );
}

export default Iframe;








// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function Iframe() {
//     const [loading, setLoading] = useState(true);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [navText, setNavText] = useState(''); // State to store the text for navigation item
//     const { search } = useLocation();
//     const urlParams = new URLSearchParams(search);
//     const siteUrl = urlParams.get('url');
//     const fileId = urlParams.get('fileId');

//     const handleImageChange = async (event) => {
//         const imageFile = event.target.files[0];
//         setSelectedImage(imageFile);
//         updateImagePreview(imageFile);
//     };

//     const handleColorChange = (event) => {
//         const color = event.target.value;
//         sendColorMessage(color);
//     };
//     const sendColorMessage = (color) => {
//         const iframeWindow = document.getElementById('siteIframe').contentWindow;
//         if (iframeWindow) {
//             iframeWindow.postMessage({ type: 'UPDATE_TEXT_COLOR', color }, '*');
//         }
//     };
//     const handleTextChange = (event) => {
//         setNavText(event.target.value); // Update the state with the typed text
//     };

//     const sendTextMessage = () => {
//         const iframeWindow = document.getElementById('siteIframe').contentWindow;
//         if (iframeWindow) {
//             iframeWindow.postMessage({ type: 'UPDATE_NAV_TEXT', text: navText }, '*');
//         }
//     };

//     const updateImagePreview = (imageFile) => {
//         const imageElement = document.getElementById('site-image');
//         if (imageElement) {
//             const imageUrl = URL.createObjectURL(imageFile);
//             imageElement.src = imageUrl;
//         }
//     };

//     useEffect(() => {
//         const handleMessage = (event) => {
//             if (event.data.type === 'UPDATE_HEADING_TEXT') {
//                 const headingElement = document.querySelector('h1');
//                 if (headingElement) {
//                     headingElement.innerText = event.data.text;
//                 }
//             }
//         };

//         window.addEventListener('message', handleMessage);

//         return () => {
//             window.removeEventListener('message', handleMessage);
//         };
//     }, []);

//     useEffect(() => {
//         const fetchSiteContent = async () => {
//             try {
//                 await axios.get(siteUrl);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching site content:', error);
//                 setLoading(false);
//             }
//         };

//         if (siteUrl) {
//             fetchSiteContent();
//         }
//     }, [siteUrl]);

//     return (
//         <div>
//             <h2 style={{ textAlign: 'center' }}>View Site</h2>
//             <div className="contact" style={{ display: 'flex', justifyContent: 'center' }}>
//                 <div>
//                     <label htmlFor="imageUpload">
//                         Change Image
//                         <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
//                     </label>
//                 </div>
//                 <div className="color-picker">
//                     <label htmlFor="colorPicker">Choose Text Color:</label>
//                     <input type="color" id="colorPicker" onChange={handleColorChange} />
//                 </div>
//                 <div>
//                     <input type="text" value={navText} onChange={handleTextChange} placeholder="Enter text for navigation" />
//                     <button onClick={sendTextMessage}>Change Nav Text</button>
//                 </div>
//             </div>
//             <div className="loading-container">
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <iframe id="siteIframe" src={siteUrl} title="External Site" style={{ width: '100%', height: '500px', border: 'none' }} />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Iframe;
