import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dummy } from '../PostUserDummy';
import postUser from '../assets/post-user.png';
import matching from '../assets/matching-application.png';
import chatting from '../assets/chatting.png';
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
        <div className="page">

            <div className="banner-container">
                <img className="banner" src={postUser} alt="Posting img" />
            </div>
            <br />

            <div className="wrap">
                <div className="author-profile">
                    <img className="profile-picture" src={profilePicture} alt="Profile" />
                    <div className="profile">
                        <span className="nickname">{author.nickname} ({author.authorGender}/{author.age})</span>
                        <span className="date-created">{dateCreated}</span>
                    </div>
                </div>
            </div>

            <div className="home-post">

                <div className="home-post-title">{title}</div>
                <br />

                <div className="home-post-content">
                    <div className="wrap">
                        <div className="hashtag-wrap">카테고리  </div>
                        <span className="js-content"> {category}</span>

                        <div className="hashtag-wrap">일자</div>
                        <span className="js-content"> {date}</span>

                        <div className="hashtag-wrap">모집</div>
                        <span className="js-content"> {headcount}</span>

                        <div className="hashtag-wrap">성별</div>
                        <span className="js-content"> {gender}</span>
                    </div>
                    <div className="content"> {content} </div>
                </div>

                <div className="wrap">
                    {hashtag.map((tag, tagIndex) => (
                        <div key={tagIndex} className="hashtag">#{tag}</div>
                    ))}
                </div>

                <div className="wrap">
                    {/* {images} */}
                </div>

                <div className="button-wrap">
                    <Link to="/chatting">
                        <img className="bottom-button" src={chatting}></img>
                    </Link>
                    <Link to="/matching">
                        <img className="bottom-button" src={matching}></img>
                    </Link>
                </div>

            </div>
            <br />

            {comment.map((comment, id) => (

                <div className="comment-post">
                    <div className="wrap">
                        <div className="comment-profile">
                            <img className="profile-picture" src={profilePicture} alt="Profile" />
                            <div className="profile">
                                <span className="nickname">{comment.memberNickname} ({comment.authorGender}/{comment.age})</span>
                                <span className="date-created">{comment.commentDateCreated}</span>
                            </div>
                        </div>
                    </div>
                    <div className="wrap">
                        <div key={id} className="comment">
                            {comment.contents}
                        </div>
                        <button
                            className="comment-button comment-button-right">
                            답글
                        </button>
                    </div>
                </div>
            ))
            }

            <div className="input-wrap">
                <input
                    value={newComment}
                    placeholder="댓글을 남겨보세요."
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ height: '40px', width: '900px' }} />
                <button
                    type="submit"
                    className="comment-button"
                    disabled={newComment.trim() === ''}
                    onClick={handleCommentSubmit}>
                    전송
                </button>
            </div>
        </div>
    );
};

export default PostUser;


// import React, { useState, useEffect } from 'react';

// const PostList = ({ posts }) => {
//     //     const [posts, setPosts] = useState([]);

//     //     useEffect(() => {
//     //         // axios.get("http://localhost:8000/posts").then(response => setPosts(response.data));
//     //     }, []);
//     return (
//         <div>
//         </div>
//     );
// };

// export default PostList;