import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setNotification } from "../../redux/features/toggleNotification";
import "./Form.css"
import {checkIfSamePassword, checkTheLengthOfPassword} from "./functions/validation";

const Form = ({ formDetails }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [getData, setGetData] = useState(null);
    let { uid, related_department } = useParams();
    if(uid === undefined) uid = '';
    if(related_department === undefined) related_department = '';

    const {
        title = "", 
        description = "",
        formAction,
        formMethod,
        normalInputs = [],
        passwordInputs = [],
        selectInputs = [],
        fileInput = "",
        buttonText,
        buttonColor,
    } = formDetails;

    useEffect(() => {
        async function getData() {
            const { data } = await axios.get(`/getData/${uid}`);
            setGetData(data);
        }
        if(formMethod === "put" || formMethod === "delete"){
            getData();
        }
    }, []);


    function close(e) {
        e.preventDefault();
        navigate(-1);
    }

    function responseToResult(result) {
        if(result.data.includes("**")) {
            dispatch(setNotification(["error", result.data]));
            document.querySelector("body").style.pointerEvents = "auto";
        } else {
            dispatch(setNotification(["success", result.data]));
            setTimeout(() => {
                if(formAction === "/login" || formAction === "/logout" || formAction === "/register") {
                    navigate('/');
                    setTimeout(() => {
                        window.location.reload();
                    }, 50)
                } else {
                    navigate(-1);
                }
                document.querySelector("body").style.pointerEvents = "auto";
            }, 3000);
        }
    }
    async function requsetsFunc(inputData) {
        dispatch(setNotification(["loading", null]));
        let result;
        document.querySelector("body").style.pointerEvents = "none";
        if(formMethod === "post") {
            result = await axios.post(formAction + `/${uid}` , {
                data: inputData
            });
        } else if(formMethod === "put") {
            result = await axios.put(formAction + `/${uid}/${related_department}`, {
                updateData: inputData,
            });                      
        } else if(formMethod === "delete") {
            result = await axios.delete(formAction + `/${uid}`);   
            
        } 

        responseToResult(result);
    }


    function checkValidationInRegisterForm(inputData) {

        if(!checkIfSamePassword(inputData)) {
            dispatch(setNotification(["error", "incorrect password **"]))
        } else if(!checkTheLengthOfPassword(inputData)) {
            dispatch(setNotification(["error", "lenght of the password must be 6 characters and above **"]))
        } else {
            requsetsFunc(inputData);
        }

    }
    return (
        <div className="shadow">
            <div className="form-bg">
                <form className="formTemplate" encType="multipart/form-data" onSubmit={async (e) => {
                    e.preventDefault();
                    let inputData = [];

                    for(let i = 0; i < e.target.elements.length - 2; i++) {
                        if(e.target.elements[i].value === '') {
                            dispatch(setNotification(["error", "some feild are empty **"]));
                            return;
                        } else {
                            inputData.push(e.target.elements[i].value);
                        }
                    }
                    if(formAction === "/register") {
                        checkValidationInRegisterForm(inputData);
                    } else {
                        requsetsFunc(inputData);
                    }

                }}>
                <i onClick={close} className="fa fa-times" id="close"></i>
                { !getData && <h3>{ title }</h3>}     
                { getData && <h3>{ title + getData.name }</h3>}          
                <p>{ description }</p>
                <div className="container">

                    {fileInput && <div className="inputContainer fileInput">
                        <h5>hello file</h5>
                        <p>Only .pdf flies aloud</p>
                        <input type="file" id="upload" hidden/>
                        <label htmlFor="upload"><p>Choose file</p></label>
                        <ul>
                            <li>
                                <p>hello asfdad</p>
                                <i className="fas fa-times"></i>
                            </li>
                        </ul>
                    </div>}

                    {normalInputs.map((input, index) => {
                        return (
                            <div className="inputContainer" key={ index }>
                                <label htmlFor={`normal${index}`}><p>{ input }</p></label>
                                { !getData && <input id={`normal${index}`} type="text" placeholder={`Enter ${input}`} name={input}/>}  
                                { getData && <input defaultValue={getData.name} id={`normal${index}`} type="text" placeholder={`Enter ${input}`} name={input}/>} 
                            </div>              
                        )
                    })}
                    {passwordInputs.map((input, index) => {
                        return (
                            <div className="inputContainer" key={ index }>
                                <label htmlFor={`password${index}`}><p>{ input }</p></label>
                                {<input id={`password${index}`} type="password" placeholder={`Enter ${input}`} name={input}/>}   
                            </div>              
                        )
                    })}
                    {selectInputs.map((input, index) => {
                        return (
                            <div className="inputContainer selectInput" key={ index }>
                                <label id={index} htmlFor={index}><p>{input[1]}</p></label>
                                <select name={input[0]} id={index}>
                                    {input[0].map((el) => {
                                        return <option value={el._id} key={el._id}>{el.name}</option>
                                    })}
                                </select>
                            </div>  
                        )
                    })}

                    </div>
                    <div className="buttonGroup">
                        <button onClick={(e) => {
                            close(e);
                        }} >Cancel</button>
                        <button style={{ backgroundColor: buttonColor }}>{ buttonText }</button>
                    </div>

                </form>
            </div>
        </div>
    )
}


export default Form;