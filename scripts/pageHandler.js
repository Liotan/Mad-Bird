let SPAState = {};

switchToStateFromURLHash = () => {
    const URLHash = window.location.hash;
    const stateStr = URLHash.substring(1);
    if (stateStr != "") {
        SPAState = {
            pageName: stateStr
        };
    } else {
        SPAState = {
            pageName: 'Main'
        };
    }

    let pageHTML = "";

    switch (SPAState.pageName) {
        case 'Main':
            pageHTML += renderMain();
            break;
        case 'Game':
            pageHTML += renderGame();
            break;
        case 'Score':
            pageHTML += renderScore();
            break;
        case 'Rules':
            pageHTML += renderControls();
            break;
    }
    document.getElementById('IPage').innerHTML = pageHTML;
}

window.onhashchange = switchToStateFromURLHash;

switchToState = (newState) => {
    location.hash = newState.pageName;
}

switchToMainPage = () => {
    switchToState({
        pageName: 'Main'
    });
}

switchToGamePage = () => {
     switchToState({
        pageName: 'Game'
    });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 960;
    canvas.height = 960;

    const game = new Game(canvas, ctx);

    let lastTime = 0;
    let animate = (timeStamp) => {
        const delta = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(delta);
        requestAnimationFrame(animate);
    }

    animate(0);
    canvas.scrollIntoView();
    game.sound.play(game.sound.music);
}

switchToScorePage = () => {
    switchToState({
        pageName: 'Score'
    });
}

switchToRulesPage = () => {
    switchToState({
        pageName: 'Rules'
    });
}

switchToStateFromURLHash();
