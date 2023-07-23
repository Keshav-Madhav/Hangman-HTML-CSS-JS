const letterContainer=document.getElementById("letterContainer");
const optionsContainer = document.getElementById("optionsContainer");
const userInputSection=document.getElementById("userInputSection");
const newGameContainer=document.getElementById("newGameContainer");
const newGameButton=document.getElementById("newGameButton");
const canvas=document.getElementById("canvas");
const resultText=document.getElementById("resultText");

let options = {
    fruits: ['apple', 
            'banana', 
            'orange', 
            'strawberry', 
            'grape', 
            'mango', 
            'pineapple', 
            'watermelon', 
            'kiwi', 
            'peach', 
            'plum', 
            'pear', 
            'cherry', 
            'blueberry', 
            'raspberry', 
            'blackberry', 
            'pomegranate', 
            'lemon', 
            'lime', 
            'grapefruit',
            'apricot',
            'tangerine',
            'mandarin',
            'cantaloupe',
            'honeydew',
            'papaya',
            'guava',
            'passionfruit',
            'dragonfruit',
            'jackfruit',
            'lychee',
        ],
    animals: ['dog', 
            'cat', 
            'lion', 
            'tiger', 
            'elephant', 
            'giraffe', 
            'zebra', 
            'monkey', 
            'gorilla', 
            'chimpanzee', 
            'bear', 
            'panda', 
            'koala', 
            'kangaroo', 
            'rhinoceros', 
            'hippopotamus', 
            'crocodile', 
            'alligator', 
            'snake', 
            'lizard',
            'horse',
            'cow',
            'pig',
            'sheep',
            'goat',
            'chicken',
            'turkey',
            'duck',
            'goose',
            'deer',
            'moose',
            'elk',
            'caribou',
            'wolf',
            'fox',
            'coyote',
            'raccoon',
            'skunk',
            'squirrel',
        ],
    countries: ['United States',
            'Russia',
            'Canada',
            'Mexico',
            'China',
            'United Kingdom',
            'France',
            'Germany',
            'Italy',
            'Spain',
            'Brazil',
            'Argentina',
            'Japan',
            'South Korea',
            'India',
            'Australia',
            'New Zealand',
            'South Africa',
            'Egypt',
            'Nigeria',
            'Switzerland',
            'Sweden',
            'Norway',
            'Denmark',
            'Finland',
            'Netherlands',
            'Belgium',
            'Austria',
            'Greece',
            'Portugal',
            'Ireland',
            'Poland',
            'Czech Republic',
            'Hungary',
            'Romania',
            'Bulgaria',
            'Croatia',
            'Serbia',
            'Slovakia', 
        ],
    space: ['astronomy', 
            'cosmology', 
            'galaxy', 
            'star', 
            'planet', 
            'Mercury',
            'Venus',
            'Earth',
            'Mars',
            'Jupiter',
            'Saturn',
            'Uranus',
            'Neptune',
            'Pluto',
            'moon', 
            'asteroid', 
            'comet', 
            'meteor', 
            'black hole', 
            'nebula', 
            'supernova', 
            'constellation', 
            'universe', 
            'big bang', 
            'dark matter', 
            'gravity', 
            'orbit',
        ],
    cars: ['Tesla',
            'Mazda',
            'BMW',
            'Subaru',
            'Porsche',
            'Chevrolet',
            'Honda',
            'Nissan',
            'Ford',
            'Fiat',
            'Audi',
            'Mercedes Benz',
            'Lexus',
            'Toyota',
            'Hyundai',
            'Kia',
            'Volkswagen',
            'Jeep',
            'Dodge'
        ],
    sports: ['soccor',
            'Cricket',
            'Hockey',
            'Tennis',
            'Volleyball',
            'Table tennis',
            'Basketball',
            'Baseball', 
            'Rugby', 
            'Golf',
            'Football',
            'Archery',
            'Swimming',
            'Athletics',
            'Badminton',
            'Boxing',
            'Cycling',
            'Fencing',
            'Formula one',
            'Gymnastics'
        ],
    brands: [
            'Amazon',
            'Apple',
            'Google',
            'Microsoft',
            'Tencent',
            'Facebook',
            'Visa',
            'McDonalds',
            'Mastercard',
            'Coca-Cola',
            'Nike',
            'Samsung',
            'PepsiCo',
            'Nestle',
            'Intel',
            'Disney',
            'Coca cola'
        ]
};

let winCount=0;
let count=0;
let chosenWord="";
let correctGuessCount = 0;

//creating options
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select an Option</h3>`;
    let buttonCon = document.createElement("div");
    buttonCon.classList.add("options-carousel");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')"> ${value} </button>`;
    }
    optionsContainer.appendChild(buttonCon);

    // adding mouse and touch event listeners
    let isDown = false;
    let startX;
    let scrollLeft;

    buttonCon.addEventListener("mousedown", (event) => {
        isDown = true;
        startX = event.pageX - buttonCon.offsetLeft;
        scrollLeft = buttonCon.scrollLeft;
    });

    buttonCon.addEventListener("mouseleave", () => {
        isDown = false;
    });

    buttonCon.addEventListener("mouseup", () => {
        isDown = false;
    });

    buttonCon.addEventListener("mousemove", (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.pageX - buttonCon.offsetLeft;
        const walk = (x - startX) ; // scroll-fast
        buttonCon.scrollLeft = scrollLeft - walk;
    });

    buttonCon.addEventListener("touchstart", (event) => {
        isDown = true;
        startX = event.touches[0].pageX - buttonCon.offsetLeft;
        scrollLeft = buttonCon.scrollLeft;
    });

    buttonCon.addEventListener("touchend", () => {
        isDown = false;
    });

    buttonCon.addEventListener("touchmove", (event) => {
        if (!isDown) return;
        event.preventDefault();
        const x = event.touches[0].pageX - buttonCon.offsetLeft;
        const walk = (x - startX); // scroll-fast
        buttonCon.scrollLeft = scrollLeft - walk;
    });
};

const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    letterButtons.forEach((button) => {
        button.disabled.true;
    });

    newGameContainer.classList.remove("hide");
    document.getElementById("correctGuessCountPopup").innerText = `Correct guesses: ${correctGuessCount}`;
};

//Word generation
const generateWord=(optionValue) =>{
    let optionsButtons =document.querySelectorAll(".options");
    optionsButtons.forEach((button)=>{
        if(button.innerText.toLowerCase() === optionValue){
            button.classList.add("active");
        }
        button.disabled=true;
    });

    letterContainer.classList.remove("hide");
    userInputSection.innerText="";

    //choosing a random word
    let optionArray=options[optionValue];
    chosenWord=optionArray[Math.floor(Math.random()*optionArray.length)];
    chosenWord=chosenWord.toUpperCase();
    
    //replacing all character of chosen word. /./ meaning first character, adding d means all characters
    let displayItem = "";
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === " ") {
            displayItem += "-";
        } else {
            displayItem += '<span class="dashes">_</span>';
        }
    }
userInputSection.innerHTML = displayItem;

}

const initializer = ()=>{
    winCount=0;
    count=0;

    userInputSection.innerHTML="";
    optionsContainer.innerHTML="";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML="";

    //using ascii to create letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => handleLetterClick(button));
        letterContainer.append(button);
    }

    displayOptions();
    let {initialdrawing}=canvasCreator();
    initialdrawing();

    window.addEventListener("keydown", (event) => {
        if (event.key >= "a" && event.key <= "z") {
            let letterButtons = document.querySelectorAll(".letters");
            letterButtons.forEach((button) => {
                if (button.innerText === event.key.toUpperCase()) {
                    button.click();
                }
            });
        }
    });
    
};

const canvasCreator= ()=>{
    let context =canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle="#000";
    context.lineWidth=2;

    const drawLine=(fromX,fromY,toX,toY) =>{
        context.moveTo(fromX,fromY);
        context.lineTo(toX,toY);
        context.stroke();
    };

    const head= ()=>{
        context.beginPath();
        context.arc(70,30,10,0,Math.PI*2,true);
        context.stroke();
    };

    const body= ()=>{
        drawLine(70,40,70,80);
    };

    const leftArm= ()=>{
        drawLine(70,50,50,70);
    };

    const rightArm= ()=>{
        drawLine(70,50,90,70);
    };

    const leftLeg= ()=>{
        drawLine(70,80,50,110);
    };

    const rightLeg= ()=>{
        drawLine(70,80,90,110);
    };

    const initialdrawing= ()=>{
        context.clearRect(0,0,context.canvas.width, context.canvas.height);
        drawLine(10,130,130,130);
        drawLine(10,10,10,131);
        drawLine(10,10,70,10);
        drawLine(70,10,70,20);
    };

    return{initialdrawing,head,body,leftArm,rightArm,leftLeg,rightLeg};
};

const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    let context = canvas.getContext("2d");
    context.clearRect(canvas.width - 50, 0, 40, 40);
    context.font = "bold 10px Poppins";
    context.fillText(`(${count}/6)`, canvas.width - 40, 20);
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};


const handleLetterClick = (button) => {
    let noSpaceWord = chosenWord.replace(/\s+/g, '');
    let charArray = noSpaceWord.split("");

    let dashes = document.getElementsByClassName("dashes");
    if (charArray.includes(button.innerText)) {
        // code to handle correct guesses
        charArray.forEach((char, index) => {
            if (char === button.innerText) {
                dashes[index].innerText = char;
                winCount += 1;
                if (winCount == charArray.length) {
                    resultText.innerHTML = `<h2 class="winMsg">You Win!</h2> <p>The word was <span>${chosenWord}</span></p>`;
                    correctGuessCount += 1;
                    document.getElementById("correctGuessCount").innerText = `Correct guesses: ${correctGuessCount}`;
                    blocker();
                }
            }
        });
    } else {
        // code to handle incorrect guesses
        count++;
        drawMan(count);
        if (count == 6) {
            resultText.innerHTML = `<h2 class="loseMsg">You Lose! :(</h2> <p>The word was <span>${chosenWord}</span></p>`;
            blocker();
        }
    }
    button.disabled = true; // disable the button after it has been clicked
};

window.onload=initializer;
newGameButton.addEventListener("click", initializer);