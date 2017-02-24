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
      landedBlockPositions: [],
      elem: null,
      currBlockState: 0,
      blockStates: {
        tee: [{
          a: "top:0px; left:0px",
          b: "top:0px;left:-30px",
          c: "top:0px;left:30px",
          d: "top:30px;left:0px",
        }, {
          a: "top:0px; left:0px",
          b: "top:0px; left:-30px",
          c: "top:-30px; left:0px",
          d: "top:30px; left:0px",
        }, {
          a: "top:0px; left:0px",
          b: "top:0px; left:-30px",
          c: "top:-30px; left:0px",
          d: "top:0px; left:30px",
        }, {
          a: "top:0px; left:0px",
          b: "top:-30px; left:0px",
          c: "top:0px; left:30px",
          d: "top:30px; left:0px",
        }],
        line: [{
          a: "top:-30px; left:0px",
          b: "top:0px; left:0px",
          c: "top:30px; left:0px",
          d: "top:60px; left:0px",
        }, {
          a: "top:0px; left:-30px",
          b: "top:0px; left:0px",
          c: "top:0px; left:30px",
          d: "top:0px; left:60px",
        }],
        zig: [{
          a: "top:0px; left:0px",
          b: "top:0px; left:30px",
          c: "top:-30px; left:0px",
          d: "top:-30px; left:-30px",
        }, {
          a: "top:0px; left:0px",
          b: "top:30px; left:0px",
          c: "top:0px; left:30px",
          d: "top:-30px; left:30px",
        }],
        zag: [{
          a: "top:0px; left:0px",
          b: "top:0px; left:-30px",
          c: "top:-30px; left:0px",
          d: "top:-30px; left:30px",
        }, {
          a: "top:0px; left:0px",
          b: "top:-30px; left:0px",
          c: "top:0px; left:30px",
          d: "top:30px; left:30px",
        }],
        rightL: [{
          a: "top:-30px; left:30px",
          b: "top:0px; left:30px",
          c: "top:0px; left:0px",
          d: "top:0px; left:-30px",
        }, {
          a: "top:-30px; left:0px",
          b: "top:30px; left:0px",
          c: "top:0px; left:0px",
          d: "top:30px; left:30px",
        }, {
          a: "top:0px; left:30px",
          b: "top:0px; left:-30px",
          c: "top:0px; left:0px",
          d: "top:30px; left:-30px",
        }, {
          a: "top:-30px; left:0px",
          b: "top:-30px; left:-30px",
          c: "top:0px; left:0px",
          d: "top:30px; left:0px",
        }],
        leftL: [{
          a: "top:-30px; left:-30px",
          b: "top:0px; left:-30px",
          c: "top:0px; left:0px",
          d: "top:0px; left:30px",
        }, {
          a: "top:-30px; left:0px",
          b: "top:-30px; left:30px",
          c: "top:0px; left:0px",
          d: "top:30px; left:0px",
        }, {
          a: "top:0px; left:-30px",
          b: "top:0px; left:30px",
          c: "top:0px; left:0px",
          d: "top:30px; left:30px",
        }, {
          a: "top:-30px; left:0px",
          b: "top:30px; left:0px",
          c: "top:0px; left:0px",
          d: "top:30px; left:-30px",
        }],

      }
    };
    this.funcs = {};
    this.funcs.setInitialPos = this.setInitialPos.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keypressHandler.bind(this));
    this.setState({ nextBlock: this.randomBlock() }, this.addBlock.bind(this));
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

    if (e.keyCode === 37) left -= 30;
    else if (e.keyCode === 39) left += 30;
    else if (e.keyCode === 40) top += 30;
    else if (e.keyCode === 38) {
      this.turn();
    }

    if (!this.checkCollision(left, top))
      this.state.elem.setAttribute("style", "top: " + top + "px; left: " + left + "px");
  }

  turn() {
    let className = this.state.elem.className;
    let children = [...this.state.elem.children];
    //increment currBlockState
    const currBlockState = this.state.currBlockState + 1 === this.state.blockStates[className].length ? 0 : this.state.currBlockState + 1;
    //set block styles by accessing corresponding blockStates with the className
    children.forEach((child) => {
      child.setAttribute("style", this.state.blockStates[className][currBlockState][child.className.slice(-1)]);
    })
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
      this.addBlock();
    }
  }

  addBlock() {
    let temp = [...this.state.renderedBlocks];
    const id = this.state.id + 1;

    temp.push(React.cloneElement(this.state.nextBlock, { id, funcs: this.funcs, key: id, inGame: true }));
    this.setState({ renderedBlocks: temp, id, nextBlock: this.randomBlock() }, this.timer.bind(this, id));
  }

  checkCollision(left, top) {
    const children = [...this.state.elem.children];

    // children.forEach((child, i) => {
    // });
    if (left === 0 || left === 390 || top > 330) { return true; }
    return false;

    //get all block positions of current block
    //compare to all positions
    //also check if there are complete rows

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
