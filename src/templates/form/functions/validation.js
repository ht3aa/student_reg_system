export function checkIfSamePassword(inputData) {
    if(inputData[1] === inputData[2]) {
        return true
    } else {
        return false
    }
}

export function checkTheLengthOfPassword(inputData) {
    if(inputData[1].length < 5 || inputData[2].length < 5) {
        return false;
    } else {
        return true;
    }
}