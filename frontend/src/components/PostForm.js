import React, { useState } from 'react';
import firebase from '../firebase';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = firebase.auth().currentUser;
      const postRef = firebase.database().ref('posts').push();

      // Prepare post data
      const postData = {
        title,
        content,
        author: currentUser ? {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid
        } : { displayName: 'Anonymous' },
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      // Upload image if selected
      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(image.name);
        await imageRef.put(image);
        postData.imageUrl = await imageRef.getDownloadURL();
      }

      // Save post data to Firebase database
      await postRef.set(postData);

      // Clear form fields after submission
      setTitle('');
      setContent('');
      setImage(null);

      console.log('Post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
