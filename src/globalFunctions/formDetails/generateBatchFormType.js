function generateBatchFormType(type) {
    const formDetails = {
        create: {
            title: "Create New Batch",
            description: "",
            buttonText: "Create",
            buttonColor: "#0F62FE",
            formAction: "/createNewBatch",
            formMethod: "post",
            normalInputs: ["Batch name"],
            selectInputs: [],
        },
        update: {
            title: "Update Batch: ",
            description: "",
            buttonText: "Update",
            buttonColor: "#0F62FE",
            formAction: "/updateBatch",
            formMethod: "put",
            normalInputs: ["Batch name"],
            selectInputs: [],
        },
        delete: {
            title: "Delete batch: ",
            description: "are you sure you want to delete this batch?",
            buttonText: "Delete",
            buttonColor: "#E00000",
            formAction: "/deleteBatch",
            formMethod: "delete",
            normalInputs: [],
            selectInputs: [],
        }
    }
    
    if(type === "create") return formDetails.create;
    else if(type === "update") return formDetails.update
    else return formDetails.delete;
}

export default generateBatchFormType;