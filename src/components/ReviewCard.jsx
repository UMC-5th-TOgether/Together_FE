import React from "react";
import { styled } from "styled-components";
//UserIconImg server에게 get,post 요청 해서 이미지 받아야함.
import { ReactComponent as UserIconImg } from "../images/userIcon.svg";
import { ReactComponent as FullStar } from "../images/fullStar.svg";
import { ReactComponent as EmptyStar } from "../images/emptyStar.svg";

export default function ReviewCard() {
  return (
    <ReviewBox>
      <Contents>
        <UserBox>
          <UserIconImg />
          <UserDetailBox>
            <UserName>naningu</UserName>
            <CategoryBox>
              <CategoryHash>#에스파</CategoryHash>
              <CategoryHash>#에스파</CategoryHash>
              <CategoryHash>#에스파</CategoryHash>
            </CategoryBox>
            <StarBox>
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
              <Point>5</Point>
            </StarBox>
          </UserDetailBox>
        </UserBox>
        <UserReviewBox>
          처음에는 어색할까봐 걱정했지만, 공통된 취향과 관심사를 가진 사람들과
          매칭되어 함께 다양한 활동을 즐길 수 있었어요!
        </UserReviewBox>
      </Contents>
    </ReviewBox>
  );
}

//전체를 덮고 있는 큰 박스
const ReviewBox = styled.div`
  display: flex;
  width: 493px;
  height: 238px;
  background-color: var(--White, #fff);
  border-radius: 24px;
  box-shadow: 0px 4px 20px 0px rgba(51, 51, 51, 0.1);
`;

// 박스안에 있는 컨텐츠
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 32px;
`;

//user이미지와 이름, 카테고리 해쉬테그, 별점등을 포함하고있는 박스
const UserBox = styled.div`
  display: flex;
  text-align: center;
`;

const UserDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;

const UserName = styled.div`
  color: var(--Black, #333);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 28px */
  letter-spacing: -1px;
  display: flex;
  justify-content: left;
`;

const StarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const Point = styled.p`
  color: var(--Black, #333);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 33.6px */
  letter-spacing: -1px;
  margin-left: 8px;

  vertical-align: text-top;
`;

const CategoryBox = styled.div`
  display: flex;
  margin-top: 4px;
`;

const CategoryHash = styled.div`
  width: 73px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  font-size: 13px;
  border-radius: 5px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 18.2px */
  letter-spacing: -1px;
  color: #808080;
  background-color: #f3f3f3;
  margin-right: 8px;
`;

const UserReviewBox = styled.div`
  display: flex;
  text-align: center;
  width: 381px;
  height: 44px;
  color: var(--Gray-07, #4d4d4d);
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: -1px;
  margin-top: 25px;
`;
