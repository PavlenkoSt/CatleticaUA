const loader = document.querySelector('.loader__window');
const body = document.querySelector('body');
body.onload = function () {
    loader.classList.add('ready');
    body.classList.add('ready');
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector(('.intro-swiper'))) {
        new Swiper('.intro-swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }
    if (document.querySelector('.popular-products__slider')) {
        new Swiper('.popular-products__slider', {
            loop: true,
            slidesPerView: 1,
            autoHeight: true,
            autoplay: {
                delay: 3000
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                    spaceBetween: 50
                },
                680: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });
    }

    // burger
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__nav');
    burger.addEventListener('click', function () {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            document.addEventListener('click', clickClose);
            menu.classList.add('active');
        } else {
            document.removeEventListener('click', clickClose);
            menu.classList.remove('active');
        }
    });
    //close menu to click other place
    function clickClose(event) {
        if (!menu.contains(event.target) && menu.classList.contains('active') && !burger.contains(event.target)) {  // проверяем, что клик не по элементу и элемент виден
            menu.classList.remove('active');
            burger.classList.remove('active');
            document.removeEventListener('click', clickClose);
        }
    }
    //max height popular items
    const popularItems = document.querySelectorAll('.popular-products__cart');
    window.addEventListener('resize', initMaxHeightForPopularItems);
    window.addEventListener('load', initMaxHeightForPopularItems);
    function initMaxHeightForPopularItems() {
        let maxHeight = 0;
        popularItems.forEach(el => {
            if (el.clientHeight > maxHeight) {
                maxHeight = el.clientHeight;
            }
        });
        popularItems.forEach(elem => {
            elem.style.height = maxHeight + 'px';
        });
    }

    //cart 
    const cartIcon = document.querySelector('.callback__cart'),
        cartOverlay = document.querySelector('.cart'),
        cartModal = document.querySelector('.cart__modal'),
        cartClose = document.querySelector('.cart__close'),
        cartBtn = document.querySelector('.cart__btn');

    const openModal = (overlay, modal, event) => {
        overlay.classList.add('show');
        modal.classList.add('show');
        body.classList.add('no-scroll');
        event.preventDefault();
    }
    const removeModalCart = (overlay, modal) => {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        setTimeout(() => {
            body.classList.remove('no-scroll');
        }, 300);
    };

    //cart
    cartIcon.addEventListener('click', function () {
        openModal(cartOverlay, cartModal, event);
    });
    cartOverlay.addEventListener('click', function () {
        removeModalCart(cartOverlay, cartModal)
    });
    cartClose.addEventListener('click', function () {
        removeModalCart(cartOverlay, cartModal)
    });
    cartBtn.addEventListener('click', function () {
        removeModalCart(cartOverlay, cartModal)
    });
    cartModal.addEventListener('click', function (event) {
        event.stopPropagation();
    });
    //callback
    const callbackOverlay = document.querySelector('.callback-m'),
        callbackModal = document.querySelector('.callback__window'),
        callbackClose = document.querySelector('.callback__close'),
        callbackGo = document.querySelector('.callback__go'),
        callbackBtn = document.querySelectorAll('.get-callback');
    callbackBtn.forEach(el => {
        el.addEventListener('click', function () {
            openModal(callbackOverlay, callbackModal, event);
        });
    })
    callbackOverlay.addEventListener('click', function () {
        removeModalCart(callbackOverlay, callbackModal)
    });
    callbackClose.addEventListener('click', function () {
        removeModalCart(callbackOverlay, callbackModal)
    });
    callbackGo.addEventListener('click', function () {
        removeModalCart(callbackOverlay, callbackModal)
    });
    callbackModal.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});