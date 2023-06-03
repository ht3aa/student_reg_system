import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setNotification } from "../../redux/features/toggleNotification";
import "./Form.css"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const StudentForm = ({ formDetails }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [getData, setGetData] = useState(null);
    const [personalImg, setPersonalImg] = useState(null);
    const [documentImg, setDocumentImg] = useState(null);
    const [randomNames, setrandomNames] = useState('');
    const getDataInputKeys = ["name", "birth_date", "resident", "average"];
    const getDataImgsKeys = ["personal_img_url","document_img_url"]
    const storage = getStorage();


    let { uid, related_batch } = useParams();
    if(uid === undefined) uid = '';
    if(related_batch === undefined) related_batch = '';


    function generateRandomNames() {
    const allCharchters = "1234567890qwertyuyioplkjhgfdsazxcvbnmMNBVCXZASDFGHJKLPOIUYTREWQ";

        let name = "";
        for(let i = 0; i < 25; i++) {
            name += allCharchters[Math.floor(Math.random() * allCharchters.length)];
        }
        return name;
    }

    const {
        title = "", 
        description = "",
        formAction,
        formMethod,
        normalInputs = [],
        buttonText,
        buttonColor,
    } = formDetails;

    useEffect(() => {
        if(formMethod !== "delete") {
            setrandomNames(`use this name ( ${generateRandomNames()} ) for first file, and this name ( ${generateRandomNames()} ) for the second file`);
        }
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

    async function responseToResult(result, updatedImg = "/") {
        if(result.data.includes("**")) {
            dispatch(setNotification(["error", result.data]));
            document.querySelector("body").style.pointerEvents = "auto";
        } else {

            try {
                if(updatedImg.includes("personalImg") && formMethod === "put") {
                    const personalRef = ref(storage, getData[getDataImgsKeys[0]]);
                    await deleteObject(personalRef);
                }
            } catch(err) {
                console.log(err);
            }
            try {
                if(updatedImg.includes("documentImg") && formMethod === "put") {
                    const documentRef = ref(storage, getData[getDataImgsKeys[1]]);
                    await deleteObject(documentRef);
                }
            } catch(err) {
                console.log(err);
            }

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
    
    async function requsetsFunc(inputData, updatedImg = "/") {
        dispatch(setNotification(["loading", null]));
        let result;
        document.querySelector("body").style.pointerEvents = "none";
        
        if(formMethod === "post") {
            result = await axios.post(formAction + `/${uid}` , {
                data: inputData
            });
        } else if(formMethod === "put") {
            result = await axios.put(formAction + `/${uid}/${related_batch}`, {
                updateData: inputData,
            });                      
        } else if(formMethod === "delete") {
            result = await axios.delete(formAction + `/${uid}`);   
            
        } 

        responseToResult(result, updatedImg);
    }
        
    async function storeImgsInFirebase(inputData) {
        dispatch(setNotification(["loading", null]));
        document.querySelector("body").style.pointerEvents = "none";

        const storageRefPersonal = ref(storage, personalImg.name);
        await uploadBytes(storageRefPersonal, personalImg);
        const getPersonalImgUrl = await getDownloadURL(storageRefPersonal);


        const storageRefDocument = ref(storage, documentImg.name);
        await uploadBytes(storageRefDocument, documentImg);
        const getDocumentImgUrl = await getDownloadURL(storageRefDocument);
        inputData.unshift(getDocumentImgUrl);
        inputData.unshift(getPersonalImgUrl);
        requsetsFunc(inputData, "");
    }
    async function storeImgsInFirebasePutMethod(inputData) {
        dispatch(setNotification(["loading", null]));
        let updatedImg = "";
        document.querySelector("body").style.pointerEvents = "none";
        if(!inputData[0]) {
            inputData[0] = getData[getDataImgsKeys[0]];
        } else {
            
            const storageRefPersonal = ref(storage, personalImg.name);
            await uploadBytes(storageRefPersonal, personalImg);
            const getPersonalImgUrl = await getDownloadURL(storageRefPersonal);
            inputData[0] = getPersonalImgUrl + "/*)Jfalnf@213/*$%#@*SjlaPersonalImg";
            updatedImg += " personalImg ";
        }
        if(!inputData[1]) {
            inputData[1] = getData[getDataImgsKeys[1]];
        } else {
            const storageRefDocument = ref(storage, documentImg.name);
            await uploadBytes(storageRefDocument, documentImg);
            const getDocumentImgUrl = await getDownloadURL(storageRefDocument);
            inputData[1] = getDocumentImgUrl + "/*)dasfkjk#&*^$21#@*SjlaDocumentImg";
            updatedImg += " documentImg ";
        }

        requsetsFunc(inputData, updatedImg);
    }

    return (
        <div className="shadow">
            <div className="form-bg">
                <form className="formTemplate" onSubmit={async (e) => {
                    e.preventDefault();
                    let inputData = [];
                    let i = 0;
                    if(formMethod === "put") {
                        inputData.push(0);
                        inputData.push(0);
                    }

                    for(i; i < e.target.elements.length - 2; i++) {
                        if(e.target.elements[i].value && (i === 0 || i === 1) && formMethod === "put") {
                            inputData[i] = e.target.elements[i].value
                        } else if(!e.target.elements[i].value && (i === 0 || i === 1) && formMethod === "put") {
                            inputData[i] = 0
                        } else if(e.target.elements[i].value === '') {
                            dispatch(setNotification(["error", "some feilds are empty **"]));
                            return;
                        } else if(e.target.elements[i].id === "normal0" && e.target.elements[i].value.split(' ').length < 4) {
                            dispatch(setNotification(["error", "First 4 names of the student should be provide **"]));
                            return;
                        } else if (e.target.elements[i].id === "normal3" && (!(parseFloat(e.target.elements[i].value) > 50) || !(parseFloat(e.target.elements[i].value) <= 105) || isNaN(e.target.elements[i].value))) {
                            dispatch(setNotification(["error", "Average must be between 50%-105%**"]));
                            return;
                        } else {
                            inputData.push(e.target.elements[i].value);
                        }
                    }

                    if(formMethod === "post") {
                        inputData.shift();
                        inputData.shift();
                        storeImgsInFirebase(inputData);
                    } else if(formMethod === "put") {
                        storeImgsInFirebasePutMethod(inputData);
                    } else {
                        requsetsFunc(inputData);
                    }


                }}>
                <i onClick={close} className="fa fa-times" id="close"></i>
                <h3>{ getData ? title + getData.name : title }</h3>          
                <p style={{ color: "red"}}>{ description + randomNames }</p>
                <div className="container">

                    {formMethod !== "delete" &&                     
                    <div className="inputContainer studentInputContainer">
                        <div className="fileInput">
                            <h5>Student Personal image</h5>
                            <p>Only .png/.jpg flies aloud</p>
                            <input defaultChecked={personalImg} onChange={(e) => {
                                setPersonalImg(e.target.files[0]);
                            }} type="file" id="upload" accept="image/*"/>
                            <label htmlFor="upload"><p>Choose file</p></label>
                            <ul>
                            {personalImg &&                                    
                                    <li>
                                        <p>{personalImg.name}</p>
                                    </li>
                                }
                            </ul> 
                        </div>
                    </div>}

                    {formMethod !== "delete" &&                     
                    <div className="inputContainer studentInputContainer">
                        <div className="fileInput">
                            <h5>Student document image</h5>
                            <p>Only .png/.jpg flies aloud</p>
                            <input defaultValue={documentImg} onChange={(e) => {
                                setDocumentImg(e.target.files[0]); 
                            }} type="file" id="upload2" accept="image/*"/>
                            <label htmlFor="upload2"><p>Choose file</p></label>
                            <ul>
                                {documentImg &&                                    
                                    <li>
                                        <p>{documentImg.name}</p>
                                    </li>
                                }
                            </ul> 
                        </div>
                    </div>}


                    {normalInputs.map((input, index) => {
                        return (
                            <div className="inputContainer" key={ index }>
                                <label htmlFor={`normal${index}`}><p>{ input }</p></label>
                                { !getData && <input id={`normal${index}`} type="text" placeholder={`Enter ${input}`} name={input}/>}  
                                { getData && <input defaultValue={getData[getDataInputKeys[index]]} id={`normal${index}`} type="text" placeholder={`Enter ${input}`} name={input}/>} 
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


export default StudentForm;