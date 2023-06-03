import crudImg from "../assets/imgs/CrudImg.png";

function generateCrudBgImg(crudImgBgAmmount) {
    let crudImgBgArr = [];

    for(let i = 0; i < crudImgBgAmmount; i++) {
        crudImgBgArr.push(
            <img src={ crudImg } style={{
                // generate random values for left and top properties
                left: `${Math.floor(Math.random() * 100)}%`,
                top: `${Math.floor(Math.random() * 100)}%`,
            }} className="crudImgBg"  alt="crud background" key={i}/>
        );
    }
    
    return crudImgBgArr;
}

export default generateCrudBgImg;