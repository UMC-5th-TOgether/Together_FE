import React from 'react';
import './PostTable.css';
import NextImg from '../../assets/nextbtn.png';
import PrevImg from '../../assets/prevbtn.png';
import MatchingImg from '../../assets/matching.png';
import BeforeImg from '../../assets/beforematching.png';

export default function PostTable() {
    const postList = [
        {
            title: '크리스마스 쿠키 클래스 같이 들어요!',
            state: true,
        },
        {
            title: '뉴진스 팬미팅 동행 구합니다.',
            state: false,
        },
        {
            title: '전시회 같이 갈 사람',
            state: false,
        },
        {
            title: '배구경기 같이 보러갈 분 구합니다.',
            state: false,
        },
        {
            title: '라이즈 팝업 같이 가요!',
            state: false,
        },
    ];

    return (
        <div className="PostBox">
            <div>
            <h2>작성한 글</h2>
                <img src={PrevImg} alt="prevImg" />
                <img src={NextImg} alt="nextImg" />
            </div>
            <div>
                <p>{postList[0].title}</p>
                <p>
                    {postList[0].state ? (
                        <img src={MatchingImg} alt="MatchingImg" />
                    ) : (
                        <img src={BeforeImg} alt="BeforeImg" />
                    )}
                </p>
            </div>
            <div>
                <p>{postList[1].title}</p>
                <p>
                    {postList[1].state ? (
                        <img src={MatchingImg} alt="MatchingImg" />
                    ) : (
                        <img src={BeforeImg} alt="BeforeImg" />
                    )}
                </p>
            </div>
        </div>
    );
}
