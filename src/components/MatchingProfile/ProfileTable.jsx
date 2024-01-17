import React from 'react';
import './ProfileTable.css';
import ProfileImg from '../../assets/profile.png';

export default function ProfileTable() {
    return (
        <div className="ProfileBox">
            <img src={ProfileImg} alt="profileImg" />
            <div className="UserName">AlmondBriize(여성/23)</div>
            <div className="UserLocation">합정역 2호선</div>
        </div>
    );
}
