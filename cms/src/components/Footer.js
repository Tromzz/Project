import React from 'react';

function Footer() {
    return (
        <div className="footer-bg">
            <div className="wrap">
                <div className="footer">
                    <div className="section group">
                        
                        <div className="col_1_of_4 span_1_of_4">
                            <h3>Information</h3>
                            <ul className="nav1">
                                <li>
                              
                                A content management system helps you create, manage, and publish content 
                                on the web. It also helps keep content organized and accessible so it can 
                                be used and repurposed effectively. 
                                    
                                    
                                    
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col_1_of_4 span_1_of_4">
                            <h3>Contact Us</h3>
                            <ul className="nav1">
                                <li>22-56-2-9 Sit Amet, Lorem,</li>
                                <li>INDIA</li>
                                <li>Phone:(+91) 999 666 4444 </li>
                                <li>Email:<a href="mailto:example@mail.com"> <span>admin@mycompany.com</span></a></li>
                            </ul>
                        </div>
                        <div className="col_1_of_4 span_1_of_4">
                            <h3>Follow Us</h3>
                            <div className="social-icons">
                                <ul>
                                    <li className="facebook"><a href="#" target="_blank"> </a></li>
                                    <li className="twitter"><a href="#" target="_blank"> </a></li>
                                    <li className="googleplus"><a href="#" target="_blank"> </a></li>
                                    <li className="contact"><a href="#" target="_blank"> </a></li>
                                    <div className="clear"></div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer1-bg">
                <div className="wrap">
                    <div className="footer1">
                        <p className="w3-link">© 2024 CMS . All Rights Reserved | </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
