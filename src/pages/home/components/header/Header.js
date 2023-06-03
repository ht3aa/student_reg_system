import "./Header.css";
import { Link } from "react-router-dom";
import { makeItActive } from "../../../navbar/functions/makeItActive";
import crudImg from "../../../../assets/imgs/CrudImg.png";
import creativeArrow from "../../../../assets/imgs/creative-arrow.png";
import { useSelector } from "react-redux";

const Header = () => {
    const userData = useSelector(state => state.userDataSlice.userData);
    return (
        <section className="homeHero">
            <main className="mainContent">
                <h1>easy and safe way to sort and store new student data</h1>
                <h4>
                    Here you can manage your student's data in an easy, fast, and simple way. <br />                     
                    {userData[0] && (userData[0][1] === "manager" || userData[0][1] === "supervisor" || userData[0][1] === "admin") 
                        && <Link to="/data" onClick={(e) => {
                            makeItActive(e.target);
                        }}>                  
                        go to data
                        <img src={creativeArrow} alt="create arrow"/>
                   </Link>}
  
                </h4>
            </main>
            <div className="crud">
                <img src={ crudImg } alt="crud" />
            </div>
        </section>
    )
}

export default Header;