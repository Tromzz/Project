import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../src/components/Header';
import Content from '../src/components/Content';
import Footer from '../src/components/Footer';
import RegisterForm from '../src/components/RegisterForm';
import LoginForm from '../src/components/LoginForm';
import AddProduct from '../src/components/AddProduct';
import ViewProduct from '../src/components/ViewProduct';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (isAdmin) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
  };

  const handleLogout = () => {
    //Perform logout logic here
    setIsLoggedIn(false);
    setIsAdmin(false); //Reset user role on logout
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
        <Routes >
          <Route exact path="/" element={<Content/>} />
          <Route exact path="/contact" element={<RegisterForm/>}/>
          <Route exact path="/login" element={<LoginForm onLogin={handleLogin}/>}/>
          <Route exact path="/add-product" element={<AddProduct/>}/>
          <Route exact path="/vw_product" element={<ViewProduct />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
