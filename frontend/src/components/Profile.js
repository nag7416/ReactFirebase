import { Helmet } from "react-helmet";
import Navbar from "./functions/Navbar";
import { useEffect } from "react";
import calculateTimeElapsed from "./functions/calculateTimeElapsed";
import Footer from "./functions/Footer";

export default function Profile({ user }){

    useEffect(() => {
                
    }, [user])
    return (
        <>
        <Helmet>
            <title>{user && user.displayName}</title>
        </Helmet>
            <Navbar user={user} />

            <section className="latestsec">
                <h2>Profile</h2>
                <div className="lateinner">
                    <div className="lateleft">
                        <div className="profileinner">
                            <form>
                                <div className="profilerow">
                                    <div className="box username">
                                        <label>Username</label>
                                        <input type="text" placeholder="" value={user && user.displayName ? user.displayName : ''} disabled />
                                    </div>
                                    <div className="box username">
                                        <label>Email</label>
                                        <input type="email" placeholder="" value={user && user.email ? user.displayName : ''} disabled />
                                    </div>
                                </div>
                                <div className="profilerow">
                                    <div className="box phone">
                                        <label>Phone</label>
                                        <input type="text" placeholder="" value={user && user.email ? user.email : ''} disabled />
                                    </div>
                                    <div className="box lastlogin">
                                        <label>Last Login</label>
                                        <input type="text" placeholder="" value={calculateTimeElapsed(user && user.metadata.lastLoginAt ? user.metadata.lastLoginAt : '')} disabled />
                                    </div>
                                </div>
                                <div className="profilerow">
                                    <div className="box uid">
                                        <label>Username UID</label>
                                        <input type="text" placeholder="" value={user && user.uid ? user.uid : ''} disabled />
                                    </div>
                                </div>
                                <div className="profilerow" style={{marginTop: '40px'}}>
                                    <div className="box uid">
                                        <button type="submit">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lateright">
                        <div className="laterightinner">
                            <div className="imgbox">
                                <img src={user && user.photoURL} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    )
}