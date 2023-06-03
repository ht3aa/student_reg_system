import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { setRoleAdmin, setRoleManager, setRoleSuperviser } from "../../redux/features/identifyRole";
import Header from "./components/Header";
import Batches from "./pages/batches/Batches";
import Departments from "./pages/departments/Departments";
import Students from "./pages/students/Students";


const Data = () => {
    const location = useLocation();
    const param = useParams();
    const [allowAccess, setAllowAccess] = useState(true);
    const navigate = useNavigate();
    const userData = useSelector(state => state.userDataSlice.userData);
    const dispatch = useDispatch();
    const [savedDepartmentUid, setSavedDepartmentUid] = useState(null);

        
    useEffect(() => {
        if(userData[0]) {
            if(userData[0][1] === "manager") {
                dispatch(setRoleManager(true));
            } else {
                
                if(location.pathname === "/data") {
                    setAllowAccess(true);
                    dispatch(setRoleAdmin(false));
                    dispatch(setRoleSuperviser(false));
                    setSavedDepartmentUid(null);
                } 
                if(((param.uid === userData[0][2]) || savedDepartmentUid === userData[0][2]) && (location.pathname !== "/data")){
                    setSavedDepartmentUid(param.uid);
                    setAllowAccess(false);
                    if(userData[0][1] === "supervisor") {
                        dispatch(setRoleSuperviser(true));
                    } else if (userData[0][1] === "admin" && !location.pathname.includes("/data/department")) {
                        console.log('admin')
                        dispatch(setRoleAdmin(true));
                    } else {
                        dispatch(setRoleAdmin(false));
                    }
                } else if(allowAccess && !location.pathname.includes("/data/batch")) {
                    navigate("/data");
                }
            }
        } 
    }, [location.pathname, navigate, param.uid, userData, allowAccess, dispatch, savedDepartmentUid])

    return (
        <div className="data">
            <Header />
            {location.pathname === "/data" && <Departments />}
            {location.pathname === `/data/department/${param.uid}` && <Batches departmentUid={param.uid} />}
            {location.pathname === `/data/batch/${param.uid}` && <Students batchUid={param.uid}/>}
        </div>
    )
}

export default Data;