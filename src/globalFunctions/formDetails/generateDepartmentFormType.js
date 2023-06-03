function generateDepartmentFormType(type) {
    const formDetails = {
        create: {
            title: "Create New Department",
            description: "",
            buttonText: "Create",
            buttonColor: "#0F62FE",
            formAction: "/createNewDepartment",
            formMethod: "post",
            normalInputs: ["Department Nmae"],
            selectInputs: [],
        },
        update: {
            title: "Update Department: ",
            description: "",
            buttonText: "Update",
            buttonColor: "#0F62FE",
            formAction: "/updateDepartment",
            formMethod: "put",
            normalInputs: ["Department Name"],
            selectInputs: [],
        },
        delete: {
            title: "Delete Department: ",
            description: "are you sure you want to delete this department?",
            buttonText: "Delete",
            buttonColor: "#E00000",
            formAction: "/deleteDepartment",
            formMethod: "delete",
            normalInputs: [],
            selectInputs: [], 
        }
    }
    
    if(type === "create") return formDetails.create;
    else if(type === "update") return formDetails.update
    else return formDetails.delete;
}

export default generateDepartmentFormType;