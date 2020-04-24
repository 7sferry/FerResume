/**
 * Created by SIKUMBANG on 28/03/2017.
 */

function __(el){
    return document.querySelectorAll(el);
}

function _(el){
    return document.querySelector(el);
}

const words = __('.word');
let wordArray = [];
let currentWord = 0;
words[currentWord].style.opacity = '1';

const bubbleLifeTime = 3;
const noOfBubbles = 15;
const wrapper = _('h1');

window.onload = function() {
    smoothScroll(250);
    activateCertificateSlider(7000);
    window.fitText(__("h1"), 1);
    window.fitText(__(".email"), 1.5);
    runAutoBio(7000);
    setBio();
    AOS.init({
        duration: 750
    });
    initBubbles();
    for(const word of words) {
        splitLetters(word);
    }
    setInterval(changeWord, 3000);
    swiping();
    if(!!window.styleMedia) _("header").style.backgroundAttachment = "unset";
};

function initBubbles() {
    let bubble;
    for(let i = 0; i < noOfBubbles; i++) {
        bubble = createBubble();
        wrapper.appendChild(bubble);
    }
}

function createBubble() {
    let circleContainer = document.createElement('div');
    circleContainer.classList.add('circle_container');
    circleContainer.style.transform = "rotate(" + (Math.floor(Math.random() * (270 - 90)) + 90) + "deg)";

    let circle = createCircle();
    circleContainer.appendChild(circle);

    return circleContainer;
}

function createCircle() {
    let circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.animationDelay = (Math.random() * bubbleLifeTime) + 's';

    let side = (20 + Math.floor(Math.random() * 5)) + 'px';
    circle.style.width = side;
    circle.style.height = side;

    return circle;
}

function smoothScroll(duration) {
    __('a[href^="#"]').forEach(button => button.onclick = function(event) {
        let target = _(this.getAttribute('href'));
        if(target) {
            event.preventDefault();
            animate(document.scrollingElement || document.documentElement, "scrollTop", "", window.scrollY,
                target.offsetTop, duration, true);
        }
    });
}
function animate(elem, style, unit, from, to, time, prop) {
    if (!elem) {
        return;
    }
    const start = new Date().getTime(),
        timer = setInterval(function () {
            const step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from))+unit;
            } else {
                elem.style[style] = (from + step * (to - from))+unit;
            }
            if (step === 1) {
                clearInterval(timer);
            }
        }, 25);
    if (prop) {
        elem[style] = from+unit;
    } else {
        elem.style[style] = from+unit;
    }
}

function activateCertificateSlider(durasi) {
    setActiveClass(__('.isi-layar')[0]);
    setActiveClass(__('.ikon-doc')[0]);
    setActiveClass(__('.tombol')[0]);

    let autosertifikat = runCertificate(durasi);
    __('.ikon-doc, .tombol').forEach(el => el.onclick = function() {
        autosertifikat.stop();
        autosertifikat.start();
        let pos = getIndexElement(el);

        changeActiveClass('.isi-layar', pos);
        changeActiveClass('.tombol', pos);
        changeActiveClass('.ikon-doc', pos);
    });
}

function getIndexElement(child){
    let i = 0;
    while( (child = child.previousElementSibling) != null ) i++;
    return i;
}

function setActiveClass(element){
    setActiveElement(element, "logo-aktif");
}

function setActiveElement(element, name){
    let arr;
    arr = element.className.split(" ");
    if (arr.indexOf(name) === -1) {
        element.className += " " + name;
    }
}

function changeActiveClass(el, pos) {
    changeActiveElement(el, pos, "logo-aktif")
}

function changeActiveElement(el, pos, name) {
    let elements = __(el);
    elements.forEach(element => element.className = element.className.replace(new RegExp("\\b"+name+"\\b","g"), ""));
    setActiveElement(elements[pos], name);
}

function runCertificate(durasi) {
    return new setTimer(function() {
        let logoygaktif = __('.layar')[0].querySelector('.logo-aktif'),
            posisi = getIndexElement(logoygaktif),
            jumlahlogo = __('.isi-layar').length;
        if(posisi === jumlahlogo - 1) {
            changeActiveClass('.isi-layar', 0);
            changeActiveClass('.ikon-doc', 0);
            changeActiveClass('.tombol', 0);
        } else {
            changeActiveClass('.isi-layar', posisi + 1);
            changeActiveClass('.ikon-doc', posisi + 1);
            changeActiveClass('.tombol', posisi + 1);
        }
    }, durasi);
}

function setBio() {
    setActiveElement(__('.isi-bio')[0], 'bio-aktif');
}

function runAutoBio(durasi) {
    setInterval(function() {
        let logoygaktif = __('.setBio')[0].querySelector('.bio-aktif'),
            posisi = getIndexElement(logoygaktif),
            jumlahlogo = __('.isi-bio').length;
        if(posisi === jumlahlogo - 1) {
            changeActiveElement('.isi-bio', 0, 'bio-aktif');
        } else {
            changeActiveElement('.isi-bio', posisi + 1, 'bio-aktif');
        }
    }, durasi);
}

function toggleMenu() {
    let menu = _('#navigasi');
    menu.classList.toggle('menu-hp');
}

function setTimer(fn, t) {
    let timerObj = setInterval(fn, t);

    this.stop = function() {
        if(timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    };

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if(!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    };

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}

function changeWord() {
    let cw = wordArray[currentWord];
    let nw = currentWord === words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for(let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for(let i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord === wordArray.length - 1) ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
    setTimeout(function() {
        cw[i].className = 'letter out';
    }, i * 80);
}

function animateLetterIn(nw, i) {
    setTimeout(function() {
        nw[i].className = 'letter in';
    }, 340 + (i * 80));
}

function splitLetters(word) {
    let content = word.innerHTML;
    word.innerHTML = '';
    let letters = [];
    for(let i = 0; i < content.length; i++) {
        let letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
}

function swiping() {

    return new Swiper('.timeline .swiper-container', {
        autoplay: true,
        autoplayDisableOnInteraction: false,
        direction: 'vertical',
        loop: false,
        speed: 1600,
        pagination: '.swiper-pagination',
        paginationBulletRender: function(swiper, index, className) {
            let year = __('.swiper-slide')[index].getAttribute('data-year');
            return '<span class="' + className + '">' + year + '</span>';
        },
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
            768: {
                direction: 'horizontal',
            }
        }
    });
}
