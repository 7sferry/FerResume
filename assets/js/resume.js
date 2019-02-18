/**
 * Created by SIKUMBANG on 28/03/2017.
 */

const words = $('.word');
let wordArray = [];
let currentWord = 0;
words[currentWord].style.opacity = 1;

const bubbleLifeTime = 3;
const noOfBubbles = 15;
const wrapper = document.querySelector('h1');

$(function() {
    smoothScroll(2000);
    sertifikat(7000);
    $("header h1").fitText(1, {minFontSize: '10px', maxFontSize: '72px'});
    $(".email").fitText(1.5);
    autobio(7000);
    bio();
    AOS.init({
        duration: 750
    });
    initBubbles();
    for(const word of words) {
        splitLetters(word);
    }
    setInterval(changeWord, 3000);
    swiping();
    if(!!window.styleMedia) $("header").css("background-attachment","unset");
});

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
    $('a[href^="#"]').on('click', function(event) {

        let target = $($(this).attr('href'));

        if(target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

function sertifikat(durasi) {
    $('.isi-layar').first().addClass('logo-aktif');
    $('.ikon-doc').first().addClass('logo-aktif');
    $('.tombol').first().addClass('logo-aktif');

    let autosertifikat = runsertifikat(durasi);
    $('.ikon-doc, .tombol').click(function() {
        autosertifikat.stop();
        autosertifikat.start();
        let $saudara = $(this).parent().children();
        let $posisi = $saudara.index($(this));

        $('.isi-layar').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
        $('.tombol').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
        $('.ikon-doc').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
    });
}

function runsertifikat(durasi) {
    return new Timer(function() {
        let logoygaktif = $('.layar').find('.logo-aktif'),
            posisi = $('.layar').children().index(logoygaktif),
            jumlahlogo = $('.isi-layar').length;
        if(posisi == jumlahlogo - 1) {
            $('.isi-layar').removeClass('logo-aktif').first().addClass('logo-aktif');
            $('.ikon-doc').removeClass('logo-aktif').first().addClass('logo-aktif');
            $('.tombol').removeClass('logo-aktif').first().addClass('logo-aktif');
        } else {
            $('.logo-aktif').removeClass('logo-aktif').next().addClass('logo-aktif');

        }
    }, durasi);
}

function bio() {
    $('.isi-bio').first().addClass('bio-aktif');
}

function autobio(durasi) {
    setInterval(function() {
        let logoygaktif = $('.bio').find('.bio-aktif'),
            posisi = $('.bio').children().index(logoygaktif),
            jumlahlogo = $('.isi-bio').length;
        if(posisi == jumlahlogo - 1) {
            $('.isi-bio').removeClass('bio-aktif').first().addClass('bio-aktif');
        } else {
            $('.bio-aktif').removeClass('bio-aktif').next().addClass('bio-aktif');

        }
    }, durasi);
}

(function($) {

    $.fn.fitText = function(kompressor, options) {

        // Setup options
        let compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize': Number.NEGATIVE_INFINITY,
                'maxFontSize': Number.POSITIVE_INFINITY
            }, options);

        return this.each(function() {

            // Store the object
            let $this = $(this);

            // Resizer() resizes items based on the object width divided by the compressor * 10
            let resizer = function() {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fittext orientationchange.fittext', resizer);

        });

    };

})(jQuery);

function togglemenu() {
    let menu = document.getElementById('navigasi');
    menu.classList.toggle('menu-hp');
}

function Timer(fn, t) {
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
    let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for(let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for(let i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
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
            let year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
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
