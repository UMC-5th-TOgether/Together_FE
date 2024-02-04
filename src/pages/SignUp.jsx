import axios from "axios";
import React, { useState } from "react";
import { validateEmail, validatePw, validateNickname, validateBirthdate } from '../util/SignUpValidation';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google-icon.png';
import naverIcon from '../assets/naver-icon.png';
import kakaoIcon from '../assets/kakao-icon.png';
import SignUpBanner from '../assets/sign-up.png';
import '../style/Login.css';
import { GoogleLoginButton, KakaoLoginButton, NaverLoginButton } from "../util/SocialLogin";
import { ModalContent1, ModalContent2, ModalContent3 } from '../elements/TermsOfService';

export default function SignUp() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [station, setStation] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [stationError, setStationError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [checkbox3Checked, setCheckbox3Checked] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
  };

  const handleCheckbox3Change = () => {
    setCheckbox3Checked(!checkbox3Checked);
  };

  const handleModal1 = (e) => {
    e.preventDefault();
    setShowModal1(true);
  };

  const handleModal2 = (e) => {
    e.preventDefault();
    setShowModal2(true);
  };

  const handleModal3 = (e) => {
    e.preventDefault();
    setShowModal3(true);
  };

  const handleCloseModal = () => {
    setShowModal1(false);
    setShowModal2(false);
    setShowModal3(false);
  };

  const handleNickname = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (!validateNickname(value)) {
      setNicknameError('2글자 이상 8글자 이하로 입력해주세요.');
    } else {
      setNicknameError('');
    }
  };

  function calculateAge(birthdate) {
    const today = new Date();

    let age = (today.getFullYear() - parseInt(birthdate.slice(0, 4)) + 1).toString();

    return age;
  }

  const handleBirthdate = (e) => {
    const value = e.target.value;
    setBirthdate(value);

    if (!validateBirthdate(value)) {
      setBirthdateError('생년월일 8자리를 입력하세요.');
      setAge('');
    } else {
      setBirthdateError('');
      const age = calculateAge(value);
      setAge(age);
      console.log("age:", age);
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('올바른 이메일을 입력하세요.');
    } else {
      setEmailError('');
    }
  };

  const handlePw = (e) => {
    const value = e.target.value;
    setPw(value);
    if (!validatePw(value)) {
      setPwError('영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.');
    } else {
      setPwError('');
    }
  };

  const onClickConfirmButton = async (e) => {
    if (email === '' || pw === '') {
      alert('이메일, 비밀번호를 모두 입력해주세요.');
      return;
    }

    console.log(emailError)
    if (emailError || pwError) {
      alert('이메일 또는 비밀번호 형식이 틀렸습니다.');
      return;
    }

    if (!checkbox1Checked || !checkbox2Checked || !checkbox3Checked) {
      alert('모든 약관에 동의해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post("http://hyeonjo.shop/api/auth/signup", {
        // nickname: nickname,
        email: email,
        password: pw,
        // age: age,
        // gender: gender,
        // station: station
      });

      if (res.data.isSuccess) {
        setTimeout(() => {
          setIsLoading(false);
          navigate('/signup/Authentication ');
        }, 1500);
      } else {
        setIsLoading(false);
        alert(res.data.message);
      }

      // setTimeout(() => {
      //   setIsLoading(false);
      //   navigate('/signup/Authentication');
      // }, 1500);
    }
    catch (err) {
      alert(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="banner-image-container">
        <img className="banner-image" src={SignUpBanner} alt="SignUp img" />
      </div>
      <br />

      <div className="login-content-wrap">

        <div className="hr-sect"> 이메일로 가입하기</div>
        <br />
        {/* <div className="login-input-title">닉네임</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="text"
            value={nickname}
            placeholder="닉네임을 입력하세요."
            onChange={handleNickname}
          />
        </div>
        {nicknameError && <div className="error">{nicknameError}</div>}

        <div className="login-input-title">생년월일</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="text"
            value={birthdate}
            placeholder="생년월일 8자리를 입력하세요."
            onChange={handleBirthdate}
          />
        </div>
        {birthdateError && <div className="error">{birthdateError}</div>} */}

        <div className="login-input-title">이메일</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="text"
            value={email}
            placeholder="이메일을 입력하세요."
            onChange={handleEmail}
          />
        </div>
        {emailError && <div className="error">{emailError}</div>}


        <div className="login-input-title">비밀번호</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="password"
            value={pw}
            placeholder="비밀번호를 입력하세요."
            onChange={handlePw}
          />
        </div>
        {pwError && <div className="error">{pwError}</div>}
        <br />
        <br />

        <div className="check-box-signup">
          <input type="checkbox" checked={checkbox1Checked} onChange={handleCheckbox1Change} />
          <label onClick={handleModal1}> 서비스 약관에 동의합니다. <a href="/">내용 보기</a></label>
        </div>
        <div className="check-box-signup">
          <input type="checkbox" checked={checkbox2Checked} onChange={handleCheckbox2Change} />
          <label onClick={handleModal2}> 개인정보 수집 및 이용에 동의합니다. <a href="/">내용 보기</a></label>
        </div>
        <div className="check-box-signup">
          <input type="checkbox" checked={checkbox3Checked} onChange={handleCheckbox3Change} />
          <label onClick={handleModal3}> 위치 기반 서비스 이용약관에 동의합니다. <a href="/">내용 보기</a></label>
        </div>

        {showModal1 && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ModalContent1 onClose={handleCloseModal} />
            </div>
          </div>
        )}

        {showModal2 && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ModalContent2 onClose={handleCloseModal} />
            </div>
          </div>
        )}

        {showModal3 && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <ModalContent3 onClose={handleCloseModal} />
            </div>
          </div>
        )}

        <div className="to-login">
          <span>이미 계정이 있으신가요? <a href="/login">Log in</a> </span>
        </div>
        <button onClick={onClickConfirmButton} className="login-bottom-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : '다음'}
        </button>

        <div className="hr-sect">소셜 계정으로 가입하기</div>

        <div className="social-login">
          <Link onClick={GoogleLoginButton}>
            <img src={googleIcon} alt="google" />
          </Link>
          <Link onClick={NaverLoginButton}>
            <img src={naverIcon} alt="naver" />
          </Link>
          <Link onClick={KakaoLoginButton}>
            <img src={kakaoIcon} alt="kakao" />
          </Link>
        </div>
      </div>
    </div>
  );
}
