
/**
 * Created by SIKUMBANG on 28/03/2017.
 */
$(function() {
    smoothScroll(2000);
    sertifikat(7000);
    $("header h1").fitText(1, { minFontSize: '10px', maxFontSize: '72px' });
    $(".email").fitText(1.5);
    autobio(7000);
    bio();
    AOS.init({
        duration: 750
    });
    initBubbles();
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }
    setInterval(changeWord, 3000);
    swiping();
});

var bubbleLifeTime = 3;
var noOfBubbles = 15;

var wrapper = document.querySelector('h1');


function initBubbles() {
    var bubble;
    for(var i = 0; i < noOfBubbles; i++) {
        bubble = createBubble();
        wrapper.appendChild(bubble);
    }
}

function createBubble() {
    var circleContainer = document.createElement('div');
    circleContainer.classList.add('circle_container');
    circleContainer.style.transform = "rotate(" + (Math.floor(Math.random() * (270 - 90) ) + 90) + "deg)";

    var circle = createCircle();
    circleContainer.appendChild(circle);

    return circleContainer;
}

function createCircle() {
    var circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.animationDelay = (Math.random() * bubbleLifeTime) + 's';

    var side = (20 + Math.floor(Math.random() * 5)) + 'px';
    circle.style.width = side;
    circle.style.height = side;

    return circle;
}

function smoothScroll (duration) {
    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href') );

        if( target.length ) {
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

    $('.ikon-doc, .tombol').click(function () {
      autosertifikat(durasi).stop();
      autosertifikat(durasi).start();
        var $saudara = $(this).parent().children(),
            $posisi = $saudara.index($(this));

        $('.isi-layar').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
        $('.tombol').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
        $('.ikon-doc').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
    });
}

function autosertifikat(durasi) {
  return new Timer(function () {
        var logoygaktif = $('.layar').find('.logo-aktif'),
            posisi = $('.layar').children().index(logoygaktif),
            jumlahlogo = $('.isi-layar').length;
        if(posisi == jumlahlogo -1) {
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
    setInterval(function () {
        var logoygaktif = $('.bio').find('.bio-aktif'),
            posisi = $('.bio').children().index(logoygaktif),
            jumlahlogo = $('.isi-bio').length;
        if(posisi == jumlahlogo -1) {
            $('.isi-bio').removeClass('bio-aktif').first().addClass('bio-aktif');
        } else {
            $('.bio-aktif').removeClass('bio-aktif').next().addClass('bio-aktif');

        }
    }, durasi);
}

(function( $ ){

    $.fn.fitText = function( kompressor, options ) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize' : Number.NEGATIVE_INFINITY,
                'maxFontSize' : Number.POSITIVE_INFINITY
            }, options);

        return this.each(function(){

            // Store the object
            var $this = $(this);

            // Resizer() resizes items based on the object width divided by the compressor * 10
            var resizer = function () {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fittext orientationchange.fittext', resizer);

        });

    };

})( jQuery );

function togglemenu() {
    var menu = document.getElementById('navigasi');
    menu.classList.toggle('menu-hp');
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}

var words = $('.word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;

function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
    setTimeout(function() {
        cw[i].className = 'letter out';
    }, i*80);
}

function animateLetterIn(nw, i) {
    setTimeout(function() {
        nw[i].className = 'letter in';
    }, 340+(i*80));
}

function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
}

function swiping() {

    return new Swiper ('.timeline .swiper-container', {
        direction: 'vertical',
        loop: false,
        speed: 1600,
        pagination: '.swiper-pagination',
        paginationBulletRender: function (swiper, index, className) {
            var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
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
