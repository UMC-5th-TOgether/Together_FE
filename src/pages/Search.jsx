import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import profile from "../assets/profile.png";
import '../style/Search.css';

export default function Search() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const params = new URLSearchParams(window.location.search);
    const initQuery = params.get('q');
    const [searchResultList, setSearchResultList] = useState([]);
    const [isComposing, setIsComposing] = useState(false);
    const [query, setQuery] = useState('');
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetchData(initQuery);
    }, []);

    useEffect(() => {
        console.log('list update')
        console.log(searchResultList);
    }, [searchResultList]);

    const fetchData = async (keyword) => {
        await axios.get(`https://hyeonjo.shop/api/posts?keyword=${keyword}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(res => {
                if (res.data.isSuccess) {
                    return res.data
                }
            })
            .then(data => {
                setSearchResultList(data.data);
            })
            .catch(err =>  {
                console.log(err);
            })
    }

    const fetchPostData = async (postId) => {
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        console.log(postId)
        try {
            const res = await axios.get(`https://hyeonjo.shop/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(res.data.data);
            setPostData(res.data.data);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };

    useEffect(() => {
        if (postData !== null) {
            navigate(`/postuser/${postData.id}`, { state: { postData } });
        }
    }, [postData, navigate]);

    const keydownHandler = (e) => {
        if (isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            fetchData(query);
        }
    }

    return (
        <div className='search-page'>
            <div className='search-container'>
                <p>전체 검색</p>
                <div className='search-input-container'>
                    <CiSearch id='search-input-icon' size='32'/>
                    <input
                        className='search-input-field'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => keydownHandler(e)}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                    />
                </div>
                <div className='search-result-count'>총 <span>{`${searchResultList.length} 개`}</span>의 검색 결과가 있어요!</div>
            </div>
            <div className='search-result-container'>
                {
                    searchResultList.length === 0
                    ? <></>
                    :
                        searchResultList.map((item, index) => {
                            let gender;
                            if (item.memberDTO.gender === 'MALE') {
                                gender = '남성'
                            } else if (item.memberDTO.gender === 'FEMALE') {
                                gender = '여성'
                            } else {
                                gender = '비공개'
                            }

                            let visibleContent;
                            const longContent = item.content;
                            if (longContent.length >= 100) {
                                const trimContent = longContent.substr(0, 100);
                                visibleContent = `${trimContent}...`;
                            } else {
                                visibleContent = longContent;
                            }

                            let recruitGender;
                            if (item.gender === 'MALE') {
                                recruitGender = '남성'
                            } else if (item.gender === 'FEMALE') {
                                recruitGender = '여성'
                            } else {
                                recruitGender = '제한 없음'
                            }

                            let recruitNum;
                            if (item.personNumMax) {
                                recruitNum = `${item.personNumMin}명~${item.personNumMax}명`;
                            } else {
                                recruitNum = `${item.personNumMin}명`
                            }

                            let visibleStatus;
                            if (item.status === 'ING') {
                                visibleStatus = '매칭 중'
                            } else {
                                visibleStatus = '매칭 완료'
                            }

                            item.postHashtagList = ['에스파', '뉴진스', '아이돌'];
                            return <>
                               <div className='search-result-item' key={index} onClick={() => fetchPostData(item.id)}>
                                   <div className='search-result-writer'>
                                       <img className='writer-icon' src={item.memberDTO.image ? item.memberDTO.image : profile} alt='writer-profile-icon'/>
                                       <div className='writer-infos'>
                                           <div className='writer-nickname'>{item.memberDTO.nickname}</div>
                                           <div className='writer-ageNgender'>{`${gender}/${item.memberDTO.age}`}</div>
                                       </div>
                                   </div>
                                   <div className='search-result-content'>
                                       <div className='search-result-content-title'>{item.title}</div>
                                       <div className='search-result-content-content'>{visibleContent}</div>
                                       { item.postHashtagList
                                           ? <div className='search-result-hashtags'>
                                               <div className='search-result-hashtag' style={item.postHashtagList[0] ? {display: "block"} : {display: "none"}}>{`#${item.postHashtagList[0]}`}</div>
                                               <div className='search-result-hashtag' style={item.postHashtagList[1] ? {display: "block"} : {display: "none"}}>{`#${item.postHashtagList[1]}`}</div>
                                               <div className='search-result-hashtag' style={item.postHashtagList[2] ? {display: "block"} : {display: "none"}}>{`#${item.postHashtagList[2]}`}</div>
                                           </div>
                                            : <></>
                                       }
                                       <div className='search-result-recruitInfo'>
                                           <div className={visibleStatus === '매칭 중' ? 'search-result-status-ING' : 'search-result-status-END'}>{visibleStatus}</div>
                                           {`${item.meetTime} · ${recruitGender} · ${recruitNum} | 작성일: ${item.createdAt.split('T')[0]}`}
                                       </div>
                                   </div>
                                   <hr />
                               </div>
                            </>
                        })
                }
            </div>
        </div>
    );
}