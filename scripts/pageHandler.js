let SPAState = {};
let myStorage = window.localStorage;

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
        case 'Controls':
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
    setTimeout(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        return;
    }
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
    }, 0);
}

switchToScorePage = () => {
    switchToState({
        pageName: 'Score'
    });

    setTimeout(() => {
        const registration = document.getElementById('registration');
        if (!registration) {
            return;
        }

        const ok = document.getElementById('ok');

        ok.onclick = () => {
            if (registration.value != ''){
                const li = document.createElement('li');
                const text = document.createTextNode(`Player: ${registration.value} Score: ${myStorage.getItem('score')} Time: ${myStorage.getItem('time')}`);
                li.appendChild(text);
                document.getElementById('ul').appendChild(li);
                ok.onclick = undefined;
            } else {
                alert('Enter nickname');
            }
        }
    }, 0);

}

switchToControlsPage = () => {
    switchToState({
        pageName: 'Controls'
    });
}

switchToStateFromURLHash();
