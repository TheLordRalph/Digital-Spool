import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './layout/header';
import Favorite from './pages/Favorite';
import Home from './pages/Home';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/favorite-photos' element={<Favorite />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
