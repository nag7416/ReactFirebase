import { Helmet } from "react-helmet";
import Footer from "../components/functions/Footer";
import Navbar from "../components/functions/Navbar";
import { useEffect, useState } from "react";
import firebase from "../firebase";
import 'firebase/database';
import 'firebase/auth';

export default function Contact({ user }){
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const currentUser = firebase.auth().currentUser;
            if(currentUser){
                await firebase.database().ref('contacts').push({
                    name,
                    email: currentUser.email,
                    message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                })
            }
            
            setName('');
            setMessage('');
        } catch (error) {
            console.error('error', error);
        }
    }

    return (
        <>
        <Helmet>
            <title>Contact Us | Blog</title>
        </Helmet>
            <Navbar user={user} />

            <section className="detailsec" style={{flexDirection: 'column', width: '100%'}}>
                <h2 style={{fontSize: '35px', fontWeight: '700', width: '95%', maxWidth: '1300px', margin: '30px 0'}}>Contact Us</h2>
                <div className="detailsecinner">
                    <div className="contactleft">
                        <div className="contactinner">
                            <form onSubmit={handleSubmit}>
                                <div className="namebox">
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" required />
                                </div>
                                <div className="messagebox">
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message" required></textarea>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="contactright">
                        <div className="contactrightinner">
                            <h2>...or reach out<br />directly</h2>
                            <div>
                                <img alt='s' src="https://assets-global.website-files.com/65a67591306205532b2fe335/65b3ad8ee9777f7325092bdf_phone-call.png" />
                                <a href="tel:1234567890">1234567890</a>
                            </div>
                            <div>
                                <img alt="s" src="https://assets-global.website-files.com/65a67591306205532b2fe335/65b3ad8ee9777f7325092be1_black-back-closed-envelope-shape.png" />
                                <a href="mailto:dummy@gmail.com">dummy@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {showtoast && <div className="successmessage">{toastmessage}</div>}
                 */}
            </section>
            <Footer />
        </>
    )
}