//! Напиши скрипт, который после нажатия кнопки «Start», 
//! раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. 
//! При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
//* рефы элементов и глобальные переменные
const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

// let itWorkColorSwitcher = false;
// let intervalId = null;


//* деструктуризация 
const {body, startBtn, stopBtn} = refs;

//* повесли слушателя на СТАРТ и СТОП
// startBtn.addEventListener('click', onStartBtnClick)
// stopBtn.addEventListener('click', onStopBtnClick)

//* функция которая срабатывает на клике по СТАРТ
// function onStartBtnClick () {
//     if (itWorkColorSwitcher) return
//     itWorkColorSwitcher = true;
//     intervalId = setInterval(()=> {
//     body.style.backgroundColor = `${getRandomHexColor()}`
// },1000)
// }

//* функция которая срабатывает на клике по CТОП
// function onStopBtnClick () {
//     clearInterval(intervalId);
//     itWorkColorSwitcher = false;
// }

//* функция генеранции случайного цвета через HEX
// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
//   }

//? Реализую тоже самое через классы и методы класса 

class SwitchingRandomColor {
    constructor (targetEl) {
        this.itWorkColorSwitcher = false;
        this.intervalId = null;
        this.targetEl = targetEl
    }

    startSwitchingBgc() {
        if (this.itWorkColorSwitcher) return
        this.itWorkColorSwitcher = true;
        this.intervalId = setInterval(()=> {
        this.targetEl.style.backgroundColor = `${this.getRandomHexColor()}`;
},1000)
    }

    startSwitchingColor() {
        if (this.itWorkColorSwitcher) return
        this.itWorkColorSwitcher = true;
        this.intervalId = setInterval(()=> {
        this.targetEl.style.color = `${this.getRandomHexColor()}`;
},1000)
    }

    stopSwitchig() {
        clearInterval(this.intervalId);
        this.itWorkColorSwitcher = false;
    }

    getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
      }
}

const bodySwitchRandomColor = new SwitchingRandomColor(body)

startBtn.addEventListener('click', bodySwitchRandomColor.startSwitchingBgc.bind(bodySwitchRandomColor))
stopBtn.addEventListener('click', bodySwitchRandomColor.stopSwitchig.bind(bodySwitchRandomColor))



