const speed = 200;

export const startHamAnimation = ({ current: hamIcoinDiv }) => {

    hamIcoinDiv.classList.add('resetPosition');
    setTimeout(() => {
        hamIcoinDiv.classList.add('rotate'); 
        setTimeout(() => {
            hamIcoinDiv.classList.add('rotateMore');                
        }, speed);           
    }, speed);
}

export const removeHamAnimation = ({ current: hamIcoinDiv }) => {

    hamIcoinDiv.classList.remove('rotateMore');
    setTimeout(() => {
        hamIcoinDiv.classList.remove('rotate'); 
        setTimeout(() => {
            hamIcoinDiv.classList.remove('resetPosition');                
        }, speed);           
    }, speed);
}