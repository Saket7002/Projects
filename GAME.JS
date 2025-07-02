let userscore = 0;
let computerscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscorepara = document.querySelector("#user");
const computerscorepara = document.querySelector("#computer");




const gencomputerChoice = () => {
    const option = ["ROCK" , "PAPER", "SCISSOR"];
    const randomidx = Math.floor(Math.random ()*3);
    return option [randomidx];
};

const drawGame = () => {
    console.log("Game Was Draw");
    msg.innerText = "Game Was Draw. Play Again"
    msg.style.backgroundColor = "#081b31";

};
const showWinner = (userwin,userChoice,computerChoice) => {
    if(userwin){
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You Win Your ${userChoice} beats ${computerChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        computerscore++;
        computerscorepara.innerText = computerscore;
        msg.innerText = `You Lose ${computerChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const PlayGame = (userChoice) => {
    console.log("userchoice =",userChoice)
const computerChoice = gencomputerChoice ();
console.log("compchoice",computerChoice);  
if(userChoice === computerChoice){
    drawGame();
}else{
   let userwin = true;
   if(userChoice === "ROCK"){
    userwin = computerChoice === "PAPER" ? false : true;

   }else if(userChoice === "PAPER"){
    userwin = computerChoice === "SCISSOR" ? false : true;
   }else{
    userwin = computerChoice === "ROCK" ? false : true;
   }
   showWinner(userwin, userChoice, computerChoice);
}

   
};


   

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id")
        
        PlayGame (userChoice);

    });
});