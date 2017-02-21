import React from 'react';

export default class Line extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='line'>
                <div className='block a'></div>
                <div className='block b'></div>
                <div className='block c'></div>
                <div className='block d'></div>
            </div>
        )
    }
}