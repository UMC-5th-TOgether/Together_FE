import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {dummy} from '../PostUserDummy';
import postUser from '../assets/post-user.png';
import matching from '../assets/matching-application-button.png';
import chatting from '../assets/chatting-button.png';
import profilePicture from '../assets/profile.png';
import option from '../assets/dot-vertical.png';
import '../style/PostUser.css';
import '../style/Posting.css';
import { BsArrowReturnRight } from "react-icons/bs";

export default function PostUser() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const location = useLocation();
    const postData = location.state.postData;
    const [isOptionOn, setIsOptionOn] = useState(false);

    const {id} = useParams();
    const postId = parseInt(id);
    console.log(postId);

    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState('');

    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    if (postData.gender === 'NONE') {
        postData.gender = '제한 없음';
    } else if (postData.gender === 'FEMALE') {
        postData.gender = '여성';
    } else if (postData.gender === 'MALE') {
        postData.gender = '남성';
    }

    if (postData.category === 'PLAY') {
        postData.category = '공연';
    } else if (postData.category === 'EXERCISE') {
        postData.category = '운동';
    } else if (postData.category === 'EAT') {
        postData.category = '식사';
    } else if (postData.category === 'HOBBY') {
        postData.category = '취미';
    }

    const formatTime = (datetimeString) => {
        if (!datetimeString) return '';
        const updateYear = datetimeString.slice(0, 4);
        const updateMonth = datetimeString.slice(5, 7);
        const updateDate = datetimeString.slice(8, 10);
        const updateTime = datetimeString.slice(11, 16);

        const timeString = updateYear + "." + updateMonth + "." + updateDate + " " + updateTime

        return timeString;
    };


    // useEffect(() => {
    //     const fetchPostData = async () => {
    //         try {
    //             const res = await axios.get(`https://hyeonjo.shop/api/posts/${postId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 }
    //             });
    //             setPostData(res.data.data);
    //             console.log(postData);
    //         } catch (error) {
    //             console.error('Error fetching post data:', error);
    //         }
    //     };

    //     fetchPostData();
    // }, [postId, token]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`https://hyeonjo.shop/api/post/comment/id?id=${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            setComments(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {

        fetchComments();

    }, [postId, token]);

    const handleCommentSubmit = async (e) => {
        if (newComment.trim() == '') {
            return;
        }

        try {
            console.log(token);
            console.log(newComment);

            const commentData = {
                post: id,
                content: newComment,
                parent: "-1"
            }

            await axios.post(`https://hyeonjo.shop/api/post/comment`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

            setNewComment('');

            await fetchComments()
        } catch (err) {
            alert(err);
        }
    };

    const handleReplyButtonClick = (commentId) => {
        setReplyToCommentId(commentId === replyToCommentId ? null : commentId);
        setReplyContent('');
    };

    const handleReplySubmit = async () => {
        if (replyContent.trim() !== '') {
            const commentData = {
                post: postId,
                content: replyContent,
                parent: `${replyToCommentId + 1}`
            }

            await axios.post(`https://hyeonjo.shop/api/post/comment`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

            await setReplyToCommentId(null);
            await setReplyContent('');

            await fetchComments();
        }
    };

    const handelDeletePost = async () => {
        await axios.delete(`https://hyeonjo.shop/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res.data.isSuccess) {
                    alert('게시글이 삭제되었습니다.');
                    navigate('/Category');
                }
            })
            .catch(err =>{
                console.log(err);
            })
    }

    const handelEditPost = async () => {
        navigate('/posting', {state: {edit: true, postData: postData}});
    }

    return (
        <div className="posting-page">
            <div className="banner-image-container">
                <img className="banner-image" src={postUser} alt="Posting img"/>
            </div>
            <br/>
            <div className="posting-post">
                {postData && (
                    <div>
                        <div className="posting-top-container">
                            <div className="posting-post-title">{postData.title}</div>
                            {postData.writer.isWriter
                                ?<>
                                    <div className={`posting-top-option-wrap ${isOptionOn ? 'on' : ''}`} onClick={() => setIsOptionOn(!isOptionOn)}>
                                        <img className="posting-top-option" src={option} alt="더보기"/>
                                    </div>
                                    {isOptionOn
                                        ?<>
                                            <div className='posting-top-option-pannel'>
                                                <div className='poting-top-option-pannel-btn' onClick={handelEditPost}>포스팅 수정</div>
                                                <hr/>
                                                <div className='poting-top-option-pannel-btn' onClick={handelDeletePost}>포스팅 삭제</div>
                                            </div>
                                        </>
                                        :<></>
                                    }
                                </>
                                :<></>
                            }
                        </div>
                        <div className="posting-wrap">
                            <div className="posting-author-profile">
                                <img className="posting-profile-picture" src={postData.writer.image ? postData.writer.image : profilePicture} alt="Profile"/>
                                <div className="posting-profile">
                                    <span className="posting-nickname">{postData.writer.nickname} ({postData.writer.gender === 'FEMALE' ? '여성' : '남성'}/{postData.writer.age})</span>
                                    <span className="posting-date-created">{formatTime(postData.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="posting-post-content">
                            <div className="posting-wrap">
                                <div className="posting-hashtag-wrap">카테고리</div>
                                <span className="posting-li"> {postData.category}</span>
                                <div className="posting-hashtag-wrap">일자</div>
                                <span className="posting-li"> {postData.meetTime}</span>
                                <div className="posting-hashtag-wrap">모집</div>
                                <span className="posting-li"> {postData.personNumMin}명</span>
                                <div className="posting-hashtag-wrap">성별</div>
                                <span className="posting-li"> {postData.gender}</span>
                            </div>
                            <div className="posting-content"> {postData.content} </div>
                        </div>
                        <div className="posting-wrap">
                            {postData.postHashtagList.map((tag, tagIndex) => (
                                <div key={tagIndex} className="posting-hashtag">#{tag}</div>
                            ))}
                        </div>
                        {Array.isArray(postData.postImages) && postData.postImages.length > 0 && (
                            <div className="posting-wrap">
                                {postData.postImages.map((image, index) => (
                                    <img key={index} className="posting-images" src={image} alt={`postImage-${index}`} />
                                ))}
                            </div>
                        )}
                        <div className="postuser-button-wrap">
                            <Link to="/chatting">
                                <img className="posting-bottom-button" src={chatting} alt="chatting"/>
                            </Link>
                            {postData.writer.isWriter
                            ? <></>
                            : <Link to="/matching">
                                    <img className="posting-bottom-button" src={matching} alt="matching"/>
                                </Link>
                            }
                        </div>
                    </div>
                )}
            </div>
            <br/>
            {comments.map((comments, id) => (
                <div className="posting-comment-post" key={id}>
                    <div className="posting-wrap">
                        <div className="posting-comment-profile">
                            <img className="posting-profile-picture" src={comments.writer.image ? comments.writer.image : profilePicture} alt="Profile"/>
                            <div className="posting-profile">
                                <span className="posting-nickname">
                                    {comments.writer.nickname} ({comments.writer.gender === "FEMALE" ? '여성' : '남성'}/{comments.writer.age})
                                </span>
                                <span className="posting-date-created">{formatTime(comments.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="posting-wrap">
                        <div key={id} className="posting-comment">
                            {comments.content}
                        </div>
                        <button
                            className="posting-comment-button posting-comment-button-right"
                            onClick={() => handleReplyButtonClick(id)}>
                            답글
                        </button>
                    </div>
                    {
                        comments.children.length > 0
                            ? comments.children.map((child, idx) => {
                                return (
                                    <>
                                        <div className="posting-child-comment-horizontal-wrap">
                                            <BsArrowReturnRight style={{color: "#B3B3B3"}} size="20" className="posting-child-comment-icon"/>
                                            <div className="posting-child-comment-wrap">
                                                <div className="posting-wrap">
                                                    <div className="posting-comment-profile">
                                                        <img className="posting-profile-picture" src={child.writer.image ? child.writer.image : profilePicture} alt="Profile"/>
                                                        <div className="posting-profile">
                                                            <span className="posting-nickname">
                                                                {child.writer.nickname} ({child.writer.gender === "FEMALE" ? '여성' : '남성'}/{child.writer.age})
                                                            </span>
                                                            <span className="posting-date-created">{formatTime(child.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="posting-wrap">
                                                    <div key={id} className="posting-comment">
                                                        {child.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                            : <></>
                    }
                    {replyToCommentId === id && (
                        <div className="posting-reply-wrap">
                            <div className="posting-wrap">
                                <input
                                    className="posting-input"
                                    value={replyContent}
                                    placeholder="답글을 남겨보세요."
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    style={{height: '40px', width: '1120px', padding: '0 20px', borderRadius: '8px'}}
                                />
                                <button
                                    type="submit"
                                    className="posting-comment-button"
                                    disabled={replyContent.trim() === ''}
                                    onClick={() => handleReplySubmit(id)}>
                                    전송
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <div className="posting-input-wrap">
                <input
                    className="posting-input"
                    value={newComment}
                    placeholder="댓글을 남겨보세요."
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{height: '40px', width: '1203px'}}
                />
                <button
                    type="submit"
                    className="posting-comment-button"
                    disabled={newComment.trim() === ''}
                    onClick={handleCommentSubmit}>
                    전송
                </button>
            </div>
        </div>
    );
};