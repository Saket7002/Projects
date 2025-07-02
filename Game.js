let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector(".reset");
let New = document.querySelector(".New");
let msg = document.querySelector(".msg");
let message = document.querySelector(".message");
let Text = document.querySelector(".Text");
let para = document.querySelector(".para");

let turnO = true;

const winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

]
const reset = () => {
    turnO = true;
    enableboxes ();
    msg.classList.add("hide");
    Text.classList.add("hide");
}
boxes.forEach( (box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            box.innerText = "O"
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinners();

        
    });

});
const disableboxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }

};
const enableboxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }

};
            const showWinner = (Winner) => {
            message.innerText = `Congratulations, Winner is ${Winner}`;
            msg.classList.remove("hide");
            disableboxes();

        }
        const noWinner = (Draw)  => {
            para.innerText = `Match is Draw`;
            Text.classList.remove("hide");
            disableboxes();

        }
const checkwinners = () => {
    for(let pattern of winpattern){
        let post1val = boxes[pattern[0]].innerText;
        let post2val = boxes[pattern[1]].innerText;
        let post3val = boxes[pattern[2]].innerText;

        if(post1val!= "" && post2val != "" && post3val != ""){
            if(post1val === post2val && post2val === post3val){
                console.log("Winner");
                showWinner(post1val);
            }else{
                noWinner(post1val,post2val,post3val);
            }

        }


    }
};

New.addEventListener("click",reset);
resetGame.addEventListener("click",reset);

