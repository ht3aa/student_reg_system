function generateUserSystemFormRole(type) {
    const formDetails = {
        delete: {
            title: "Delete Role: ",
            description: "",
            buttonText: "Delete",
            buttonColor: "#E00000",
            formAction: "/deleteRole",
            formMethod: "delete",
            normalInputs: [],
            selectInputs: [],
        }
    }
    
    return formDetails.delete;
}

export default generateUserSystemFormRole;