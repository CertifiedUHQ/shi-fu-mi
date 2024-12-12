//var Overlay name + Avatar
let btnSubit = document.querySelector("#sumbit-overlay1");
let display = document.querySelector(".start-background-overlay");

//var Select Avatars
let avatars = document.querySelectorAll(".avatar-options img");
let avatarsDiv = document.querySelectorAll(".avatar-options");

//var Overlay Rules
let displayRules = document.querySelector(".rules-overlay-background");
let btnRules = document.querySelector("#rules")
let btnCloseRules = document.querySelector("#close-rules")

let errorText = document.querySelector("#error-overlay1");

//plays-btn
let btnRock = document.querySelector("#rock-btn");
let btnPapper = document.querySelector("#papper-btn")
let btnScissors = document.querySelector("#scissors-btn")
let userChoice = null;
let mainScoreText = document.querySelector(".main-score");
let ennemieScoreText = document.querySelector(".ennemie-score");
let mainScore = 0;
let ennemieScore = 0;

//var Overlay Win
let displayWin = document.querySelector(".win-background-overlay");
let winTitle = null;
let winText = null;
let winTitleSpan = document.querySelector(".win-overlay span")
let winTextP = document.querySelector(".win-overlay p")

//Var Overlay Final Win
let displayFinalWin = document.querySelector(".final-win-background-overlay");
let winFinalTitleSpan = document.querySelector(".final-win-overlay span")
let winFinalTextP = document.querySelector(".final-win-overlay p")
let restartParty = document.querySelector("#restart-party");


// Random function to generate number for the bot
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// Function if avatar is selected
function IfAvatarSelected(event) {
    avatars.forEach(img => {
        img.style.border = "none";
        img.style.transform = "scale(1)";
    });
    event.target.style.border = "1px solid white";
    event.target.style.transform = "scale(1.2)";
}

// Function Submit Button
function submitBtn(event) {
    event.preventDefault();

    let username = document.querySelector("#username");
    let selectedAvatar = document.querySelector('input[name="avatar"]:checked');
    let mainAvatar = document.querySelector('#main-avatar');
    let mainAvatar2 = document.querySelector("#main-avatar2");

    if (!selectedAvatar) {
        let existingPErrorAvatar = document.querySelector(".error-message-avatar");
        if (!existingPErrorAvatar) {
            let errorPAvatar = document.createElement("p");
            errorPAvatar.textContent = "Veuillez sélectionner un avatar.";
            username.parentNode.insertBefore(errorPAvatar, username.nextSibling)
            errorPAvatar.classList.add("error-message-avatar");
        }
        return false;
    } else {
        let existingPErrorAvatar = document.querySelector(".error-message-avatar");
        if (existingPErrorAvatar) {
            existingPErrorAvatar.remove();
        }
        mainAvatar.src = selectedAvatar.value;
        mainAvatar2.src = selectedAvatar.value;
    }

    if (username.value === "") {
        let existingPErrorUsername = document.querySelector(".error-message-username");
        if (!existingPErrorUsername) {
            let errorPUsername = document.createElement("p");
            errorPUsername.textContent = "Veuillez entrer un pseudo.";
            username.parentNode.insertBefore(errorPUsername, username.nextSibling)
            errorPUsername.classList.add("error-message-username");
        }
        return false;
    } else {
        let existingPErrorUsername = document.querySelector(".error-message-username");
        if (existingPErrorUsername) {
            existingPErrorUsername.remove();
        }
        let name = document.querySelector("#name");
        name.innerHTML = username.value;
    }
    
    display.style.display = "none";
}

// Function run the games SHIFUMI
function games() {
    const choices = ["Pierre", "Papier", "Ciseaux"];
    const computerChoice = getRandomInt(3);

    if (userChoice === computerChoice) {
        winTitle = "EQUALITY!";
    } else if (
        (userChoice === 0 && computerChoice === 2) || // Pierre vs Ciseaux = GAGNER
        (userChoice === 1 && computerChoice === 0) || // Papier vs Pierre = GAGNER
        (userChoice === 2 && computerChoice === 1)    // Ciseaux vs Papier = GAGNER
    ) {
        mainScore += 1;
        mainScoreText.textContent = mainScore;
        winTitle = "YOU WIN!";
    } else {
        ennemieScore += 1;
        ennemieScoreText.textContent = ennemieScore;
        winTitle = "YOU LOOSE...";
    }

    if (mainScore >= 10 || ennemieScore >= 10) {
        displayFinalWin.style.display = "flex";
        if (ennemieScore  >= 10) {
            winFinalTitleSpan.textContent = "VOUS AVEZ PERDU..."
            winFinalTextP.textContent = `Vous: ${mainScore} | Peterbot: ${ennemieScore}`
        }
        if (mainScore >= 10) {
            winFinalTitleSpan.textContent = "VOUS AVEZ GAGNER!"
            winFinalTextP.textContent = `Vous: ${mainScore} | Peterbot: ${ennemieScore}`
        }
        return false;
    }
    else {
    winTitleSpan.textContent = winTitle;
    winTextP.textContent = `Vous : ${choices[userChoice]} | Ordinateur : ${choices[computerChoice]}`;
    displayWin.style.display = "flex";

    setTimeout(() => {
        displayWin.style.display = "none";
    }, 1500);
}
}

// If press enter submit the form
addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitBtn();
    }
});

// On click run the function submitBtn
btnSubit.addEventListener("click", submitBtn);

// On click change css style of the image
avatars.forEach(img => {
    img.addEventListener("click", IfAvatarSelected);
});

// Open Rules on click
btnRules.addEventListener("click", function() {
    displayRules.style.display = "flex";
});

// Close Rules on click
btnCloseRules.addEventListener("click", function() {
    displayRules.style.display = "none";
})

// If user selected papper on click
btnRock.addEventListener("click", function() {
    userChoice = 0;
    games();
});

// If user selected papper on click
btnPapper.addEventListener("click", function() {
    userChoice = 1;
    games();
});

// If user selected scissors on click
btnScissors.addEventListener("click", function() {
    userChoice = 2; 
    games();
});

// Restart party
restartParty.addEventListener("click", function() {
    mainScore = 0;
    ennemieScore = 0;
    mainScoreText.textContent = mainScore;
    ennemieScoreText.textContent = ennemieScore;
    displayFinalWin.style.display = "none";
})
