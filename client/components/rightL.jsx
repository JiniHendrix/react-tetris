import React from 'react';

export default class RightL extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.funcs.setInitialPos(this.props.id);
    }
    render() {
        return (
            <div className='rightL' id={this.props.id}>
                <div className='block a' style={{top:'-30px', left:'30px'}}></div>
                <div className='block b' style={{top:'0px', left:'30px'}}></div>
                <div className='block c' style={{top:'0px',left:'0px'}}></div>
                <div className='block d' style={{top:'0px',left:'-30px'}}></div>
            </div>
        )
    }
}