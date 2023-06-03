function generateStudentFormType(type) {
    const formDetails = {
        add: {
            title: "Add New Student",
            description: "",
            buttonText: "Create",
            buttonColor: "#0F62FE",
            formAction: "/addNewStudent",
            formMethod: "post",
            normalInputs: ["student name", "birth date", "resident", "Average"],
            selectInputs: [],
        },
        update: {
            title: "Update Student: ",
            description: "",
            buttonText: "Update",
            buttonColor: "#0F62FE",
            formAction: "/updateStudent",
            formMethod: "put",
            normalInputs: ["student name", "birth date", "resident", "Average"],
            selectInputs: [],
        },
        delete: {
            title: "Delete Student: ",
            description: "are you sure you want to delete this student?",
            buttonText: "Delete",
            buttonColor: "#E00000",
            formAction: "/deleteStudent",
            formMethod: "delete",
            normalInputs: [],
            selectInputs: [], 
        }
    }
    
    if(type === "add") return formDetails.add;
    else if(type === "update") return formDetails.update
    else return formDetails.delete;
}

export default generateStudentFormType;