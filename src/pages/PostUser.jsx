import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { dummy } from '../PostUserDummy';
import postUser from '../assets/post-user.png';
import matching from '../assets/matching-application-button.png';
import chatting from '../assets/chatting-button.png';
import profilePicture from '../assets/profile.png';
import '../style/PostUser.css';
import '../style/Posting.css';

export default function PostUser() {
    const token = localStorage.getItem('token');

    const location = useLocation();
    const postData = location.state.postData;

    // const [postData, setPostData] = useState(null);

    const { id } = useParams();
    const postId = parseInt(id);

    // const filteredPosts = dummy.results.filter(post => post.id === postId);

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


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`https://hyeonjo.shop/api/post/comment/id?id=${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setComments(res.data);
                console.log(comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId, token]);


    // const { author, dateCreated, comment } = filteredPosts[0];

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            setComments(prevComments => [...prevComments, newComment]);
            setNewComment('');
        }
    };

    const handleReplyButtonClick = (commentId) => {
        setReplyToCommentId(commentId === replyToCommentId ? null : commentId);
        setReplyContent('');
    };

    const handleReplySubmit = () => {
        if (replyContent.trim() !== '') {
            console.log(`Reply to comment ${replyToCommentId}: ${replyContent}`);
            setReplyToCommentId(null);
            setReplyContent('');
        }
    };


    return (
        <div className="posting-page">
            <div className="banner-image-container">
                <img className="banner-image" src={postUser} alt="Posting img" />
            </div>
            <br />
            <div className="posting-wrap">
                <div className="posting-author-profile">
                    <img className="posting-profile-picture" src={profilePicture} alt="Profile" />
                    <div className="posting-profile">
                        {/* <span className="posting-nickname">{author.nickname} ({author.authorGender}/{author.age})</span> */}
                        {/* <span className="posting-date-created">{dateCreated}</span> */}
                    </div>
                </div>
            </div>
            <div className="posting-post">
                {postData && (
                    <div>
                        <div className="posting-post-title">{postData.title}</div>
                        <br />
                        <div className="posting-post-content">
                            <div className="posting-wrap">
                                <div className="posting-hashtag-wrap">카테고리  </div>
                                <span className="posting-li"> {postData.category}</span>
                                <div className="posting-hashtag-wrap">일자</div>
                                <span className="posting-li"> {postData.date}</span>
                                <div className="posting-hashtag-wrap">모집</div>
                                <span className="posting-li"> {postData.personNum}명</span>
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
                        <div className="posting-wrap">
                            {/* {images} */}
                        </div>
                        <div className="posting-button-wrap">
                            <Link to="/chatting">
                                <img className="posting-bottom-button" src={chatting} alt="chatting" />
                            </Link>
                            <Link to="/matching">
                                <img className="posting-bottom-button" src={matching} alt="matching" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <br />
            {comments.map((comments, id) => (
                <div className="posting-comment-post" key={id}>
                    <div className="posting-wrap">
                        <div className="posting-comment-profile">
                            <img className="posting-profile-picture" src={profilePicture} alt="Profile" />
                            <div className="posting-profile">
                                <span className="posting-nickname">{comments.writer.nickname} ({comments.writer.gender}/{comments.writer.age})</span>
                                {/* <span className="posting-date-created">{comments.commentDateCreated}</span> */}
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
                    {replyToCommentId === id && (
                        <div className="posting-reply-wrap">
                            <div className="posting-wrap">
                                <input
                                    className="posting-input"
                                    value={replyContent}
                                    placeholder="답글을 남겨보세요."
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    style={{ height: '40px', width: '1120px', padding: '0 20px' }}
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
                    style={{ height: '40px', width: '1203px' }}
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



