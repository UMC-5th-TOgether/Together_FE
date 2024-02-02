import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummy } from '../PostUserDummy';
import postUser from '../assets/post-user.png';
import matching from '../assets/matching-application-button.png';
import chatting from '../assets/chatting-button.png';
import profilePicture from '../assets/profile.png';
import '../style/PostUser.css';
import '../style/Posting.css';

const PostUser = () => {
    const { id } = useParams();
    const postId = parseInt(id);

    const filteredPosts = dummy.results.filter(post => post.id === postId);

    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState('');

    if (filteredPosts.length === 0) {
        return <div>No matching post found.</div>;
    }

    const { title, author, dateCreated, category, date, headcount, gender, hashtag, content, comment } = filteredPosts[0];

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            setComments(prevComments => [...prevComments, newComment]);
            setNewComment('');
        }
    };

    return (
        <div className="posting-page">

            <div className="banner-container">
                <img className="banner" src={postUser} alt="Posting img" />
            </div>
            <br />

            <div className="posting-wrap">
                <div className="posting-author-profile">
                    <img className="posting-profile-picture" src={profilePicture} alt="Profile" />
                    <div className="posting-profile">
                        <span className="posting-nickname">{author.nickname} ({author.authorGender}/{author.age})</span>
                        <span className="posting-date-created">{dateCreated}</span>
                    </div>
                </div>
            </div>

            <div className="posting-post">

                <div className="posting-post-title">{title}</div>
                <br />

                <div className="posting-post-content">
                    <div className="posting-wrap">
                        <div className="posting-hashtag-wrap">카테고리  </div>
                        <span className="posting-li"> {category}</span>

                        <div className="posting-hashtag-wrap">일자</div>
                        <span className="posting-li"> {date}</span>

                        <div className="posting-hashtag-wrap">모집</div>
                        <span className="posting-li"> {headcount}</span>

                        <div className="posting-hashtag-wrap">성별</div>
                        <span className="posting-li"> {gender}</span>
                    </div>
                    <div className="posting-content"> {content} </div>
                </div>

                <div className="posting-wrap">
                    {hashtag.map((tag, tagIndex) => (
                        <div key={tagIndex} className="posting-hashtag">#{tag}</div>
                    ))}
                </div>

                <div className="posting-wrap">
                    {/* {images} */}
                </div>

                <div className="posting-button-wrap">
                    <Link to="/chatting">
                        <img className="posting-bottom-button" src={chatting}></img>
                    </Link>
                    <Link to="/matching">
                        <img className="posting-bottom-button" src={matching}></img>
                    </Link>
                </div>

            </div>
            <br />

            {comment.map((comment, id) => (

                <div className="posting-comment-post">
                    <div className="posting-wrap">
                        <div className="posting-comment-profile">
                            <img className="posting-profile-picture" src={profilePicture} alt="Profile" />
                            <div className="posting-profile">
                                <span className="posting-nickname">{comment.memberNickname} ({comment.authorGender}/{comment.age})</span>
                                <span className="posting-date-created">{comment.commentDateCreated}</span>
                            </div>
                        </div>
                    </div>
                    <div className="posting-wrap">
                        <div key={id} className="posting-comment">
                            {comment.contents}
                        </div>
                        <button
                            className="posting-comment-button posting-comment-button-right">
                            답글
                        </button>
                    </div>
                </div>
            ))
            }

            <div className="posting-input-wrap">
                <input
                    className="posting-input"
                    value={newComment}
                    placeholder="댓글을 남겨보세요."
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{
                        height: '40px', width: '1203px'
                    }} />
                <button
                    type="submit"
                    className="posting-comment-button"
                    disabled={newComment.trim() === ''
                    }
                    onClick={handleCommentSubmit}>
                    전송
                </button>
            </div>
        </div>
    );
};

export default PostUser;
