import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import usersData from '../../data/UserProfileData.json';
import '../../style/FriendStyle.css';
import defaultAvatar from '../../assets/프로필.png';

const UserProfile = ({ image, nickname, introduction, gender, age }) => {
    return (
        <div className="user-profile">
            <div className="avatar-container">
                {image ? (
                    <img src={image} alt={`Profile of ${nickname}`} className="avatar" />
                ) : (
                    <img src={defaultAvatar} alt="profile" className="avatar" />
                )}
            </div>
            <div className="nickname">
                {nickname}
                <p>
                    ({gender === 'FEMALE' ? '여성' : '남성'}/{age})
                </p>
            </div>
            <div className="friend-introduction">"{introduction}"</div>
        </div>
    );
};
const Friend = () => {
    const token = localStorage.getItem('token');

    const [friendList, setFrindList] = useState(null);

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const res = await axios.get('https://hyeonjo.shop/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res.data);

                if (res.data.isSuccess) {
                    console.log(res.data.data);
                    const data = res.data.data;
                    setFrindList(data.friendList);
                }
            } catch (error) {
                console.error('Error fetching my info:', error);
            }
        };

        fetchFriendList();
    }, []);

    const activeStyle = {
        color: 'white',
        backgroundColor: 'black',
    };

    return (
        <div className="app">
            <main>
                <div className="button-container">
                    <NavLink
                        className="nav-button"
                        style={({ isActive }) => (isActive ? activeStyle : {})}
                        to="/following"
                    >
                        팔로잉
                    </NavLink>
                    <NavLink
                        className="nav-button"
                        style={({ isActive }) => (isActive ? activeStyle : {})}
                        to="/follower"
                    >
                        팔로워
                    </NavLink>
                    <NavLink
                        className="nav-button"
                        style={({ isActive }) => (isActive ? activeStyle : {})}
                        to="/friend"
                    >
                        친구목록
                    </NavLink>
                </div>
                <div className="user-list">
                    {usersData.map((user) => (
                        <Link to={`/FriendProfile`} state={{matchingId: user.userId}} className="user-profile-link" key={user.id}>
                            <UserProfile
                                image={user.profileImg}
                                nickname={user.nickname}
                                introduction={user.profileMessage}
                                gender={user.gender}
                                age={user.age}
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Friend;
