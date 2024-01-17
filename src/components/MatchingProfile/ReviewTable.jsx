import React from 'react';
import './ReviewTable.css';

export default function ReviewTable() {
    const reviewList = [
        {
            detail: '함께 해서 즐거웠습니다!',
        },
        {
            detail: '다음에 기회가 된다면 또 뵈었으면 좋겠네요!',
        },
    ];
    return (
        <div className="ReviewBox">
            <div>작성된 후기</div>
            <p>{reviewList[0].detail}</p>
            <p>{reviewList[1].detail}</p>
            <p>hi</p>
        </div>
    );
}
