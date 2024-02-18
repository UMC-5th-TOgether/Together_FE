import React, { useEffect, useState } from 'react';
import usersData from '../../data/UserProfileData.json';
import defaultAvatar from '../../assets/프로필.png';
import fullStar from '../../assets/star.png';
import emptyStar from '../../assets/emptystar.png';
import '../../style/NicknameStyle.css';
import axios from 'axios';

const Nickname = () => {
    const token = localStorage.getItem('token');
    const { profileImg, nickname, profileMessage, manners, location, gender, age } = usersData[0];
    const starView = {
        width: `${manners * 24}px`,
    };
    const [FriendInfo, setFriendInfo] = useState(null);

    useEffect(() => {
        const fetchFriendInfo = async () => {
            try {
                const res = await axios.get(`https://hyeonjo.shop/api/friends/${FriendInfo.friendId}/info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res.data);

                if (res.data.isSuccess) {
                    console.log(res.data.data);
                    const data = res.data.data;
                    setFriendInfo(data.memberInfo);
                }
            } catch (error) {
                console.error('Error fetching my info: ', error);
            }
        };
        fetchFriendInfo();
    }, []);

    return (
        <div className="nickname-container">
            <div className="profile-container">
                <img src={profileImg || defaultAvatar} alt={`Profile of ${nickname}`} className="profile-avatar" />
                <div className="profileDetail-container">
                    <p className="nickname-font">
                        {nickname} ({gender}/{age})
                    </p>
                    <p className="location">{location}</p>
                    <p className="introduction">"{profileMessage}"</p>
                </div>
            </div>
            <div className="point-container">
                <div className="pointDetail-container">
                    <p className="point-font">동행횟수</p>
                    <p className="point-font2" style={{ marginLeft: '30px' }}>
                        3명 중 2명의 이용자가 다시 만나고 싶어해요.
                    </p>
                </div>
                <div className="pointDetail-container">
                    <p className="point-font">매너 별점</p>
                    <p className="point-font2">
                        <div className="average-container" style={{ width: starView }}>
                            <div className="full-star-box" style={starView}>
                                <img src={fullStar} alt="fullstar"></img>
                                <img src={fullStar} alt="fullstar"></img>
                                <img src={fullStar} alt="fullstar"></img>
                                <img src={fullStar} alt="fullstar"></img>
                                <img src={fullStar} alt="fullstar"></img>
                            </div>
                            <div className="empty-star-box">
                                <img src={emptyStar} alt="emptystar"></img>
                                <img src={emptyStar} alt="emptystar"></img>
                                <img src={emptyStar} alt="emptystar"></img>
                                <img src={emptyStar} alt="emptystar"></img>
                                <img src={emptyStar} alt="emptystar"></img>
                            </div>
                            <span style={{ marginLeft: '13px' }}>( {manners} )</span>
                        </div>
                    </p>
                </div>
                <div className="pointDetail-container">
                    <p className="point-font">응답률</p>
                    <p className="point-font2" style={{ marginLeft: '50px' }}>
                        100%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Nickname;
