import React from 'react';

export default class Square extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='square'>
                <div className='block a'></div>
                <div className='block b'></div>
                <div className='block c'></div>
                <div className='block d'></div>
            </div>
        )
    }
}
//each item is made up of four squares
//key presses make each individual square move a certain amount to mimic movement
//state has functions for each piece, pass down accordingly
//settimeout or interval to keep gameflow going
//but how to make each individual piece?
//do i put each in a container?
//and position relatively to the container?
//container is positioned relatively or absolutely to game window..