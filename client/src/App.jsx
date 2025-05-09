import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Favourites from './components/Favourites';
import Footer from './components/Footer';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<Details />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/favourites" element={<Favourites/>} />

            </Routes>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;