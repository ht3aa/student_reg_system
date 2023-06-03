import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentInfo.css";

const StudentInfo = () => {
    const navigate = useNavigate();
    const { uid } = useParams()
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
       async function getData() {
            const { data } = await axios.get(`/student/${uid}`);
            setStudentData(data);
       }
       getData();
    }, [])

    function close() {
        navigate(-1);
    }
    return (
        <div className="shadow">
            {studentData &&             
            <div className="student-bg">
                <i onClick={close} className="fa fa-times" id="close"></i>
                <div className="studentImgContainer">
                    <a href={studentData.personal_img_url} target="_blank" rel="noreferrer"><img src={studentData.personal_img_url} alt="student personal img" /></a>
                    <a href={studentData.document_img_url} target="_blank" rel="noreferrer">{<img src={studentData.document_img_url} alt="student document img" />}</a>
                </div>
                <div className="studentInfoCotainer">
                    <h4>Name: {studentData.name}</h4>
                    <h4>Birth date: {studentData.birth_date}</h4>
                    <h4>Resident: {studentData.resident}</h4>
                    <h4>Average: {studentData.average}</h4>
                </div>
                    <div className="buttonGroup">
                        <button onClick={(e) => {
                            close(e);
                        }} ><h5>Cancel</h5></button>
                    </div>
            </div>}
        </div>
    )
}


export default StudentInfo;