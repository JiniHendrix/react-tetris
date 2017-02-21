import React from 'react';

export default class T extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.funcs.addKeypressListener();
    }
    render() {
        return (
            <div className='tee'>
                <div className='block a'></div>
                <div className='block b'></div>
                <div className='block c'></div>
                <div className='block d'></div>
            </div>
        )
    }
}