import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getUserData} from "../../redux/features/getUserData";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
    const userDataStore = useSelector(state => state.userDataSlice.userData);
    const [userData, setUserData] = useState(userDataStore[0]);
    const [mount, setMount] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setMount(true);
    }, [])

    useEffect(() => {
        async function getData() {
            const { data } = await axios.get("/getUserData");

            setUserData(data);
        }
        if(mount) {
            dispatch(getUserData())      
            getData();      
        }
    }, [mount]);

    function filter(data) {
        let filterdUserData = [];
        for(let i = 0; i < data.length; i++) {
            if(data[i].department_name === null || data[i].department_name === undefined) continue;
            else filterdUserData.push(data[i])
        }
        return filterdUserData;
    }
    return (
        <div className="dashboard">
            <table>
                <thead>
                    <tr>
                        <td><h5>User name</h5></td>
                        <td><h5>Department</h5></td>
                        <td><h5>Role</h5></td>
                        <td><h5>Delete</h5></td>
                    </tr>
                </thead>
                <tbody>
                    {userData[0] && filter(userData[2]).map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.department_name}</td>
                                <td>{user.role_name}</td>
                                <td><Link to={`/deleteRole/${user._id}`}><button>Delete</button></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="buttonGroup">
                <Link to="/dashboard/addSuperviser"><button style={{ marginBottom: "15px"}}><h5>Add a Supervisor</h5></button></Link>
                <Link className="blueAdmin" to="/dashboard/addAdmin"><button><h5>Add an admin</h5></button></Link>
            </div>
        </div>
    )
}


export default ManagerDashboard;