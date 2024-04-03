import { Helmet } from "react-helmet";
import Footer from "../components/functions/Footer";
import Navbar from "../components/functions/Navbar";

export default function About({ user }){
    return (
        <>
        <Helmet>
            <title>About us | Blog</title>
        </Helmet>
            <Navbar user={user} />
            <section className="latestsec" style={{marginBottom: '100px'}}>
                <h2 style={{fontSize: '35px', fontWeight: '700'}}>About us</h2>
                <div className="anotherinner">
                    <div className="one">
                        <div className="details">
                            <h3>Our Team</h3>
                        </div>
                    </div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                </div>
            </section>
            <Footer />
        </>
    )
}