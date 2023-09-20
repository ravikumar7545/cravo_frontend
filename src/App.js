import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Toaster } from 'react-hot-toast';
import PizzaProvider from './PizzaContext';
import { ErrorBoundary } from "react-error-boundary";
import ErrorContainer from './components/ErrorContainer';

const App = () => {

  return (
    <ErrorBoundary
  FallbackComponent={ErrorContainer}
>
    <PizzaProvider>
    <BrowserRouter>
      
    <Toaster toastOptions={{className: 'toaster-notification'}}/>

        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/*" element={<Homepage />}></Route>
        </Routes>
    </BrowserRouter>
      </PizzaProvider>
      </ErrorBoundary>
  );
};

export default App;
