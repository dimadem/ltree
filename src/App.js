import React, { Component } from "react";
import Sketch from "react-p5";

// Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw

//TODO
//1 Сделать, чтобы масштаб можно было или задавать, или центрировать, чтобы не слетала картинка в облака
//2 Сделать разные цвета на разных итерациях
//3 Добавить разбор кошелька в алгоритм

//4 Придумать соответствие char кошелька к правилу (какие char на какую отрисовку - ветки, листья, разветвления)
//5 Разбить итерация ==> char и так свое разбиение на уровень
//6 Углы по char выбор соответствия
//7 рандомайз по углу в секторе 

let angle = 0; //(60 * Math.PI) / 180; // угол
let axiom = ""; // аксиома
let sentence = ""; // первая точка построения
let len = 100; // длинна сегмента
let iteration = 3; // итерации
let strw = 5; // толщина линии
let strc = "gray"; // цвет линии
let rules = []; // массив правил
rules[0] = {
  a: "",
  b: "",
};
let mod = 0.03; //модификатор масштаба

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
        } 
        if (current === "L") {
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        } 
        if (current === "R") {
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        } 
        if (current === "A") {
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        } 
        if (current === "B") {
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        } 
        else if (current === "+") {
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

      /*//снежинка
      angle = 60; 
      axiom = "F++F++F"; 
      rules[0] = {
        a: "F",
        b: "F-F++F-F",
      };
      iteration = 5;*/

      /*//Серпинский
      angle = 60; 
      axiom = "A"; 
      rules[0] = {
        a: "A",
        b: "B-A-B"
      };
      rules[1] = {
        a: "B",
        b: "A+B+A"
      };
      mod = 0.025;
      iteration = 8;*/


     /* //дракон
      angle = 90; 
      axiom = "FX"; 
      rules[0] = {
        a: "X",
        b: "X+YF"
      };
      rules[1] = {
        a: "Y",
        b: "FX-Y"
      };
      mod = 0.03;
      iteration = 14;
      */

      //побеги
      angle = 50; 
      axiom = "X"; 
      rules[0] = {
        a: "F",
        b: "FF"
      };
      rules[1] = {
        a: "X",
        b: "F[+X]F[-X]+X"
      };
      
      mod = 0.03;
      iteration = 7;

      len *= mod; // модификатор на длинну сегмента на рендер

      let nextSentence = "";      
      let temp = axiom; //что перебираем
      let temp_sent = ""; //темп формулы дерева

      for (let k = 0; k < iteration; k++) {
            temp_sent = "";
            for (let i = 0; i < temp.length; i++) {
                let ch = temp.charAt(i);
                var checked = false;
                //если ни одно из правил не подошло
                for (let j = 0; j < rules.length; j++) {
                    if (ch === rules[j].a) {
                      temp_sent += rules[j].b; 
                      checked = true;
                      break;
                    } 
                }
                //переносим символ из аксиомы
                if (checked == false) {
                    temp_sent += ch;
                }
            }
        //перекладываем
        temp = temp_sent;

        //p5.createP("iteration:" + k + " temp:" + temp);
      }
      //готовая формула дерева
      sentence = temp;

      turtle();
    };
    generate();    
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}
