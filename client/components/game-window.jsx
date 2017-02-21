import React from 'react';
import Line from './line.jsx';
import Zig from './zig.jsx';
import Zag from './zag.jsx';
import T from './T.jsx';
import Square from './square.jsx';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      blockType: '.square',
    };
    this.funcs = {};
    this.funcs.addKeypressListener = this.addKeypressListener.bind(this);

    setTimeout(this.timer.bind(this, this.state.blockType), 500);
  }
  timer(typeClassName) {
    let elem = document.querySelectorAll(typeClassName);
    let pos = this.convertPosToNum(elem[0].style.top) + 30;

    elem[0].style.cssText = 'top: ' + pos + 'px';
    setTimeout(this.timer.bind(this, this.state.blockType), 500);
  }
  // addKeypressListener() {
  //   console.log('hello')
  // }
  addKeypressListener(e) {
    console.log('HELLO');
    // console.log(document.getElementsByClassName('game-container')[0]);
    // console.log(e.keyCode);
  }
  convertPosToNum(str) {
    return Number(str.replace('px', ''));
  }
  // componentDidMount() {
  //     document.getElementsByClassName('game-container')[0].onkeydown = this.addkeyPressHandler.bind(this);
  //     console.log(document.getElementsByClassName('game-container')[0].onkeydown)
  //     //call keypress handler function
  // }
  render() {
    return (
      <div className="game-window">
        <Square funcs={this.funcs} />
        <Line funcs={this.funcs} />
        <Zig funcs={this.funcs} />
        <Zag funcs={this.funcs} />
        <T funcs={this.funcs} />
      </div>
    )
  }
}
