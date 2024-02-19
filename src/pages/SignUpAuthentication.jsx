import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SignUpBanner from '../assets/sign-up.png';
import '../style/Login.css';

export default function SignUpAuthentication() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;

    const [name, setName] = useState('');
    const [residentNumber1, setResidentNumber1] = useState('');
    const [residentNumber2, setResidentNumber2] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [telecomCompany, setTelecomCompany] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumber1, setPhoneNumber1] = useState('');
    const [phoneNumber2, setPhoneNumber2] = useState('');

    const [smsData, setSmsData] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    let genderValue;
    if (gender === '제한 없음') {
        genderValue = 'NONE';
    } else if (gender === '여성') {
        genderValue = 'FEMALE';
    } else if (gender === '남성') {
        genderValue = 'MALE';
    }

    function calculateAge(residentNumber1, residentNumber2) {
        const birthdayString = residentNumber1;
        let yearPrefix;

        if (parseInt(birthdayString.substr(0, 2)) < 23) {
            yearPrefix = 2000;
        } else {
            yearPrefix = 1900;
        }

        const birthday = new Date(
            yearPrefix + parseInt(birthdayString.substr(0, 2)),
            parseInt(birthdayString.substr(2, 2)) - 1,
            parseInt(birthdayString.substr(4, 2))
        );

        const today = new Date();

        let age = today.getFullYear() - birthday.getFullYear();
        if (
            (today.getMonth() < birthday.getMonth()) ||
            (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())
        ) {
            age--;
        }

        return age.toString();
    }

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleResidentNumber1 = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        setResidentNumber1(value);
    };

    const handleResidentNumber2 = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        setResidentNumber2(value);

        if (value == "1" || value == "3") {
            setGender("MALE");
        }
        else if (value == "2" || value == "4") {
            setGender("FEMALE");
        }

        const age = calculateAge(residentNumber1, value);
        setAge(age);
    };

    const handleTelecomCompany = (e) => {
        const value = e.target.value;
        setTelecomCompany(value);
    };

    const handlePhoneNumber1Change = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        setPhoneNumber1(value);
    };

    const handlePhoneNumber2Change = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        setPhoneNumber2(value);
    };

    const combinePhoneNumbers = () => {
        const combinedPhoneNumber = "010" + phoneNumber1 + phoneNumber2;
        setPhoneNumber(combinedPhoneNumber);
    };

    useEffect(() => {
        combinePhoneNumbers();
    }, [phoneNumber1, phoneNumber2]);

    const onClickConfirmButton = async (e) => {

        if (name === '' || residentNumber1 === '' || residentNumber2 === '' || telecomCompany === '' || phoneNumber1 === '' || phoneNumber2 === '') {
            alert('이름, 주민등록번호, 통신사, 휴대폰 번호를 모두 입력해주세요.');
            return;
        }

        console.log(phoneNumber);
        console.log(gender);
        console.log(age);

        try {
            setIsLoading(true);

            // const res = await axios.post("https://hyunjin.link/api/auth/signup", {
            const res = await axios.post("https://hyeonjo.shop/api/auth/signup", {
                nickname: userData.nickname,
                email: userData.email,
                password: userData.pw,
                name: name,
                age: age,
                gender: gender,
                phoneNumber: phoneNumber,
            });

            if (res.data.isSuccess) {
                // const resSms = await axios.get(`https://hyunjin.link/api/auth/checkSms?phoneNumber=${phoneNumber}`);
                const resSms = await axios.get(`https://hyeonjo.shop/api/auth/checkSms?phoneNumber=${phoneNumber}`);
                console.log(resSms.data);
                setSmsData(resSms.data.data);

                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/checkSms', { state: { smsData } });
                }, 1500);

                console.log(smsData);

            } else {
                setIsLoading(false);
                alert(res.data.message);
            }

            // setTimeout(() => {
            //     setIsLoading(false);
            //     navigate('/checkSms');
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

            <div className="login-content-wrap">

                <div className="hr-sect"> 실명 인증 </div>
                <br />

                <div className="login-input-title">이름</div>
                <div className="login-input-wrap">
                    <input
                        className="login-input"
                        type="text"
                        value={name}
                        placeholder="이름을 입력하세요."
                        onChange={handleName}
                    />
                </div>

                <div className="login-input-title">주민등록번호</div>
                <div className="login-wrap">
                    <div className="login-input-wrap" style={{ width: '240px' }}>
                        <input
                            className="login-input login-input-center"
                            type="text"
                            value={residentNumber1}
                            placeholder="YYMMDD"
                            maxLength="6"
                            onChange={handleResidentNumber1}
                        />
                    </div>
                    <p>-</p>
                    <div className="login-input-wrap" style={{ width: '240px' }}>
                        <input
                            className="login-input login-input-center"
                            type="text"
                            value={residentNumber2.substr(0, 1) + '●'.repeat(6)}
                            placeholder="X●●●●●●"
                            maxLength="7"
                            onChange={handleResidentNumber2}
                        />
                    </div>
                </div>


                <div className="login-input-title">통신사</div>
                <div className="login-input-wrap">
                    <select
                        className="login-input"
                        value={telecomCompany}
                        onChange={handleTelecomCompany}
                    >
                        <option value="">통신사를 선택하세요.</option>
                        <option value="SKT">SKT</option>
                        <option value="KT">KT</option>
                        <option value="LG U+">LG U+</option>
                        <option value="알뜰폰">알뜰폰</option>
                    </select>
                </div>


                <div className="login-input-title">휴대폰 번호</div>
                <div className="login-wrap">
                    <div className="login-input-wrap" style={{ width: '120px' }}>
                        <input
                            className="login-input login-input-center"
                            type="text"
                            value="010"
                            disabled
                        />
                    </div>
                    <p>-</p>
                    <div className="login-input-wrap" style={{ width: '145px' }}>
                        <input
                            className="login-input login-input-center"
                            type="text"
                            value={phoneNumber1}
                            maxLength="4"
                            onChange={handlePhoneNumber1Change}
                        />
                    </div>
                    <p>-</p>
                    <div className="login-input-wrap" style={{ width: '145px' }}>
                        <input
                            className="login-input login-input-center"
                            type="text"
                            value={phoneNumber2}
                            maxLength="4"
                            onChange={handlePhoneNumber2Change}
                        />
                    </div>
                </div>
                <br />
                <br />

                <button onClick={onClickConfirmButton} className="login-bottom-button" disabled={isLoading}>
                    {isLoading ? 'Loading...' : '실명 인증하기'}
                </button>
            </div>
        </div>
    );

}