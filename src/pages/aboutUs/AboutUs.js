import "./AboutUs.css";

const AboutUs = () => {

    return (
        <div className="aboutUs">
            <h1>who are we ?</h1>
            <p>
                We are the Student Registration Department
                We help you to complete the registration procedures for your admission to Imam Al-Kadhim College/Departments of Dhi Qar
                The site aims to facilitate and speed the registration process for students on the registration manager, supervisors and those responsible for registration

                to contact us
            </p>
            <div className="contact">
                <a href="https://www.facebook.com/profile.php?id=100006873790829" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://instagram.com/276c_?utm_medium=copy_link" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://t.me/u_267" target="_blank" rel="noreferrer"><i className="fab fa-telegram"></i></a>
            </div>
            <footer></footer>
        </div>
    )
}

export default AboutUs;