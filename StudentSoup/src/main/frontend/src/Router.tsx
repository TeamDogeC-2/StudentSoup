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
import MypageMain from './components/mypage/MypageMain';
import RestaurantDetail from './components/restaurant/RestaurantDetail';
import Notice from './components/notice/Notice';
import Scheduler from './components/mypage/MypageScheduler';
import Board from './components/board/Board';

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Err404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/findAccount" element={<FindAccount />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/restaurant/detail" element={<RestaurantDetail />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/signup/process/1" element={<SignUpProcess1 />} />
      <Route path="/signup/process/2" element={<SignUpProcess2 />} />
      <Route path="/signup/process/3" element={<SignUpProcess3 />} />
      <Route path="/board" element={<Board />} />
      <Route path="/mypage" element={<MypageMain />} />
      <Route path="/scheduler" element={<Scheduler />} />
    </Routes>
  );
};

export default Router;
