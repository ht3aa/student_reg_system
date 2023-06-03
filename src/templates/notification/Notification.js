import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Notification.css";
import { close } from "../../redux/features/toggleNotification";
import loadingIcon from "../../assets/imgs/loading-icon.png";

const Notification = () => {
    const notificationRef = useRef(null);    
    const [bgColor, setBgColor] = useState(null);
    const [borderColor, setBorderColor] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const notificationType = useSelector(state => state.toggleNotification.type);
    let notificationMessage = useSelector(state => state.toggleNotification.message);
    const dispatch = useDispatch();
    
    // delete the ( ** ) in the message that indicate it's not a success message
    if(notificationType !== "success" && notificationMessage !== null) {
        notificationMessage = notificationMessage.substring(0, notificationMessage.length - 2);
    }

    function delay(delayAmount) {
        setTimeout(() => {
            dispatch(close());
            setTimeout(() => {
                notificationRef.current.classList.remove("show");
            }, 500)
        }, delayAmount * 1000);
    }

    useEffect(() => {
        if(notificationType === "success") {
            notificationRef.current.classList.add("show");
            setMessageType("Sucsses Notification:");
            setBgColor("#1b9b2a");
            setBorderColor("2px solid #10421e");
            delay(3);
        } else if(notificationType === "error") {
            notificationRef.current.classList.add("show");
            setMessageType("Error Notification:")
            setBgColor("#bb2124");
            setBorderColor("2px solid #DA1E28");
            delay(3);
        } else if(notificationType === "loading") {
            notificationRef.current.classList.add("show");
            setBgColor("");
            setBorderColor("");
        }
    }, [notificationType])



    return (
        <div ref={notificationRef} className="notificationBox" style={{
            backgroundColor: bgColor,
            borderLeft: borderColor
        }}>
            {(notificationType === "success" || notificationType === "error") &&             
                <span>
                    <label>{messageType} </label>
                    {notificationMessage}
                </span>
            }
            {notificationType === "loading" &&

                <img src={loadingIcon} alt="loading" width="50" />   
            }
        </div>
    )
}


export default Notification;