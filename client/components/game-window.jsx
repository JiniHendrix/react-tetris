import React from 'react';
import Line from './line.jsx';
import Zig from './zig.jsx';
import Zag from './zag.jsx';
import T from './T.jsx';
import Square from './square.jsx';
import RightL from './rightL.jsx';
import LeftL from './leftL.jsx';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      blocks: [<Square />, <T />, <Line />, <Zig />, <Zag />, <RightL />, <LeftL />],
      nextBlock: null,
      renderedBlocks: [],
      id: 0,
      board: this.boardInit(),
      elem: null,
      currBlockState: 0,
      blockStates: {
        tee: [{
          a: {top:0, left:0},
          b: {top:0,left:-30},
          c: {top:0,left:30},
          d: {top:30,left:0},
        }, {
          a: {top:0, left:0},
          b: {top:0, left:-30},
          c: {top:-30, left:0},
          d: {top:30, left:0},
        }, {
          a: {top:0, left:0},
          b: {top:0, left:-30},
          c: {top:-30, left:0},
          d: {top:0, left:30},
        }, {
          a: {top:0, left:0},
          b: {top:-30, left:0},
          c: {top:0, left:30},
          d: {top:30, left:0},
        }],
        line: [{
          a: {top:-30, left:0},
          b: {top:0, left:0},
          c: {top:30, left:0},
          d: {top:60, left:0},
        }, {
          a: {top:0, left:-30},
          b: {top:0, left:0},
          c: {top:0, left:30},
          d: {top:0, left:60},
        }],
        zig: [{
          a: {top:0, left:0},
          b: {top:0, left:30},
          c: {top:-30, left:0},
          d: {top:-30, left:-30},
        }, {
          a: {top:0, left:0},
          b: {top:30, left:0},
          c: {top:0, left:30},
          d: {top:-30, left:30},
        }],
        zag: [{
          a: {top:0, left:0},
          b: {top:0, left:-30},
          c: {top:-30, left:0},
          d: {top:-30, left:30},
        }, {
          a: {top:0, left:0},
          b: {top:-30, left:0},
          c: {top:0, left:30},
          d: {top:30, left:30},
        }],
        rightL: [{
          a: {top:-30, left:30},
          b: {top:0, left:30},
          c: {top:0, left:0},
          d: {top:0, left:-30},
        }, {
          a: {top:-30, left:0},
          b: {top:30, left:0},
          c: {top:0, left:0},
          d: {top:30, left:30},
        }, {
          a: {top:0, left:30},
          b: {top:0, left:-30},
          c: {top:0, left:0},
          d: {top:30, left:-30},
        }, {
          a: {top:-30, left:0},
          b: {top:-30, left:-30},
          c: {top:0, left:0},
          d: {top:30, left:0},
        }],
        leftL: [{
          a: {top:-30, left:-30},
          b: {top:0, left:-30},
          c: {top:0, left:0},
          d: {top:0, left:30},
        }, {
          a: {top:-30, left:0},
          b: {top:-30, left:30},
          c: {top:0, left:0},
          d: {top:30, left:0},
        }, {
          a: {top:0, left:-30},
          b: {top:0, left:30},
          c: {top:0, left:0},
          d: {top:30, left:30},
        }, {
          a: {top:-30, left:0},
          b: {top:30, left:0},
          c: {top:0, left:0},
          d: {top:30, left:-30},
        }],
        square:[
          {
            a: {top:0, left:0},
            b: {top:0, left:30},
            c: {top:30, left:0},
            d: {top:30, left:30},
          }
        ]

      }
    };
    this.funcs = {};
    this.funcs.setInitialPos = this.setInitialPos.bind(this);
  }
  boardInit() {
    let board = [];
    for (let i = 0; i < 690/30; i++) {
      board.push(Array(450/30));
    } return board;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keypressHandler.bind(this));
    this.setState({ 
      nextBlock: this.randomBlock(),
    }, this.addBlock.bind(this));
  }

  setInitialPos(id) {
    const elem = document.getElementById(this.state.id);
    elem.setAttribute("style", "top: -30px; left: 210px");
    this.setState({ elem, currBlockState: 0 });
  }

  getPos() {
    return [this.convertPosToNum(this.state.elem.style.left), this.convertPosToNum(this.state.elem.style.top)];
  }

  keypressHandler(e) {
    let [left, top] = this.getPos();
    let direction;

    if (e.keyCode === 37) {
      left -= 30;
      direction = 'left';
    }
    else if (e.keyCode === 39) {
      left += 30;
      direction = 'right';
    }
    else if (e.keyCode === 40) {
      top += 30;
      direction = 'down';
    }
    else if (e.keyCode === 38) {
      this.turn();
    }

    if (!this.checkCollision(left, top, direction))
      this.state.elem.setAttribute("style", "top: " + top + "px; left: " + left + "px");
  }

  turn() {
    let className = this.state.elem.className;
    if (className === 'square') return;
    let children = [...this.state.elem.children];
    
    const currBlockState = this.state.currBlockState + 1 === this.state.blockStates[className].length ? 0 : this.state.currBlockState + 1;
    
    children.forEach((child) => {
      let childState = this.state.blockStates[className][currBlockState][child.className.slice(-1)];
      child.setAttribute("style", "top:"+childState.top+"; left:"+childState.left);
    });

    this.setState({ currBlockState });
  }

  randomBlock() {
    return this.state.blocks[Math.floor(Math.random() * 7)];
  }

  timer(id) {
    let [left, top] = this.getPos();
    if (!this.checkCollision(left, top)) {
      top += 30;
      this.state.elem.setAttribute("style", "top:" + top + "px; left:" + left + "px");
      setTimeout(this.timer.bind(this, this.state.id), 500);
    } else {
      this.recordPos();
      this.addBlock();
    }
  }

  addBlock() {
    let temp = [...this.state.renderedBlocks];
    const id = this.state.id + 1;

    temp.push(React.cloneElement(this.state.nextBlock, { id, funcs: this.funcs, key: id, inGame: true }));
    this.setState({ renderedBlocks: temp, id, nextBlock: this.randomBlock() }, this.timer.bind(this, id));
  }

  checkCollision(left, top, direction = 'down') {
    const children = [...this.state.elem.children];

    for (let i = 0; i < children.length; i ++) {
      let childPos = this.state.blockStates[this.state.elem.className][this.state.currBlockState][children[i].className.slice(-1)];
      const absLeft = (childPos.left + left) / 30;
      const absTop = (childPos.top + top) / 30;
      console.log(absLeft, absTop);
      if (absLeft < 0 || absLeft >= 15 || absTop >= 22) {
        return true;
      }
      if (absTop >= 0 && this.state.board[absTop][absLeft]) return true;

    }
    return false;
  }

  recordPos() {
    const children = [...this.state.elem.children];
    const temp = this.state.board;
    let [left, top] = this.getPos();

    children.forEach((child) => {
      let childPos = this.state.blockStates[this.state.elem.className][this.state.currBlockState][child.className.slice(-1)];
      const absLeft = (childPos.left + left) / 30;
      const absTop = (childPos.top + top) / 30;
      temp[absTop][absLeft] = { 
        id: this.state.id,
        block: child.className.slice(-1),  
      }
    });

    this.setState({ board: temp }, ()=>{console.log(this.state.board)});
  }

  addKeypressListener(id) {
    console.log('addKeypressListener', id);
  }
  convertPosToNum(str) {
    return Number(str.replace('px', ''));
  }

  render() {
    return (
      <div className="game-window">
        {this.state.renderedBlocks}
      </div>
    )
  }
}
