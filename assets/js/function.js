
/**
 * Created by SIKUMBANG on 28/03/2017.
 */
$(function() {
    smoothScroll(2000);
    sertifikat();
    // autosertifikat(5000);
    $("header h1").fitText(1, { minFontSize: '10px', maxFontSize: '72px' });
    $(".email").fitText(1.5);
    autobio(7000);
    bio();
    AOS.init({
        duration: 1500
    })
});


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

function sertifikat() {
    $('.isi-layar').first().addClass('logo-aktif');
    $('.ikon-doc').first().addClass('logo-aktif');
    $('.tombol').first().addClass('logo-aktif');

    $('.ikon-doc, .tombol').click(function () {
      autosertifikat.stop();
      autosertifikat.start();
        var $saudara = $(this).parent().children(),
            $posisi = $saudara.index($(this));

        $('.isi-layar').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
        $('.tombol').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
        $('.ikon-doc').removeClass('logo-aktif').eq($posisi).addClass('logo-aktif');
    });
}

// function autosertifikat(durasi) {
    // $('.next, .prev').click
  var autosertifikat = new Timer(function () {
        var logoygaktif = $('.layar').find('.logo-aktif'),
            posisi = $('.layar').children().index(logoygaktif),
            jumlahlogo = $('.isi-layar').length;
        // console.log(posisi, jumlahlogo);

        // if($(this).hasClass('next')) {
        if(posisi == jumlahlogo -1) {
            $('.isi-layar').removeClass('logo-aktif').first().addClass('logo-aktif');
            $('.ikon-doc').removeClass('logo-aktif').first().addClass('logo-aktif');
            $('.tombol').removeClass('logo-aktif').first().addClass('logo-aktif');
        } else {
            $('.logo-aktif').removeClass('logo-aktif').next().addClass('logo-aktif');

        }
        // } else {
        //     if(posisi === 0){
        //
        //         $('.isi-layar').removeClass('logo-aktif').last().addClass('logo-aktif');
        //         $('.ikon-doc').removeClass('logo-aktif').last().addClass('logo-aktif');
        //     } else {
        //
        //         $('.logo-aktif').removeClass('logo-aktif').prev().addClass('logo-aktif');
        //     }
        // }
    }, 7000);
// }

function bio() {
    $('.isi-bio').first().addClass('bio-aktif');
}

function autobio(durasi) {
    setInterval(function () {
        var logoygaktif = $('.bio').find('.bio-aktif'),
            posisi = $('.bio').children().index(logoygaktif),
            jumlahlogo = $('.isi-bio').length;
        // console.log(posisi, jumlahlogo);

        // if($(this).hasClass('next')) {
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

// function togglemenu() {
//     $('.burger').click(function () {
//         $('#navigasi').slideToggle();
//     })
// }

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
