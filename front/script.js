/* Scrollbar */
const scrollProgressEle =  document.querySelector("#scroll-progress")

function scrollProgress(){
    const heightOfPage = document.body.scrollHeight;
    const currrentDistanceFromTop = document.documentElement.scrollTop; /* + window.innerHeight */ 

    const windowHeight = document.documentElement.clientHeight;

    const scrollPercent = (currrentDistanceFromTop / (heightOfPage - windowHeight)) * 100;

    scrollProgressEle.style.width = `${scrollPercent}%`;
}

document.addEventListener('scroll',scrollProgress);

/* Tecario / Name Header placement and text size */
const headTextSize = document.getElementById("TecarioHeaderInner")

const originalHeader = document.getElementById("TecarioHeaderInner");
const originalHeaderStyle = window.getComputedStyle(originalHeader).getPropertyValue('font-size');
const originalWidthOfPage = document.documentElement.clientWidth;
const textWidthRatio = (parseFloat(originalHeaderStyle)/1600);

function setTecarioSize(){
    const initialWidth = document.documentElement.clientWidth;
    const intialSize = Math.round(initialWidth * textWidthRatio);
    headTextSize.style.fontSize = `${intialSize}px`;
}

function TecarioPositioing(){
    const halfHeight = screen.height/6
    headTextSize.style.marginTop = `${halfHeight}px`;
    headTextSize.style.marginBottom = `${halfHeight}px`;
}

function tecTextResize(){
    const currentWidthofPage = document.documentElement.clientWidth;
    const newTextSize = Math.round(currentWidthofPage * textWidthRatio);
    headTextSize.style.fontSize = `${newTextSize}px`;
}

window.addEventListener('resize', tecTextResize);
window.addEventListener('load', setTecarioSize);
window.addEventListener('load', TecarioPositioing);

/* EXPERIENCE HEIGHT ADJUST AND OPACITY FADE */
function expHeightAdjust(){
    const divheight = document.getElementById("expouterbox").offsetHeight;
    const expdivbg = document.getElementById("expdivbackground")
    expdivbg.style.height = `${divheight}px`;
}
window.addEventListener('load', expHeightAdjust);
window.addEventListener('resize', expHeightAdjust);

function expOpacityFadeInOut(){
    const expDivBackground = document.getElementById("expdivbackground");
    const expDivBackgroundActual = document.getElementById("expdivbackgroundACTUAL");
    const boundingClientRect = expdivbackground.getBoundingClientRect(); /* boundreact ele */
    const boundingTop = boundingClientRect.top; /* top measurement */
    const boundingBot = boundingClientRect.bottom; /* bot measurement */
    const expDivBackgroundHeight = expDivBackground.offsetHeight; /* divheight */
    const clientHeight = document.documentElement.clientHeight; /* page height */
    var opacity = 0;
    if (boundingTop < clientHeight/2 && boundingBot > clientHeight/1.75){
        opacity = 1 - (boundingTop / (clientHeight/2));
        console.log("IN")
    }else if (boundingBot < clientHeight/1.25){
        opacity = boundingBot / (clientHeight/2);
        console.log("OUT")
    }else {
        opacity = 0;
    }
    expDivBackgroundActual.style.opacity = `${opacity}`;
}
/* use thee function from magneetic to find lower height and upper hegiht to adjust for height above */

window.addEventListener('scroll', expOpacityFadeInOut)
window.addEventListener('load', expOpacityFadeInOut)


/*  Text scramble section */
class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 50) // change these to update time
        const end = start + Math.floor(Math.random() * 75)
        this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
            complete++
            output += to
        } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {// change char speed
            char = this.randomChar()
            this.queue[i].char = char
            }
            output += `<span class="dud">${char}</span>`
        } else {
            output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
        this.resolve()
        } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
        }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

const phrases = [
    'Tecario',
    'John Ho',]

    const scramble = document.querySelector('.TecarioHeaderInner')
    const fx = new TextScramble(scramble)

    let counter = 0
    const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2500)
    })
    counter = (counter + 1) % phrases.length
}

next()



/* scroll hidden animation */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

        } else {
            entry.target.classList.remove("show");
        }
    });

});


const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach(element => observer.observe(element));



//Magnetic Buttons Magnetic Buttons Magnetic Buttons Magnetic Buttons 

    //Utility
const lerp = (current, target, factor) => {
    return current * (1 - factor) + target * factor;
}

let mousePosition = {x: 0, y: 0};
window.addEventListener("mousemove",(event) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});

const calculateDistance = (x1,y1,x2,y2) => {
    return Math.hypot(x1 - x2, y1 - y2);
}

class MagneticObject {
    constructor(domElement) {
        this.domElement = domElement;
        this.boundingClientRect = domElement.getBoundingClientRect();
        this.triggerArea = 125; /* play around with this */
        this.interpolationFactor = 0.8; /* play around with this */

        this.lerpingData = {
            x: {current: 0, target: 0},
            y: {current: 0, target: 0},
        };
        this.resize();
        this.render();
    }

    resize() {
        window.addEventListener("resize", (event) => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        });
        window.addEventListener("scroll", (event) => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        });
        
    }

    render() {
        const distanceFromMouseToCenter = calculateDistance(
            mousePosition.x,
            mousePosition.y,
            this.boundingClientRect.left + this.boundingClientRect.width / 2,
            this.boundingClientRect.top + this.boundingClientRect.height / 2
        );

        let targetHolder = {x: 0, y: 0};

        if (distanceFromMouseToCenter < this.triggerArea) {
            this.domElement.classList.add("focus");
            targetHolder.x = (mousePosition.x - 
                (this.boundingClientRect.left + this.boundingClientRect.width / 2)) * 0.3;
            targetHolder.y = (mousePosition.y - 
                (this.boundingClientRect.top + this.boundingClientRect.height / 2)) * 0.3;
        } else {
            this.domElement.classList.remove("focus")
        }
        this.lerpingData["x"].target = targetHolder.x;
        this.lerpingData["y"].target = targetHolder.y;

        for (const item in this.lerpingData) {
            this.lerpingData[item].current = lerp(
                this.lerpingData[item].current,
                this.lerpingData[item].target,
                this.interpolationFactor
            );
        }
        this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;
        window.requestAnimationFrame(() => this.render());
    }
}



class MagneticContact {
    constructor(domElement) {
        this.domElement = domElement;
        this.boundingClientRect = domElement.getBoundingClientRect();
        this.triggerArea = 50; /* play around with this */
        this.interpolationFactor = 0.3; /* play around with this */

        this.lerpingData = {
            x: {current: 0, target: 0},
            y: {current: 0, target: 0},
        };
        this.resize();
        this.render();
    }

    resize() {
        window.addEventListener("resize", (event) => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        });
        window.addEventListener("scroll", (event) => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        });
        
    }

    render() {
        const distanceFromMouseToCenter = calculateDistance(
            mousePosition.x,
            mousePosition.y,
            this.boundingClientRect.left + this.boundingClientRect.width / 2,
            this.boundingClientRect.top + this.boundingClientRect.height / 2
        );

        let targetHolder = {x: 0, y: 0};

        if (distanceFromMouseToCenter < this.triggerArea) {
            targetHolder.x = (mousePosition.x - 
                (this.boundingClientRect.left + this.boundingClientRect.width / 2)) * 0.2;
            targetHolder.y = (mousePosition.y - 
                (this.boundingClientRect.top + this.boundingClientRect.height / 2)) * 0.2;
        }
        this.lerpingData["x"].target = targetHolder.x;
        this.lerpingData["y"].target = targetHolder.y;

        for (const item in this.lerpingData) {
            this.lerpingData[item].current = lerp(
                this.lerpingData[item].current,
                this.lerpingData[item].target,
                this.interpolationFactor
            );
        }
        this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;
        window.requestAnimationFrame(() => this.render());
    }
}

document.querySelectorAll(".MagenticButtonContact").forEach(element => {
    new MagneticContact(element);
});

document.querySelectorAll(".call-to-action-btn").forEach(element => {
        new MagneticObject(element);
    });
//contact form

const fullName = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const contactForm = document.getElementById('contact-form');
const errorElement = document.getElementById('error');
const successMsg = document.getElementById('success-msg');
const submitBtn = document.getElementById('submit');

const validate = (e) => {
    e.preventDefault()
    if (fullName.value.length < 3) {
        errorElement.innerHTML = 'Your name should be at least 3 characters long.';
        return false;
    } 
    
    if (!(email.value.includes('.') && (email.value.includes('@')))) {
        errorElement.innerHTML = 'Please enter a valid email address.';
        return false;
    } 

    if (!emailIsValid(email.value)) {
        errorElement.innerHTML = 'Please enter a valid email address.';
        return false;
    }

    if (message.value.length < 15) {
        errorElement.innerHTML = 'Please write a longer message.';
        return false;
    }

    errorElement.innerHTML = '';
    successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.';

    setTimeout(function () {
        successMsg.innerHTML = '';
        document.getElementById('contact-form').reset();
    }, 15000);

    return true;
}

const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const backupBtn = document.getElementById('backupbtn')
submitBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    if (validate(e)) {
        sendMail();
    } else {
        return null;
    }
    const backupText = document.getElementById('backuptext');
    const sendBtn = document.getElementById('submit');
    const elements = [backupBtn, backupText]
    for (const e of elements) {
        e.classList.add('showcontactbtn');
        e.classList.remove('hidecontactbtn');
    }
    sendBtn.classList.add('hidecontactbtn');

    setTimeout(() => {
        for (const e of elements) {
            e.classList.remove('showcontactbtn');
            e.classList.add('hidecontactbtn');
        }
        sendBtn.classList.remove('hidecontactbtn');
    }, 15000);
});

function sendMail() {
    const userName = fullName.value;
    const userEmail = email.value;
    const userMessage = message.value;

    const data = {
        name: userName,
        fromEmail: userEmail,
        message: userMessage
    };

    fetch('https://email-forwarding-6hd5.onrender.com/send-email', { // change this into actual url when done
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('information sent to backend', data);
    })
    .catch((error) => {
        console.error('front-backend sending error:', error);
    });
    
}