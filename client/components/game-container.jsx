import React from 'react';
import Game from './game-window.jsx';
import ScoreBoard from './score-board.jsx';

export default class Container extends React.Component {
    constructor() {
        super();
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
