import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../store/LoginActions';

export const LoginControl = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch]);

    const handleToggleClick = async () => {
        if (isLoggedIn) {
            navigate('/login');
            localStorage.removeItem('token');
            dispatch(setIsLoggedIn(false));
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="header-nav-item" onClick={handleToggleClick}>로그아웃</div>
            ) : (
                <div className="header-nav-item" onClick={handleToggleClick}>로그인</div>
            )}
        </div>
    );
};
