function generateAccountSystemFormType(type) {
    const formDetails = {
        register: {
            title: "Register",
            description: "",
            buttonText: "Register",
            buttonColor: "#0F62FE",
            formAction: "/register",
            formMethod: "post",
            normalInputs: ["username"],
            passwordInputs: ["password", "confierm password"],
            selectInputs: [], 
        },
        login: {
            title: "Login ",
            description: "",
            buttonText: "Login",
            buttonColor: "#0F62FE",
            formAction: "/login",
            formMethod: "post",
            normalInputs: ["username"],
            passwordInputs: ["password"],
            selectInputs: [],
        },
        logout: {
            title: "Log out",
            description: "are you sure you want to log out?",
            buttonText: "Log out",
            buttonColor: "#E00000",
            formAction: "/logout",
            formMethod: "post",
            normalInputs: [],
            selectInputs: [],       
        }
    }
    
    if(type === "register") return formDetails.register;
    else if(type === "login") return formDetails.login;
    else return formDetails.logout;

}


export default generateAccountSystemFormType;