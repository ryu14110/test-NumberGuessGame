// random number 지정
// user 가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 user가 랜덤번호를 맞추면, "맞췄습니다!"
// random number가 < user number  "Down!!!"
// random number가 > user number "Up!!!"
// Rest 버튼을 누르면 게임이 리셋 된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 추측 불가, disable 됨)
// user가 1~100  범위 밖의 숫자를 입력하면 알려 준다. 기회를 줄이지 않는다.
// user가 이미 입력한 숫자를 또 입력하면 알려 준다, 기회를 줄이지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
})

function pickRandomNum() {               // 램덤 함수 만들기
    computerNum = Math.floor(Math.random()*100)+1;   //정수 나오게(1~100 램덤 숫자)
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이 숫자를 입력해 주세요";
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";
        return;
    }

    chances -- ;
    chanceArea.textContent = `남은 기회 : ${chances} 번`;
    console.log("chance",chances);

    if(userValue < computerNum) {
        resultArea.textContent = "UP !!!"       
    } else if (userValue > computerNum) {
        resultArea.textContent = "DOWN !!!"       
    } else {
        resultArea.textContent = "** 맞췄습니다 !!!**"     
        gameOver = true;
    }

    history.push(userValue);

    if (chances < 1) {
        gameOver = true;
    }
    if (gameOver == true) {
        playButton.disabled = true;
    }
}

function reset() {
    // user input 창이 깨끗하게 정리되고
    userInput.value = "";
    //  새로운 번호가 생성되고
    pickRandomNum()
    resultArea.textContent = "결과값이 여기 나옵니다";
    gameOver = false;
    playButton.disabled = false;
    chances = 5;
    chanceArea.innerHTML = `남은 기회 : ${chances}번`;
    userValueList = [];
}

pickRandomNum()  //함수를 불러줘야 한다