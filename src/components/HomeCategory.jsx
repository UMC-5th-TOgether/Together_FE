import React from 'react'
import { Link } from 'react-router-dom';
import CategoryPosting from '../components/CategoryPosting'

export default function HomeCategory() {
    return (
    
        <>
        <div className= "Category-Info">
    
            <br/>
            <h3 style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 'bold',fontSize: '0.8rem', color:'#B3B3B3', display:'flex',justifyContent:'center'}}>카테고리 빠른 이동</h3>
            <br/>
            <h1 style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 'bold',fontSize: '1.4rem' }}>
              4가지 카테고리로 원하는 매칭을 찾아보세요 !
            </h1>
            <br/>
          <div className="Category-Container-Wrapper">  
            <div className = "Category-Container">
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctgmeal">01 식사</Link>
              </div>
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctgexercise">02 운동</Link>
              </div>
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctgconcert">03 공연</Link>
              </div>
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctghobby">04 취미</Link>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <h1 style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 'bold', fontSize: '1.4rem' }}>
            한눈에 보는 카테고리별 인기 포스트
          </h1>
          <br/>
            <div className= "Category-Wrap3">
              <div className="Category-Wrap2">
                <div className= "Category-Only">공연</div>
                <div className= "Category-Only">운동</div>
                <div className= "Category-Only">식사</div>
                <div className= "Category-Only">취미</div>
              </div>
            </div>
        
        </div>
        <br/>
        <br/>
       
        <CategoryPosting/>
    
        </>
      )
}
