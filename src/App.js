import React, { Component } from "react";
import Sketch from "react-p5";

// Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw

// variables: A B
// axiom: A
// rules: (A → AB), (B → A)

let angle = 60; //(60 * Math.PI) / 180; // угол
let axiom = "F++F++F"; // аксиома
let sentence = ""; // первая точка построения
let len = 100; // длинна сегмента
let iteration = 3; // итерации
let strw = 5; // толщина линии
let strc = "gray"; // цвет линии
let rules = []; // массив правил
rules[0] = {
  a: "F",
  b: "F-F++F-F",
};

export default class App extends Component {
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.frameRate(this.fr);
    p5.angleMode(p5.DEGREES);
    p5.background(200);
    p5.createCanvas(window.innerWidth, window.innerHeight - 200).parent(
      canvasParentRef
    );

    // AXIOM on SCREEN
    //p5.createP(axiom);

    p5.noLoop();

    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };

  draw = (p5) => {
    const turtle = () => {
      p5.background(200);
      p5.resetMatrix();
      p5.translate(p5.width / 2, p5.height / 1.3);
      p5.stroke(strc);
      p5.strokeWeight(strw);

      for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        if (current === "F") {
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        } else if (current === "+") {
          p5.rotate(angle);
        } else if (current === "-") {
          p5.rotate(-angle);
        } else if (current === "[") {
          p5.push();
        } else if (current === "]") {
          p5.pop();
        }
      }
    };

    // generate sentence for tree

    const generate = () => {
      len *= 0.1; // модификатор на длинну сегмента на рендер

      //0 итерация "F++F++F";
      //1 итерация 'F-F++F-F++F-F++F-F++F-F++F-F'
      //2 итерация 'F-F++F-F-F-F++F-F++F-F++F-F-F-F++F-F++F-F++F-F-F-F++F-F++F-F++F-F-F-F++F-F++F-F++F-F-F-F++F-F++F-F++F-F-F-F++F-F'
      //F-F++F-F

      let nextSentence = "";
      let iteration = 9;
      let temp = axiom; //что перебираем
      let temp_sent = ""; //темп формулы дерева

      for (let k = 0; k < iteration; k++) {
        for (let i = 0; i < temp.length; i++) {
          let ch = temp.charAt(i);
          if (ch === "F") {
            //found = true;
            temp_sent += "F-F++F-F"; //F-F++F-F
          } else {
            temp_sent += ch;
          }
        }
        temp = temp_sent;

        p5.createP("iteration:" + k + " temp:" + temp);
      }
      sentence = temp;

      //turtle();
    };
    //iterations
    // noprotect
    //for (let i = 0; i < iteration; i++) {
    //  generate();
    //}
    generate();
    turtle();
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}
