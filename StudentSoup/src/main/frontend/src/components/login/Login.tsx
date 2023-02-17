import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from '../common/mainNavbar';
import './login.scss';
import useInput from '../../hooks/useInput';
import { signIn } from '../../apis/auth/AuthAPI';

const Login = () => {
  const [userId, onChangeUserId, setUserId] = useInput('');
  const [userPassword, onChangeUserPassword] = useInput('');
  const [rememberId, setRememberId] = useState('unchecked-remember-id');

  const navigate = useNavigate();

  const onClickRememberId = () => {
    if (rememberId === 'unchecked-remember-id') {
      setRememberId('checked-remember-id');
      localStorage.setItem('rememberId', userId);
    } else if (rememberId === 'checked-remember-id') {
      setRememberId('unchecked-remember-id');
      localStorage.removeItem('rememberId');
    }
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      onClickRememberId();
      signIn(userId, userPassword).then(response => {
        console.log(response);
        // TODO: 로그인 정보 저장 코드 및 에러처리 구현하기
        navigate('/');
      });
    },

    [userId, userPassword],
  );

  useEffect(() => {
    const rememberIdValue: string | null = localStorage.getItem('rememberId');
    if (rememberIdValue != null) {
      setRememberId('checked-remember-id');
      setUserId(localStorage.getItem('rememberId'));
    }
  }, []);
  return (
    <>
      <div className="background">
        <MainNavbar />
        <div className="main">
          <h2>로그인</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="id"
              value={userId}
              onChange={onChangeUserId}
              placeholder="아이디 또는 이메일을 입력해주세요"
            />
            <input
              type="password"
              className="password"
              value={userPassword}
              onChange={onChangeUserPassword}
              placeholder="비밀번호를 입력해주세요"
            />
            <div className="login-keep-wrap">
              <div className="remember-wrap" onClick={onClickRememberId}>
                <div className={rememberId} />
                <span>아이디 저장</span>
              </div>
              <Link to="/find">아이디/비밀번호 찾기</Link>
            </div>
            <button className="login-button" type="submit">
              로그인
            </button>
            <Link to="/signup" className="signup-link">
              <button className="signup-button">회원가입</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
