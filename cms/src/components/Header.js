import React from 'react';
import { Link } from 'react-router-dom';
import logoutIcon from './logout.jpg'; // Import your logout icon image

function Header({ isAdmin ,userRole}) {
  const handleLogout = () => {
    // Clear sessionStorage and navigate to login page
    sessionStorage.removeItem('userRole');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="header-bg">
      <div className="wrap">
        <div className="header">
          <link href="/css/style.css" rel="stylesheet" type="text/css" media="all" />
          <div className="logo">
            <Link to="/"><img src="images/log.jpg" style={{ width: '130px', height: '70px', marginTop: '10px' }} alt="" title="logo" /></Link>
          </div>
          <div className="hdr-nav">
            <ul className="nav">
              <li><Link to="/">Home</Link></li>
              {isAdmin && (
                <>
                  <li><Link to="/add-product">Add Product</Link></li>
                  <li><Link to="/vw_product">View Product</Link></li>
                  <li className="logout-icon" style={{width:'20px',marginTop:'23px'}} onClick={handleLogout}><img src={logoutIcon} alt="Logout" /></li>
                </>
              )}
              {userRole === "user" && (
                <>
                  <li><Link to="/view_products">View product</Link></li>
                  <li className="logout-icon" style={{width:'20px',marginTop:'23px'}} onClick={handleLogout}><img src={logoutIcon} alt="Logout" /></li>
                </>
              )}
              {!userRole && (
                <>
                  <li><Link to="/contact">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </>
              )}
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
