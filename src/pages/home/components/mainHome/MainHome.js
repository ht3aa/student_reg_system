import "./MainHome.css";
import { Link } from "react-router-dom";
import { makeItActive } from "../../../navbar/functions/makeItActive";
import creativeArrow from "../../../../assets/imgs/creative-arrow.png";
import cud from "../../../../assets/imgs/cud.png";
import accessImg from "../../../../assets/imgs/accessImg.png";
import simpleImg from "../../../../assets/imgs/simpleImg.png";
import generateCrudBgImg from "../../../../globalFunctions/generateCrudBgImg";
import { useSelector } from "react-redux";

const MainHome = () => {
    const userData = useSelector(state => state.userDataSlice.userData);

    return (
        <div className="mainHome">
            <img style={{ order: 1 }} className="mainImg left-little" src={ cud } alt="corona19 Main Home"/>
            <div style={{ order: 2 }} className="content right left-little">
                <h2>CRUD functionality</h2>
                <h5>
                    For every department, batch and student there is a crud functionality.  <br />
                    {userData[0] && (userData[0][1] === "manager" || userData[0][1] === "supervisor" || userData[0][1] === "admin") 
                        && <Link to="/data" onClick={(e) => {
                            makeItActive(e.target);
                        }}>                  
                        go to data
                        <img src={creativeArrow} alt="create arrow"/>
                   </Link>}              
                </h5>
            </div>
            <div style={{ order: 3}} className="span2 list">
                {generateCrudBgImg(12).map((corona19bgImg) => {
                    return corona19bgImg;
                })}
                <h3>Responsibility system</h3>
                <div className="cardContainer">
                    <div className="card">
                        <div className="itemNumber" style={{ backgroundColor: "#E00000"}}>
                            <h3>3</h3>
                        </div>
                        <h4>Admin</h4>
                        <h5>Can access student's data for the specific department by adding, deleting, and updating specific data of that student</h5>
                    </div>
                    <div className="card">
                        <div className="itemNumber" style={{ backgroundColor: "#0F62FE"}}>
                            <h3>2</h3>
                        </div>
                        <h4>Supervisor</h4>
                        <h5>Can access batches and student data for the specific department by adding, deleting, and updating their data</h5>
                    </div>
                    <div className="card">
                        <div className="itemNumber" style={{ backgroundColor: "#2BA500"}}>
                            <h3>1</h3>
                        </div>
                        <h4>Manager</h4>
                        <h5>Can access all departments, batches, and student data. He can also add and delete admins and supervisors.</h5>
                    </div>
                </div>
            </div>
            <img className="mainImg order4 right-little" src={ accessImg } alt="vaccine"/>
            <div className="content left order5 right-little">
            <h2>Access system</h2>
                <h5>
                Admins and Supervisors can't minmanipulate any data out of the specifically chosen department that the manager set it. <br />
                    {userData[0] && (userData[0][1] === "manager" || userData[0][1] === "supervisor" || userData[0][1] === "admin") 
                        && <Link to="/data" onClick={(e) => {
                            makeItActive(e.target);
                        }}>                  
                        go to data
                        <img src={creativeArrow} alt="create arrow"/>
                   </Link>}           
                </h5>
            </div>
            <img style={{ order: 6 }} className="mainImg left-little" src={ simpleImg } alt="protection"/>
            <div style={{ order: 7 }} className="content right left-little ">
            <h2>Simple Desing</h2>
                <h5>
                    Simple and clear design to make it easy for in manipulating any data that user can access.  <br />
                    {userData[0] && (userData[0][1] === "manager" || userData[0][1] === "supervisor" || userData[0][1] === "admin") 
                        && <Link to="/data" onClick={(e) => {
                            makeItActive(e.target);
                        }}>                  
                        go to data
                        <img src={creativeArrow} alt="create arrow"/>
                   </Link>}              
                </h5>
            </div>
        </div>
    )
}

export default MainHome;