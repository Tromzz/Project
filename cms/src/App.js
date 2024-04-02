import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AddProduct from './components/AddProduct';
import ViewProduct from './components/ViewProduct';
import Iframe from './components/Iframe';
import UViewProduct from './components/UViewProduct';
import Payment from './components/Payment';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const userRole = sessionStorage.getItem('userRole');
  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole === 'admin') {
      console.log(userRole)
      setIsAdmin(true);
      
    } 
    else {
      setIsAdmin(false);
    
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header isAdmin={isAdmin} userRole={userRole} />
        <Routes >
          <Route exact path="/" element={<Content />} />
          <Route exact path="/contact" element={<RegisterForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          {userRole === "admin" && (
            <>
              <Route exact path="/add-product" element={<AddProduct />} />
              <Route exact path="/vw_product" element={<ViewProduct userRole={userRole}/>} />
            </>
          )}
          {userRole === "user" && (
            <>
               <Route exact path="/view_products" element={<UViewProduct />} />
               <Route exact path="/payment" element={<Payment />} />
         
            </>
          )}
          <Route exact path="/iframe" element={<Iframe />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
