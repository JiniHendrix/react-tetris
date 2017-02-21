import React from 'react';
import Container from './game-container.jsx'

export default class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Container />
            </div>
        )
    }
}