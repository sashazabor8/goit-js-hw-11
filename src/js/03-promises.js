import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = { 
    delay: document.querySelector('input[name="delay"]'),
    step: document.querySelector('input[name="step"]'),
    amount: document.querySelector('input[name="amount"]'),
    form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
    event.preventDefault() 
    const firstDelay = parseInt(refs.delay.value);
    const stepDelay = parseInt(refs.step.value);
    const amountPromises = parseInt(refs.amount.value);

    addPromisesOnForm(firstDelay,stepDelay,amountPromises);
}

function addPromisesOnForm(delay, step, amount) {
    let numberPromise = 0;

    for (let i = 0; i < amount; i++) {
        if (i > 0) delay += step;
        
        numberPromise +=1;
        createPromise(numberPromise,delay).then(({position, delay})=> {
            Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        }).catch(({position, delay})=> {
            Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        })
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    
    return new Promise((resolve,reject)=> {
        setTimeout(()=>{
            if (shouldResolve) {
                resolve({position, delay})
            } else {
              reject({position, delay})
            }
        },delay)
        
    })
    
}

