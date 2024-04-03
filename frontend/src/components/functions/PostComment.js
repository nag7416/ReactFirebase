import { useState } from "react"
import firebase from "../../firebase";
import { NavLink } from "react-router-dom";
import placeholder from '../../assets/placeholder.jpg';

export default function PostComment({ postId, user }){
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = firebase.auth().currentUser;
            if(!currentUser){
                console.log('user not logged in');
                return;
            }
            const commentRef = firebase.database().ref(`posts/${postId}/comments`).push();
            await commentRef.set({
                content,
                author: {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid
                },
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            setContent('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }
    return (
        <>
            <div className="usercomment">
                <div className="usercomimg">
                    <NavLink to='/'>
                        <img src={user && user.photoURL ? user.photoURL : placeholder } />
                    </NavLink>
                </div>
                <div className="usercomdetail">
                    <form onSubmit={handleSubmit}>
                        <input value={content} type="text" placeholder="Post a comment" onChange={(e) => setContent(e.target.value)} />
                    </form>
                </div>
            </div>
        </>
    )
}