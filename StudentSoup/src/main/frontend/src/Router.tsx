import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Err404 from './components/err404/Err404';
import Login from './components/login/Login';
import FindAccount from './components/login/FindAccount';
import Restaurant from './components/restaurant/Restaurant';
import SignUpProcess1 from './components/signup/SignUpProcess1';
import SignUpProcess2 from './components/signup/SignUpProcess2';
import SignUpProcess3 from './components/signup/SignUpProcess3';
import Notice from './components/notice/Notice';

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Err404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/findAccount" element={<FindAccount />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/signup/process1" element={<SignUpProcess1 />} />
      <Route path="/signup/process2" element={<SignUpProcess2 />} />
      <Route path="/signup/process3" element={<SignUpProcess3 />} />
      <Route path="/notice" element={<Notice />} />
    </Routes>
  );
};

export default Router;
