import React from 'react';
import Game from './game-window.jsx';
import ScoreBoard from './score-board.jsx';

export default class Container extends React.Component {
    constructor() {
        super();
        this.state= { 
            blockType: '.square' 
        };
        setTimeout(this.moveDown.bind(this, this.state.blockType), 500);
    }
    moveDown(typeClassName) {
        let elem = document.querySelectorAll(typeClassName);
        let pos = this.convertPosToNum(elem[0].style.top) + 30;

        elem[0].style.cssText = 'top: ' + pos +'px';
        setTimeout(this.moveDown.bind(this, this.state.blockType), 500);
    }
    addKeyListener() {
        // console.log('hello')
    }
    keyPressHandler(e) {
        console.log('HELLO');
        console.log(document.getElementsByClassName('game-container')[0]);
        console.log(e.keyCode);
    }
    convertPosToNum(str) {
        return Number(str.replace('px', ''));
    }
    componentDidMount() {
        document.getElementsByClassName('game-container')[0].onkeydown = this.keyPressHandler.bind(this);
        console.log(document.getElementsByClassName('game-container')[0].onkeydown)
    }
    render() {
        return (
            <div className="game-container">
                <Game />
                <ScoreBoard />
            </div>
        )
    }
}
