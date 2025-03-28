

(function ($) {
    "use strict";

    // Wait until the document is fully loaded
    $(document).ready(function () {
        console.log('Document ready');

        // Scroll event to change header background color
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var header = $('header');
            var scrollStop = $('#scroll-stop').offset() ? $('#scroll-stop').offset().top : 0;

            if (scroll >= scrollStop) {
                header.addClass("fixed").addClass("scrolled");
            } else {
                header.removeClass("fixed").removeClass("scrolled");
            }
        });

        // Page loading animation
        $(window).on('load', function () {
            if ($('.cover').length) {
                $('.cover').parallax({
                    imageSrc: $('.cover').data('image'),
                    zIndex: '1'
                });
            }

            $("#preloader").animate({
                'opacity': '0'
            }, 600, function () {
                setTimeout(function () {
                    $("#preloader").css("visibility", "hidden").fadeOut();
                }, 300);
            });
        });

        // Counter effect
        function visible(partial) {
            var $t = partial,
                $w = $(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));
        }

        $(window).scroll(function () {
            if (visible($('.count-digit'))) {
                if ($('.count-digit').hasClass('counter-loaded')) return;
                $('.count-digit').addClass('counter-loaded');

                $('.count-digit').each(function () {
                    var $this = $(this);
                    $(this).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
            }
        });

        // Programmatic binding for toggleMenu
        function toggleMenu() {
            console.log('toggleMenu called');
            const checkbox = document.querySelector('.hamburger-icon input');
            const menu = document.querySelector('.menu-space');
            if (checkbox && menu) {
                menu.classList.toggle('active', checkbox.checked);
            } else {
                console.error('Checkbox or menu not found');
            }
        }

        // Bind the event
        $('#hamburger-checkbox').on('change', function() {
            console.log('Checkbox changed');
            toggleMenu();
        });

        // Stock status logic
        var stockStatus = $('#stockStatus').text().trim();
        var buyNowButton = $('#buyNowButton');

        console.log("Stock Status: ", stockStatus);
        console.log("Buy Now Button: ", buyNowButton);

        if (stockStatus === "Out of Stock") {
            buyNowButton.addClass("disabled");
            $('#stockStatus').css('color', 'red');
        }

        if (stockStatus === "In Stock") {
            $('#stockStatus').css('color', 'green');
        }

        // Contact form
        $('#form-submit').on('click', function(event) {
            sendMail(event);
        });

        function sendMail(event) {
            event.preventDefault();

            const currentDate = new Date();
            const formattedTime = currentDate.toLocaleString();

            console.log("Form submission prevented.");
            console.log("Message sent at:", formattedTime);

            let parms = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
                sentAt: formattedTime
            };

            console.log("Form data:", parms);

            emailjs.send("service_v88yqdj", "template_10o3viu", parms)
                .then(function(response) {
                    console.log("Email sent successfully", response);
                    alert("Email Sent!!");
                }, function(error) {
                    console.error("Email sending failed:", error);
                    alert("Failed to send email. Please try again.");
                });
        }
    });

    // Global toggleMenu (for inline onchange fallback)
    window.toggleMenu = function() {
        console.log('Global toggleMenu called');
        const checkbox = document.querySelector('.hamburger-icon input');
        const menu = document.querySelector('.menu-space');
        if (checkbox && menu) {
            menu.classList.toggle('active', checkbox.checked);
        } else {
            console.error('Checkbox or menu not found in global scope');
        }
    };

    //LOADING ANIMATION

    document.addEventListener('DOMContentLoaded', function() {
        const overlay = document.getElementById('loading-overlay');
        const content = document.querySelector('.content');
        const mainBanner = document.querySelector('.main-banner');
        const curtain = document.querySelector('.banner-curtain');
        
        // Split text into characters and wrap in spans
        function splitTextToChars(element) {
            const words = element.textContent.split(' ');
            element.innerHTML = '';
            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.whiteSpace = 'nowrap'; // Keep each word intact
                word.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    wordSpan.appendChild(span);
                });
                element.appendChild(wordSpan);
                // Add a space after each word except the last
                if (wordIndex < words.length - 1) {
                    element.appendChild(document.createTextNode(' '));
                }
            });
        }

        // Apply to h6, h2, and p
        splitTextToChars(document.querySelector('.video-overlay h6'));
        splitTextToChars(document.querySelector('.video-overlay h2'));
        splitTextToChars(document.querySelector('.video-overlay p'));

        // Function to ensure minimum 3-second delay
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Wait for page load and minimum delay
        Promise.all([
            new Promise(resolve => window.onload = resolve), // Wait for page to fully load
            delay(3000) // Minimum 3 seconds
        ]).then(() => {
            overlay.style.visibility = 'hidden';
            
            // Open curtain within banner
            mainBanner.classList.add('open');
            
            // After curtain opens, start content animation and hide curtain
            setTimeout(() => {
                content.style.opacity = '1';
                const chars = document.querySelectorAll('.char');
                chars.forEach((char, index) => {
                    char.style.animationDelay = `${index * 20}ms`;
                });
                document.body.style.overflow = 'auto';
                curtain.style.display = 'none';
            }, 500); // Matches curtain animation duration (0.5s)
        });

        // Show loader and reset curtain when clicking internal links
        document.querySelectorAll('a').forEach(link => {
            if (link.hostname === window.location.hostname) {
                link.addEventListener('click', (e) => {
                    if (!link.download && !link.target) {
                        overlay.style.visibility = 'visible';
                        mainBanner.classList.remove('open');
                        curtain.style.display = 'block';
                    }
                });
            }
        });
    });
    
})(window.jQuery);