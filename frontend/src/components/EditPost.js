import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import { Helmet } from 'react-helmet';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = firebase.database().ref(`posts/${postId}`);
        const snapshot = await postRef.once('value');
        const postData = snapshot.val();
        if (postData) {
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
        } else {
          console.log('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postRef = firebase.database().ref(`posts/${postId}`);
      await postRef.update({
        title,
        content,
        editedAt: firebase.database.ServerValue.TIMESTAMP
      });
      console.log('Post updated successfully!');
      navigate(`/post/${postId}`); // Redirect to post details page after editing
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Helmet>
            <title>Edit - {post.title}</title>
        </Helmet>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
