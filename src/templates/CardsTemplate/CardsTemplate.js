import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CardsTemplate.css";
import { useEffect, useState } from "react";

const CardsTemplate = ({ data, uid, action = [], related_department = "", related_batch = "" }) => {

    const isAdmin = useSelector(state => state.setRole.isAdmin);
    const isSuperviser = useSelector(state => state.setRole.isSuperviser);
    const isManager = useSelector(state => state.setRole.isManager);
    const [relatedUid, setRelatedUid] = useState("");

    useEffect(() => {
        if(related_department) {
            setRelatedUid(related_department);
        } else if (related_batch) {
            setRelatedUid(related_batch);
        }
    }, [])

    return (
        <div className="cardData">
            <Link className="fakeCardData" to={`/data/${action}/${uid}`}><div></div></Link>
            {action !== "student" && <div className="sideColor" style={{backgroundColor: data.color}}></div>}
            {action === "student" && <img className="sideImg" src={data.personal_img_url} alt="student img" />}
            {(isManager || isSuperviser || isAdmin) && <Link className="icon" to={`/data/delete/${action}/${uid}`}><i className="fa-solid fa-trash-can delete"></i></Link>}
            {(isManager || isSuperviser || isAdmin) && <Link style={{right: "30px"}} className="icon" to={`/data/update/${action}/${uid}/${relatedUid}`}><i className="fa-solid fa-pen edit"></i></Link>}
            {action !== "student" && <h4>{data.name}</h4>}
            {action === "student" && 
                <div>
                    <h5>Name: {data.name}</h5>
                    <h5>birth date: {data.birth_date}</h5>
                    <h5>resident: {data.resident}</h5>
                </div>
            }    
        </div>
    )
}


export default CardsTemplate;