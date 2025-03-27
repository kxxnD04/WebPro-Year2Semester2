let randomNum = () =>{
    const numbers = [];
    while (numbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * 10);
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }
    for(let i = 1; i<4; i++){
        document.getElementById("img"+i).src = numbers[i-1] + ".png";
    }
    for(let i = 4; i<7; i++){
        document.getElementById("img"+i).innerHTML = numbers[i-1];
    }
}
