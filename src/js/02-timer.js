import { Notify } from 'notiflix/build/notiflix-notify-aio';
console.log(Notify);
import flatpickr from "flatpickr"; 
import 'flatpickr/dist/flatpickr.min.css';

//* refs 
const refs = {
    button: document.querySelector('button'),
    seconds: document.querySelector('span[data-seconds]'),
    minutes: document.querySelector('span[data-minutes'),
    hours: document.querySelector('span[data-hours]'),
    days: document.querySelector('span[data-days]')
}

//* необходимые переменные  
let currentTime = null;
let intervalId = null;
const ZERO_TIMER_VALUE = '00';

//* добавляю неактивность кнопки start
refs.button.setAttribute('disabled',true)

//* Объект настроек для flatpicker
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {

            Notify.failure('Please choose a date in the future',notifyOptions);

            if(!refs.button.getAttribute('disabled')) {
                refs.button.setAttribute('disabled',true)
            }
            return
        }
        Notify.success('Selected date is correct',notifyOptions);

        refs.button.removeAttribute('disabled');
        refs.button.style.transform ='scale(1.1)';

        userTime = selectedDates[0].getTime(); 
        currentTime = Date.now();
    },
  };

//* Объект настроек для notiflix
const notifyOptions = {
    width: '400px',
    clickToClose: true,
    fontSize: '18px'
    
}

//* инициализация flatpicker на input 
flatpickr('input[type="text"]',options);

//* добавляю слушатель событий на start 
refs.button.addEventListener('click', onButtonStartClick)

//* колбек для события клика по кнопке старт 
function onButtonStartClick () {
    let leftPromotionTime = userTime - currentTime;
    
    intervalId = setInterval(()=>{
        
         leftPromotionTime -= 1000;
         createTimerValue(convertMs(leftPromotionTime));
    },1000)

}

//* функция обновление интерфейса таймера на странице 
function createTimerValue ({ days, hours, minutes, seconds }) {
    if (seconds === ZERO_TIMER_VALUE && 
        minutes === ZERO_TIMER_VALUE &&
        hours === ZERO_TIMER_VALUE &&
        days === ZERO_TIMER_VALUE) {
            clearInterval(intervalId)
        }
    
    refs.seconds.textContent = seconds;
    refs.minutes.textContent = minutes;
    refs.hours.textContent = hours;
    refs.days.textContent = days;
    
}
//* функция для конвертации миллисекунд в количество дней, часов, минут, секунд
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

      //* пишу ф-цию, которая принимает число 
//* Приводит к строке
//* И добавляет в начало 0 если число меньше 2-х знаков
function  pad (value) {
    return String(value).padStart(2, '0')
}

