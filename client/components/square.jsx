import React from 'react';

export default class Square extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.funcs.addKeypressListener(this.props.id);
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
