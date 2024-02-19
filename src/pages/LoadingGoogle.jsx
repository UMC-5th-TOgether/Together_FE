import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setIsLoggedIn} from "../store/LoginReducer";
import {useDispatch} from "react-redux";

export default function LoadingGoogle() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const dispatch = useDispatch();

    const isGoogleUserExist = (googleCode) => {
        return axios.get(`https://hyeonjo.shop/api/auth/login/google?code=${googleCode}`);
    }

    const socialLogin = async (email) => {
        await axios.post(`https://hyeonjo.shop/api/auth/socialLogin?provider=google`, { email: email })
            .then(res => {
                if (res.data.isSuccess) {
                    return res.data.data
                }
            })
            .then(data => {
                setTimeout(() => {
                    alert("로그인에 성공했습니다.");
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    // setAuthHeader(token);
                    dispatch(setIsLoggedIn(true));
                    dispatch(setIsLoggedIn(true));
                    navigate('/');

                }, 1500);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        isGoogleUserExist(code)
            .then(res => {
                if (res.data.isSuccess) {
                    return res.data.data;
                }
            })
            .then(data => {
                if (!data.exist)  {
                    const userData = {
                        email: data.email,
                        nickname: data.nickname,
                        password: data.password
                    }
                    navigate('/authentication', {state: {data: userData, provider: 'google'}});
                } else {
                    socialLogin(data.email)
                }
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    return (
        <>
        </>
    )
}