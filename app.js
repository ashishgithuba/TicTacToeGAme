let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true for Player, false for Computer
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const playerSymbol = "O";
const computerSymbol = "X";

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = playerSymbol;
            box.disabled = true;
            turnO = false;
            checkWinner();
            if (!turnO) {
                setTimeout(computerTurn, 500); // Delay for computer's move
            }
        }
    });
});

const computerTurn = () => {
    let emptyBoxes = [...boxes].filter((box) => box.innerText === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = computerSymbol;
        randomBox.disabled = true;
        turnO = true;
        checkWinner();
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log(`Winner: ${pos1val}`);
            showWinner(pos1val === playerSymbol ? "Player" : "Computer");
            disableAllBoxes();
            return;
        }
    }

    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

resetBtn.addEventListener("click", () => {
    resetGame();
});

newGameBtn.addEventListener("click", () => {
    resetGame();
});

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turnO = true;
};
