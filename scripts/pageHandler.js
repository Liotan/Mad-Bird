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
            pageHTML += renderRules();
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
