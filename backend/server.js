const { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgBnaf3_P-m57tK4lIQ0DwHnMz_VOs0Do",
  authDomain: "students-system-cdafa.firebaseapp.com",
  projectId: "students-system-cdafa",
  storageBucket: "students-system-cdafa.appspot.com",
  messagingSenderId: "791965955584",
  appId: "1:791965955584:web:4a40be39c1566cfe0ccae5",
  measurementId: "G-PP9LDWEZMD"
};

// Initialize Firebase
const appfire = initializeApp(firebaseConfig);
const storage = getStorage();




const express = require("express");
const mongoose = require("mongoose");
const departmentModel = require("./models/departmentModel");
const batchModel = require("./models/batchModel");
const studentModel = require("./models/studentModel");
const userModel = require("./models/userModel");
const generateRandomColor = require("./globalFunctions/generateRandomColor");


const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({  
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


app.get('/', (req, res) => {
    res.send('working');
})

mongoose.connect('/');

app.get("/getData/:uid", async (req, res) => {
    const { uid } = req.params;
    const department = await departmentModel.findById(uid);
    const batch = await batchModel.findById(uid);
    const student = await studentModel.findById(uid);
    const user = await userModel.findById(uid);

    if(department) res.send(department);
    else if(batch) res.send(batch);
    else if(student) res.send(student);
    else res.send(user);
})



// register, login, logout
app.post("/register", async (req, res) => {
    const { data } = req.body;
    const user = await userModel.findOne({ name: data[0]});

    if(!user) {
        const hash = await bcrypt.hash(data[1], 12);
        const user = new userModel({ name: data[0], password: hash});
        await user.save();
        // must be checked
        if(data[0] === "ht3aa") {
            const hashedRole = await bcrypt.hash("manager", 12)
            req.session.role = hashedRole;
            await userModel.findOneAndUpdate({ name: data[0]}, { role: hashedRole, role_name: "manager"});
            await user.save();
        }
        ///
        req.session.user_id = user._id;
        res.send("Registed successfully");
    } else {
        res.send("User exist **")
    }
});
app.post("/login", async (req, res) => {
    const { data } = req.body;
    const user = await userModel.findOne({ name: data[0] });
    
    if(!user) res.send("Wrong username or password **");
    else {
        const isVaild = await bcrypt.compare(data[1], user.password);
        if(isVaild) {
            req.session.user_id = user._id;
            res.send("login in successfully");
        }
        else res.send("Wrong username or password **");
    }
})
app.post("/logout", async (req, res) => {
    req.session.user_id = null;
    res.send("logout successfully")
})
app.get("/getUserData", async (req, res) => {
    if(!req.session.user_id) {
        res.send(false);
    } else {
        let message = [true];
        const user = await userModel.findById(req.session.user_id);
        
        if(user.role) {
            const isManager = await bcrypt.compare("manager", user.role);
            const isSuperviser = await bcrypt.compare("superviser", user.role);
            const isAdmin = await bcrypt.compare("admin", user.role);
    
            if(isSuperviser) {
                message.push("superviser");
                const users = await userModel.findById(req.session.user_id);
                message.push(users.related_department);
            } else if(isAdmin) {
                message.push("admin");  
                const users = await userModel.findById(req.session.user_id);
                message.push(users.related_department);              
            } else if(isManager) {
                message.push("manager");
                const users = await userModel.find({ name: {$ne: "ht3aa"}});
                message.push(users);
                const departments = await departmentModel.find();
                message.push(departments);
            }
        }
    

        res.send(message);
    }
});




app.get("/getDepartments", async (req, res) => {
    const departmentsData = await departmentModel.find();
    res.json(departmentsData);
});
app.post("/createNewDepartment", async (req, res) => {
    const { data } = req.body;

    let isDepartmentExist = await departmentModel.findOne({ name: data[0]});
    if(!isDepartmentExist) {
        let newDepartment = new departmentModel({name: data[0], color: generateRandomColor()});
        await newDepartment.save();
        res.json("New department has been created");
    } else {
        res.json("department already exist **");
    }
});
app.put("/updateDepartment/:uid", async (req, res) => {
    const { updateData } = req.body;
    const { uid } = req.params;
    let isDepartmentExist = await departmentModel.findOne({ name: updateData[0]});
    if(!isDepartmentExist) {
        await departmentModel.findByIdAndUpdate(uid, {name: updateData[0]});
        await userModel.findOneAndUpdate({related_department: uid }, {department_name: updateData[0]});
        res.json("Department has been Updated");
    } else {
        res.json("Department already exist **");
    }
});
app.delete("/deleteDepartment/:uid", async (req, res) => {
    const { uid } = req.params;
    const batches = await batchModel.find({ related_department: {$in: uid}});
    
    for(let i = 0; i < batches.length; i++) {
        const students = await studentModel.find({ related_batch: {$in: batches[i]._id}});
        for(let j = 0; j < students.length; j++) {

            try {
                const personalRef = ref(storage, students[j].personal_img_url);
                await deleteObject(personalRef);
            } catch(err) {
                console.log(err);
            }
            try {
                const documentRef = ref(storage, students[j].document_img_url);
                await deleteObject(documentRef);
            } catch(err) {
                console.log(err);
            }
            await studentModel.deleteOne(students[j]);
        }
        await batchModel.deleteOne(batches[i]);
    }
    let users = await userModel.find({related_department: uid});
    for(let i = 0; i < users.length; i++) {
        await userModel.findOneAndUpdate({related_department: uid}, {role: null, role_name: null, department_name: null, related_department: null});
    }
    await departmentModel.findByIdAndDelete(uid);
    res.json("Department has been Deleted");
});    





app.get("/department/:uid/getBatches", async (req, res) => {
    const { uid } = req.params;

    const batches = await batchModel.find({ related_department: {$in: uid}});
    res.json(batches);
})
app.post("/createNewBatch/:uid", async (req, res) => {
    const { data } = req.body;
    const { uid } = req.params;
    const { color } = await departmentModel.findById(uid);

    let isBatchExist = await batchModel.findOne({ name: data[0], related_department: uid});
    if(!isBatchExist) {
        let newBatch = new batchModel({ name: data[0], color: color, related_department: uid})
        await newBatch.save();
        res.json("New batch has been created");
    } else {
        res.json("Batch already exist **");
    }


})    
app.put("/updateBatch/:uid/:related_department", async (req, res) => {
    const { updateData } = req.body;
    const { uid, related_department } = req.params;
    console.log(updateData);
    console.log(uid);
    console.log(related_department);
    //http://localhost:3000/updateBatch/6215fadd8bd50a689969a9a4
    //http://localhost:3000/updateBatch/6215fadd8bd50a689969a9a4
    let isBatchExist = await batchModel.findOne({ name: updateData[0], related_department: related_department});
    console.log(await batchModel.find());
    if(!isBatchExist) {
        await batchModel.findByIdAndUpdate(uid, {name: updateData[0]});
        res.json("Batch has been Updated");
    } else {
        res.json("Batch already exist **");
    }

})    
app.delete("/deleteBatch/:uid", async (req, res) => {
    const { uid } = req.params;
    const students = await studentModel.find({ related_batch: {$in: uid}});
    for(let i = 0; i < students.length; i++) {  
        try {
            const personalRef = ref(storage, students[i].personal_img_url);
            await deleteObject(personalRef);
        } catch(err) {
            console.log(err);
        }
        try {
            const documentRef = ref(storage, students[i].document_img_url);
            await deleteObject(documentRef);
        } catch(err) {
            console.log(err);
        }

        await studentModel.deleteOne(students[i]);
    }
    await batchModel.findByIdAndDelete(uid);
    res.json("Batch has been Deleted");
})



app.get("/batch/:uid/getStudents", async (req, res) => {
    const { uid } = req.params;
    const students = await studentModel.find({ related_batch: {$in: uid}});

    res.json(students);
})   
app.get("/student/:uid", async (req, res) => {
    const { uid } = req.params;
    const student = await studentModel.findById(uid);
    res.send(student);
})
app.post("/addNewStudent/:uid", async (req, res) => {
    const { data } = req.body;
    const { uid } = req.params;

    let isStudentExist = await studentModel.findOne({ name: data[2], related_batch: uid});
    if(!isStudentExist) {
        let newStudent = new studentModel({ name: data[2], birth_date: data[3],
            resident: data[4], average: data[5],  personal_img_url: data[0], document_img_url: data[1],
            related_batch: uid})
        await newStudent.save();
        res.json("New student has been added");
    } else {
        try {
            const personalRef = ref(storage, data[0]);
            await deleteObject(personalRef);
        } catch(err) {
            console.log(err);
        }
        try {
            const documentRef = ref(storage, data[1]);
            await deleteObject(documentRef);
        } catch(err) {
            console.log(err);
        }
        res.json("Student already exist **");
    }

})    
app.put("/updateStudent/:uid/:related_batch", async (req, res) => {
    const { updateData } = req.body;
    const { uid, related_batch } = req.params;

    let isStudentExist = await studentModel.findOne({ name: updateData[2], related_batch: related_batch});
    if(isStudentExist) {
        if(updateData[0].includes("/*)Jfalnf@213/*$%#@*SjlaPersonalImg")) {
            updateData[0].replace("/*)Jfalnf@213/*$%#@*SjlaPersonalImg", '')
        }
        if(updateData[1].includes("/*)dasfkjk#&*^$21#@*SjlaDocumentImg")) {
            updateData[1].replace("/*)dasfkjk#&*^$21#@*SjlaDocumentImg", '')
        }        
        await studentModel.findByIdAndUpdate(uid, { birth_date: updateData[3],
            resident: updateData[4], average: updateData[5], document_img_url: updateData[1], personal_img_url: updateData[0],
            });
        res.json("Student has been updated without name included");
    } else {
        try {
            if(updateData[0].includes("/*)Jfalnf@213/*$%#@*SjlaPersonalImg")) {
                updateData[0].replace("/*)Jfalnf@213/*$%#@*SjlaPersonalImg", '')
                const personalRef = ref(storage, updateData[0]);
                await deleteObject(personalRef);
            }
        } catch(err) {
            console.log(err);
        }
        try {
            if(updateData[1].includes("/*)dasfkjk#&*^$21#@*SjlaDocumentImg")) {
                updateData[1].replace("/*)dasfkjk#&*^$21#@*SjlaDocumentImg", '')
                const documentRef = ref(storage, updateData[1]);
                await deleteObject(documentRef);
            } 
        } catch(err) {
            console.log(err);
        }
        res.json("You can't update the name of the student **");
    }
})    
app.delete("/deleteStudent/:uid", async (req, res) => {
    const { uid } = req.params;
    console.log(uid);
    const student = await studentModel.findById(uid);

    try {
        const personalRef = ref(storage, student.personal_img_url);
        await deleteObject(personalRef);
    } catch(err) {
        console.log(err);
    }
    try {
        const documentRef = ref(storage, student.document_img_url);
        await deleteObject(documentRef);
    } catch(err) {
        console.log(err);
    }

    await studentModel.findByIdAndDelete(uid);
    res.json("Student have been Deleted");
})



app.post("/addSuperviser", async(req, res) => {
    const { data } = req.body;

    const hashedRole = await bcrypt.hash("superviser", 12)
    req.session.role = hashedRole;
    let department = await departmentModel.findById(data[1]);
    console.log(department);
    await userModel.findByIdAndUpdate(data[0], { role: hashedRole, role_name: "superviser", department_name: department.name, related_department: data[1]});
    res.send("Done");
})
app.post("/addAdmin", async(req, res) => {
    const { data } = req.body;

    const hashedRole = await bcrypt.hash("admin", 12)
    req.session.role = hashedRole;
    let department = await departmentModel.findById(data[1]);

    await userModel.findByIdAndUpdate(data[0], { role: hashedRole, role_name: "admin", department_name: department.name, related_department: data[1]});

    res.send("Added successfully");
})
app.delete("/deleteRole/:uid", async (req, res) => {
    const { uid } = req.params;

    await userModel.findByIdAndUpdate(uid, {role: null, role_name: null, department_name: null, related_department: null});
    res.send('Deleted successfully')
})

