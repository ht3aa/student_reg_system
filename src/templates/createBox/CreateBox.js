import "./CreateBox.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateBox = ({heading, buttonText, action, title}) => {
    
    const isAdmin = useSelector(state => state.setRole.isAdmin);
    const isSuperviser = useSelector(state => state.setRole.isSuperviser);
    const isManager = useSelector(state => state.setRole.isManager);


    return (
        <div className="createBox">
            {(isManager || isSuperviser || isAdmin) && <h2>{ heading }</h2>}
            {(isManager || isSuperviser || isAdmin) && <Link to={`/data/${action}`}><button><h5>{ buttonText }</h5></button></Link>}
            <div className="title"><p>{ title }</p></div>
        </div>
    )
}


export default CreateBox;