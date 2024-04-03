import { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import { NavLink, useLocation, useParams } from "react-router-dom";
import firebase from "../firebase";
import Navbar from "./functions/Navbar";
import LazyImage from "./functions/LazyImage";
import placeholder from '../../src/assets/placeholder.jpg';
import calculateTimeElapsed from "./functions/calculateTimeElapsed";
import PostComment from "./functions/PostComment";
import CommentsList from "./functions/CommentsList";
import Footer from "./functions/Footer";

export default function Detail({user}){
    const [post, setPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [userViewed, setUserViewed] = useState(false);
    const [content, setContent] = useState('');
    const { postId } = useParams();
    const currentUser = firebase.auth().currentUser;
    const [userliked, setUserLiked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = firebase.database().ref(`posts/${postId}`);
                const snapshot = await postRef.once('value');
                const postData = snapshot.val();
                
                if(postData){
                    setPost(postData);
                    if(currentUser){
                        const userViewRef = firebase.database().ref(`postViews/${postId}/${currentUser.uid}`);
                        const userViewSnapshot = await userViewRef.once('value');
                        if(!userViewSnapshot.exists()){
                            setUserViewed(true);
                            await postRef.child('views').transaction((views) => (views || 0) + 1);
                            await userViewRef.set(true);
                        }

                        const likesRef = firebase.database().ref(`likes/${postId}/${currentUser.uid}`);
                        const likesSnapshot = await likesRef.once('value');
                        console.log('something');
                        setUserLiked(likesSnapshot.exists());
                    }
                    

                    const allPostsRef = firebase.database().ref(`posts`);
                    const allPostsSnapshot = await allPostsRef.once('value');
                    const allPostsData = allPostsSnapshot.val();

                    if(allPostsData){
                        const allPostsArray = Object.entries(allPostsData).map(([postId, postData]) => ({ postId, ...postData }));
                        const filteredPosts = allPostsArray.filter(post => post.postId !== postId);
                        setPosts(filteredPosts);
                    } else {
                        console.log('No posts found');
                    }
                    
                } else {
                    console.log('Post not found');
                }
            } catch (error){
                console.error('Error fetching post:', error);
            }
        }
        fetchPost();

        
    }, [postId])

    const getURL = (e) => {
        const elem = e.currentTarget.parentElement.querySelector('#urlLink');
        const inputValue = elem.value;
        console.log(userliked ? userliked:userliked);

        if(inputValue){
            elem.select();
            navigator.clipboard.writeText(inputValue);
            
        }
        e.currentTarget.innerHTML = 'Copied';
            e.currentTarget.innerHTML = 'Copy';
    }
    const openGetURLBox = () => {
        const popupbox = document.querySelector('.linkpopup');
        const iframe = document.querySelector('#iframe');
        popupbox.classList.add('active');
        setTimeout(() => {
            iframe.src = `http://localhost:3000/post/${postId}`;
        }, 1000);
    }
    const closeGetURLBox = () => {
        const popupbox = document.querySelector('.linkpopup');
        const iframe = document.querySelector('#iframe');
        popupbox.classList.remove('active');
        iframe.src = '';
    }
    return (
        <>
            <Helmet>
                <title>{post.title}</title>
            </Helmet>

            <Navbar user={user} />
            
            
            <div className="linkpopup">
                <div className="popupbox">
                    <div className="top">
                        <label>Embeded Link</label>
                        <button onClick={closeGetURLBox}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path></svg>
                        </button>
                    </div>
                    <div className="middle">
                        <input id="urlLink" value={`http://localhost:3000/post/${postId}`} disabled />
                        <button onClick={getURL}>Copy</button>
                    </div>
                    <div className="bottom">
                        <iframe id="iframe" frameBorder="0"></iframe>
                        <NavLink to={`http://localhost:3000/post/${postId}`} target="_blank">
                            <button>Open Url</button>
                        </NavLink>
                    </div>
                </div>
            </div>

            <section className="detailsec">
                <div className="detailsecinner" style={{marginBottom: '10px'}}>
                    <div className="detailleft">
                        <div className="datediv">
                            <label>{post.views ? post.views : "0"} views</label>&nbsp;
                            <label style={{marginLeft: '10px'}}>Posted: {calculateTimeElapsed(post.timestamp)}&nbsp;&nbsp;{post.editedAt ? `Last Edited: ${calculateTimeElapsed(post.editedAt)}`:""}</label>
                            <label>
                                <NavLink to={`/`}>{post.category}</NavLink>
                            </label>
                        </div>
                        <div className="titlediv">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="imagediv">
                            <img src={post.imageUrl ? post.imageUrl : placeholder} alt="s"></img>
                        </div>
                        <div className="sharediv">
                            <button onClick={openGetURLBox} postid={postId}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>
                                Share
                            </button>
                        </div>
                        <div className="descriptiondiv" dangerouslySetInnerHTML={{ __html: post.content}}>
                            
                        </div>
                        <div className="comments">
                            <PostComment postId={postId} user={user} />

                            <div className="publiccomments">
                                <CommentsList postId={postId} user={user} />
                            </div>
                        </div>

                        
                    </div>
                    <div className="detailright">
                        <div className="detailrightinner">
                            <h2>Latest</h2>
                            <div className="lateststories">
                                {posts && posts.length > 0 ? (
                                    <>
                                        {posts.map((post, index) => (
                                            <div className="story" key={index}>
                                                <h3>{post.title}</h3>
                                                <div>
                                                    <label>{calculateTimeElapsed(post.timestamp)}</label>
                                                    <label>
                                                        <NavLink to="/">
                                                            News
                                                        </NavLink>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ):(
                                    <>
                                    <label>No Posts</label>
                                    </>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="latestsec">
                <h2>Latest</h2>
                <div className="inner">
                    {posts.length <= 4 ? (
                        <>
                            {posts.map((post, index) => (
                                <div className="post" key={index}>
                                    <div className="postimg">
                                        <NavLink to={`/post/${post.postId}`}>
                                            <LazyImage src={placeholder} data-real-src={post.imageUrl} />
                                        </NavLink>
                                    </div>
                                    <div className="postdetails">
                                        <h4>
                                            <NavLink to={`/post/${post.postId}`}>
                                                {post.title}
                                            </NavLink>
                                        </h4>
                                        <label>{post.content}</label>
                                        <div>
                                            <p>{calculateTimeElapsed(post.timestamp)}</p>
                                            <p><NavLink to="/">{post.views ? `${post.views} views`: ""}</NavLink></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='post'></div>
                            <div className='post'></div>
                            <div className='post'></div>
                            <div className='post'></div>
                        </>
                    ):(
                        <>
                            {posts.map((post, index) => (
                                <div className="post" key={index}>
                                    <div className="postimg">
                                        <NavLink to={`/post/${post.postId}`}>
                                            <LazyImage src={placeholder} data-real-src={post.imageUrl} />
                                        </NavLink>
                                    </div>
                                    <div className="postdetails">
                                        <h4>
                                            <NavLink to={`/post/${post.postId}`}>
                                                {post.title}
                                            </NavLink>
                                        </h4>
                                        <label>{post.content}</label>
                                        <div>
                                            <p>{calculateTimeElapsed(post.timestamp)}</p>
                                            <p><NavLink to="/">{post.views ? `${post.views} views`: ""}</NavLink></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </section>


            <Footer />
        </>
    )
}