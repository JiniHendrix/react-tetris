import React from 'react';
import Line from './line.jsx';
import Zig from './zig.jsx';
import Zag from './zag.jsx';
import T from './T.jsx';
import Square from './square.jsx';

export default class Game extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="game-window">
                <Square />
                <Line />
                <Zig />
                <Zag />
                <T />
            </div>
        )
    }
}
