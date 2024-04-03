import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
import firebase from '../firebase';
import Navbar from './functions/Navbar';
import Footer from './functions/Footer';
import placeholder from '../assets/placeholder.jpg';
import LazyImage from './functions/LazyImage';
import calculateTimeElapsed from './functions/calculateTimeElapsed';

export default function Home({ user }){
    const [posts, setPosts] = useState([]);
    const [highviewpost, setHighViewPost] = useState([]);

    // const signOut = async () => {
    //     try {
    //         await firebase.auth().signOut();
    //         if(!user){
    //             navigate('/login');
    //         }
    //     } catch (error){
    //         console.error(error);
    //     }
    // }
    useEffect(() => {

        const fetchPosts = async () => {
            try {
              const postsRef = firebase.database().ref('posts');
              const snapshot = await postsRef.once('value');
              const postsData = snapshot.val();
              if (postsData) {
                const postsArray = Object.entries(postsData).map(([postId, postData]) => ({ postId, ...postData }));
                setPosts(postsArray);

                let hvp = null;
                let highestviews = -1;

                postsArray.forEach(post => {
                    if (post.views > highestviews) {
                        highestviews = post.views;
                        hvp = post;
                    }
                })
                if(hvp){
                    setHighViewPost(hvp);
                }
              } else {
                console.log('No posts found');
              }
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
        };
      
        fetchPosts();
    }, [user])
    return(
        <>
            <Helmet>
                <title>Home | App</title>
            </Helmet>
            <Navbar user={user} />

            <section className="sec">
                <div className="secinner">
                    <div className="secleft">
                        <NavLink to={`/post/${highviewpost.postId}`}>
                            <LazyImage src={highviewpost.imageUrl ? highviewpost.imageUrl : placeholder} data-real-src={highviewpost.imageUrl} />
                        </NavLink>
                        <div className="overlay">
                            <span>{highviewpost.title}</span>
                            <label>
                                <NavLink to={`/category`}>
                                    {calculateTimeElapsed(highviewpost.timestamp)}
                                </NavLink>
                            </label>
                        </div>
                        <p>Latest </p>
                    <div className="vignette"></div>
                    </div>
                    <div className="secright">
                        <div className="first">
                            <NavLink to={`/post/${highviewpost.postId}`}>
                                <img src={highviewpost.imageUrl ? highviewpost.imageUrl : placeholder} alt='something' />
                            </NavLink>
                            <div className="smallvignette"></div>

                            <div className="overlay">
                                <span>
                                    <NavLink to={`/post/${highviewpost.postId}`}>
                                        {highviewpost.title}
                                    </NavLink>
                                </span>
                                <label>
                                    <NavLink to={`/category`}>
                                        {calculateTimeElapsed(highviewpost.timestamp)}
                                    </NavLink>
                                </label>
                            </div>
                            <p>Most Viewed</p>
                        </div>
                        <div className="second">
                            <img alt='s' loading="lazy" src="https://pbs.twimg.com/media/DiccyBEX0AEptFJ.jpg:large" />
                            <div className="smallvignette"></div>
                            <div className="overlay">
                                <span>Architects of abundance: champions in shaping economic fortunes for a flourishing tomorrow this is also not an astoni can be the also</span>
                                <label>
                                    <NavLink to="/">
                                        Entertainment
                                    </NavLink>
                                </label>
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


            <section className="latestsec">
                <h2>All Categories</h2>
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