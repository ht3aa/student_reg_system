function generateRandomColor() {
    const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let color = "#";

    for(let i = 0; i < 6; i++) {
        color += hexDigits[Math.floor(Math.random() * hexDigits.length)];
    }

    return color;
}

module.exports = generateRandomColor;