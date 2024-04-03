import { Helmet } from "react-helmet";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

export default function Login(){
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            navigate('/');
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await firebase.auth().signInWithPopup(provider);
        } catch (error){
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
        <Helmet>
            <title>Login | App</title>
        </Helmet>
        <Navbar />

        <section className='sec'>
        <div className='secinner' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className='loginbox'>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              
              <button onClick={signInWithGoogle}>Login with Google</button>
            </form>
          </div>
        </div>
      </section>
        </>
    )
}