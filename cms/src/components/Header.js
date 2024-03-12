import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-bg">
      <div className="wrap">
        <div className="header">
        <link href="/css/style.css" rel="stylesheet" type="text/css" media="all" />
          
          <div className="logo">
            <Link to="/"><img src="images/log.jpg" style={{ width: '130px', height: '70px' , marginTop: '20px'}} alt="" title="logo" /></Link>
          </div>
          <div className="hdr-nav">
            <ul className="nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              {/* <li><Link to="/vw_product">View Product</Link></li>
              <li><Link to="/add-product">Add Product</Link></li> */}
              <div id="lavalamp"></div>
            </ul>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
