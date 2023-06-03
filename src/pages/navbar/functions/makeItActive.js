let ulElement = null;

export const makeItActive = (target) => {

    if(target.nodeName === "P" || target.nodeName === "H5" || target.nodeName === "H4" || target.nodeName === "A") {
        
        
        ulElement = document.querySelector("nav ul");

        for(let i = 0; i < ulElement.children.length; i++) {
            ulElement.children[i].children[0].children[0].classList.remove("active");
        }

        if(target.nodeName === "A") {
            ulElement.children[1].children[0].children[0].classList.add("active");
            window.scroll(0, 0);           
        } else {
            target.classList.add("active");
            window.scroll(0, 0);
        }
    } 

}