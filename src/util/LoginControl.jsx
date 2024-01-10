import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IsLoggedIn from '../pages/Login'

export const LoginControl = () => {
    const navigate = useNavigate();

    const handleToggleClick = () => {
        if (IsLoggedIn) {
            navigate('/');
        } else {
            // localStorage.removeItem('token');
            navigate('/login');
        }
        // setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    return (
        <div>
            {IsLoggedIn ? (
                <div onClick={handleToggleClick}>로그인</div>
            ) : (
                <div onClick={handleToggleClick}>로그아웃</div>
            )}
        </div>
    );
}
