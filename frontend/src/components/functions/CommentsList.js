import { useEffect, useState } from "react"
import firebase from "../../firebase";
import { NavLink } from "react-router-dom";
import calculateTimeElapsed from "./calculateTimeElapsed";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";

export default function CommentsList({ postId, user }){
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const commentsRef = firebase.database().ref(`posts/${postId}/comments`);
            const snapshot = await commentsRef.once('value');
            const commentsData = snapshot.val();
            if (commentsData) {
                const commentsArray = Object.entries(commentsData).map(([commentId, comment]) => ({
                    commentId,
                    ...comment
                })).sort((a, b) => b.timestamp - a.timestamp);
                setComments(commentsArray);
              } else {

              }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    useEffect(() => {
        
        fetchComments();

        const commentsRef = firebase.database().ref(`posts/${postId}/comments`);
        commentsRef.on('child_added', () => {
            fetchComments();
        })

    }, [postId])

    const deleteComment = (e) => {
        const commentId = e.currentTarget.getAttribute('commentid');
        try {
            const commentRef = firebase.database().ref(`posts/${postId}/comments/${commentId}`);
            commentRef.remove();
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
    return (
        <>
            {comments && comments.length > 0 ? (
                <>
                {comments.map((comment, index) => (
                    <div className="publiccomment" key={index} commentid={comment.commentId}>
                        <div className="publiccomimg">
                            <NavLink to='/'>
                                <img src={comment.author.photoURL} />
                            </NavLink>
                        </div>
                        <div className="publiccomdetail">
                            <div className="top">
                                <div>
                                    <label>
                                        <NavLink to='/'>
                                            @{comment.author.displayName}
                                        </NavLink>
                                    </label>
                                    <span>{calculateTimeElapsed(comment.timestamp)}</span>
                                </div>
                                {user.uid == comment.author.uid ? (
                                    <button commentid={comment.commentId} onClick={deleteComment}>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope tp-yt-iron-icon"><g className="style-scope tp-yt-iron-icon"><path d="M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z" className="style-scope tp-yt-iron-icon"></path></g></svg>
                                    </button>
                                ):(
                                    <></>
                                )}                            
                            </div>
                            <div className="bottom">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </>
            ):(
                <label style={{width: '100%', textAlign: 'center'}}>No comments for this post</label>
            )}
            
        </>
    )
}