import React from 'react';

export default class Zig extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='zig'>
                <div className='block a'></div>
                <div className='block b'></div>
                <div className='block c'></div>
                <div className='block d'></div>
            </div>
        )
    }
}