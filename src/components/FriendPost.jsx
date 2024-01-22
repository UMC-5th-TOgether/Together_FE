import React from 'react'

export default function FriendPost() {
  return (
    <div className="Header-Post-Wrapper">
      <div className="Header-Post">
        <div className="HP-1">
          <img 
          style = {{ width: "40px", height: "40px"}}
          alt = "로고"
          src="/follow_cat.png"/>
          <div className="Header-Post-User">
            <div>UserName</div>
            <div>여성/20세</div>
          </div>
          <div className="Header-Post-Title">
            뉴진스 팬미팅 동행 구합니다
          </div>
        </div>
        <div className="RequestMessage">
            요청보냄
        </div>
      </div>
    </div>
  )
}
