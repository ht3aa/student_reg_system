import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import AboutUs from "./pages/aboutUs/AboutUs";
import generateAccountSystemFormType from "./globalFunctions/formDetails/generateAccountSystemFormType";
import Form from "./templates/form/Form";
import Notification from "./templates/notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "./redux/features/getUserData";
import Data from "./pages/data/Data";
import generateDepartmentFormType from "./globalFunctions/formDetails/generateDepartmentFormType";
import generateBatchFormType from "./globalFunctions/formDetails/generateBatchFormType";
import generateStudentFormType from "./globalFunctions/formDetails/generateStudentFormType";
import generateUserSystemFormRole from "./globalFunctions/formDetails/generateUserSystemFormRole";
import StudentForm from "./templates/form/StudentForm";
import StudentInfo from "./pages/studentInfo/StudentInfo";
import ManagerDashboard from "./pages/mangerDashboard/ManagerDashboard";
import Error404 from "./pages/error404/Error404";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDataSlice.userData);
 
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // register, login, logout
  const registerForm = generateAccountSystemFormType("register");
  const loginForm = generateAccountSystemFormType("login");
  const logoutForm = generateAccountSystemFormType("logout");

  // department forms
  const createDeperatmentForm = generateDepartmentFormType("create");
  const updateDepartmentForm = generateDepartmentFormType("update");
  const deleteDepartmentForm = generateDepartmentFormType("delete");

  // batch forms
  const createBatchForm = generateBatchFormType("create");
  const updateBatchForm = generateBatchFormType("update");
  const deleteBatchForm = generateBatchFormType("delete");  

  // student forms
  const addStudentForm = generateStudentFormType("add");
  const updateStudentForm = generateStudentFormType("update");
  const deleteStudentForm = generateStudentFormType("delete");

  // role forms
  let addSuperviserForm;
  let addAdminForm;
  if(userData[0]) {
    addSuperviserForm = {
      title: "Add new Superviser",
      description: "",
      buttonText: "Add",
      buttonColor: "#0F62FE",
      formAction: "/addSuperviser",
      formMethod: "post",
      normalInputs: [],
      selectInputs: [[userData[0][2], "choose user"], [userData[0][3], "choose Department"]],
    }
    addAdminForm = {
      title: "Add new Admin",
      description: "",
      buttonText: "Add",
      buttonColor: "#0F62FE",
      formAction: "/addAdmin",
      formMethod: "post",
      normalInputs: [],
      selectInputs: [[userData[0][2], "choose user"], [userData[0][3], "choose Department"]],
      colorInput: false,
    }
  }

  const deleteRoleForm = generateUserSystemFormRole("delete");

  return (
    <BrowserRouter>
      <Notification  />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/aboutus" element={<AboutUs />}/>
        <Route path="/register" element={<Form  formDetails={registerForm}/>}/> 
        <Route path="/login" element={<Form  formDetails={loginForm}/>}/> 
        <Route path="/logout" element={<Form  formDetails={logoutForm}/>}/>


        {userData[0] && <Route path='/data' element={<Data />} />}
        {userData[0] && <Route path="/data/createNewDepartment" element={<Form formDetails={createDeperatmentForm} />}/>}
        {userData[0] && <Route path="/data/update/department/:uid" element={<Form formDetails={updateDepartmentForm} />}/>}
        {userData[0] && <Route path="/data/delete/department/:uid" element={<Form formDetails={deleteDepartmentForm} />}/>}

        {userData[0] && <Route path='/data/department/:uid' element={<Data />} />}
        {userData[0] && <Route path='/data/department/:uid/createNewBatch' element={<Form formDetails={createBatchForm} />} />}
        {userData[0] && <Route path="/data/update/batch/:uid/:related_department" element={<Form formDetails={updateBatchForm} />}/>}
        {userData[0] && <Route path="/data/delete/batch/:uid" element={<Form formDetails={deleteBatchForm} />}/>}
        
        {userData[0] && <Route path='/data/batch/:uid' element={<Data />} />}
        {userData[0] && <Route path='/data/batch/:uid/AddNewStudent' element={<StudentForm formDetails={addStudentForm} />} />}
        {userData[0] && <Route path="/data/update/student/:uid/:related_batch" element={<StudentForm formDetails={updateStudentForm} />}/>}
        {userData[0] && <Route path="/data/delete/student/:uid" element={<StudentForm formDetails={deleteStudentForm} />}/>}
        {userData[0] && <Route path="/data/student/:uid" element={<StudentInfo />}/>}

        {userData[0] && userData[0][1] === "manager" && <Route path="/dashboard" element={<ManagerDashboard />} />}
        {userData[0] && userData[0][1] === "manager" && <Route path="/dashboard/addSuperviser" element={<Form formDetails={addSuperviserForm}/>} />}
        {userData[0] && userData[0][1] === "manager" && <Route path="/dashboard/addAdmin" element={<Form formDetails={addAdminForm}/>} />}
        {userData[0] && userData[0][1] === "manager" && <Route path="/deleteRole/:uid" element={<Form formDetails={deleteRoleForm} />}/>}

        <Route path="*" element={<Error404 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
