const inputSlider = document.querySelector('[DataLengthSlider]');
const lengthDisplay = document.querySelector('.DataLength');
const passwordDisplay = document.querySelector('[PassDisplay]');
const copyBtn = document.querySelector('.datacopy');
const copyMsg = document.querySelector('.Copied-Message');
const UppercaseCheck =  document.querySelector('#Uppercase');
const LowercaseCheck =  document.querySelector('#Lowercase');
const NumberCheck = document.querySelector('#Numbers');
const SymbolCheck = document.querySelector('#Symbols');
const indicator = document.querySelector('.StrengthIndicator');
const generateBtn = document.querySelector('.PasswordGenerator');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');
const symbols = '`~!@#$%^&*()-=+[]{};:"<>./,?'

// Password
let password = "";
let passwordLength = 10;
let checkcount = 0;
handleSlider();

setindicator("#ccc");

// set Password Length and show it to UI
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText =passwordLength; 
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max-min) + "% 100%";
};

// Strength
function setindicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
    // Object.style.boxShadow
    // shadow

};


function getRndInteger(min,max){
    return Math.floor(Math.random()* (max-min))+min;
};


function generateRandomNumber(){
    return getRndInteger(0,9);
};


function generateLowerCase(){
    return  String.fromCharCode(getRndInteger(97,123));
};

function generteUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
};

function generateSymbols(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
};

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;

    if(UppercaseCheck.checked) hasUpper=true;
    if(LowercaseCheck.checked) hasLower=true;
    if(NumberCheck.checked) hasNum = true;
    if(SymbolCheck.checked) hasSymbol = true;

    // if(hasUpper && hasLower && hasNum && hasSymbol && passwordLength>=10){
    //     setindicator('green');
    // }
    // else if(hasUpper && hasLower && (hasSymbol || hasNum) && passwordLength>=8){
    //     setindicator('blue');
    // }
    // else if((hasLower || hasUpper) && (hasSymbol || hasNum) && passwordLength<=5){
    //     setindicator('red');
    // }
    // else{
    //     setindicator('red');
    // }

    //   if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    //   setindicator("#0f0");
    // } else if (
    //   (hasLower || hasUpper) &&
    //   (hasNum || hasSym) &&
    //   passwordLength >= 6
    // ) {
    //   setindicator("red");
    // } else {
    //   setindicator("red");
    // }

    if(hasUpper && hasLower && hasNum && hasSymbol && passwordLength>=10){
            setindicator('green');
        }
        else if(hasUpper && hasLower && (hasSymbol || hasNum) && passwordLength>=8){
            setindicator('blue');
        }
        else if((hasLower || hasUpper) && (hasSymbol || hasNum) && passwordLength<=5){
            setindicator('red');
        }
        else{
            setindicator('red');
        }
    
}


// Password copied to Clipboard
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } 
    catch(e){
        copyMsg.innerText = "Failed";
    }
    
    // to make copy wala span visible
    copyMsg.classList.add('active');
    
    setTimeout( () => {
        copyMsg.classList.remove('active');
    },2000);
    
};
console.log('password copied start');

function shufflePassword(array){
    // Fisher Yeats Mehtod
    for(let i = array.length - 1; i > 0; i--){
        const j= Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str +=el));
    return str;
    
};

function handleCheckBoxChange(){
    checkcount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkcount++;
        }
    });
    
    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleSlider();
    }
};

// Adding eventlistner to checkbox 
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
}); 

// Adding Event Listner to HandSlider
inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
       copyContent();
});

console.log('password starts');
generateBtn.addEventListener('click',() =>{
    // if no check box are selected
    if(checkcount ==  0)
        return;

    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleSlider();
    }

    // finding new passwords
    console.log('password generate starts');

    // remove old password
      password = "";


    // put all the selected checkboxes
/*
    if(UppercaseCheck.checked){
        password += generteUpperCase();
    }

    if(LowercaseCheck.checked){
        password += generateLowerCase();
    }

    if(NumberCheck.checked){
        password += generateRandomNumber();
    }

    if(SymbolCheck.checked){
        password += generateSymbols();
    }

*/

let funcArr =[];

if(UppercaseCheck.checked){
    funcArr.push(generteUpperCase);
}

if(LowercaseCheck.checked){
    funcArr.push(generateLowerCase);
}

if(NumberCheck.checked){
    funcArr.push(generateRandomNumber);
}

if(SymbolCheck.checked){
    funcArr.push(generateSymbols);
}


// compulsory function
for(let i=0; i<funcArr.length; i++){
     password += funcArr[i]();
}

console.log('compulsory is done');

// remaining addition
for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0,funcArr.length);
    password += funcArr[randIndex]();
}

console.log('remaining is done');

// shuffle the password
password = shufflePassword(Array.from(password));



// show password in UI
passwordDisplay.value = password;

// calculate strength
calStrength();
});

