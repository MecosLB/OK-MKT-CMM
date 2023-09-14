gsap.registerPlugin(ScrollTrigger);

(() => {
    const handler = {
        get: (target, name) => {
            return target.hasOwnProperty(name) ? target[name] : 'white';
        }
    },
        COLORS = {
            2: 'gray',
        },
        BG = new Proxy(COLORS, handler);

    const decoratorImg = document.querySelector('#branding .decorator img'),
        decoratorSource = document.querySelector('#branding .decorator source'),
        brandingWords = document.querySelectorAll('#branding svg'),
        needColorChange = document.querySelectorAll('#branding .color');

    const initBg = () => {
        for (const word of brandingWords)
            word.classList.add('hidden');

        document.querySelector('#brand_1').classList.remove('hidden');

        decoratorImg.src = 'assets/img/decorator-1.png';
        decoratorSource.srcset = 'assets/img/decorator-1.webp';

        for (const component of needColorChange) {
            component.classList.remove('secondary');
            component.classList.add('primary');
        }

        gsap.from(`#brand_1 tspan`, {
            scrollTrigger: {
                trigger: '#branding',
                toggleActions: 'play none none reset',
            },
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
        });
    };

    const changeBranding = (bgIndex = 1) => {
        document.querySelector(`#brand_${bgIndex - 1 == 0 ? 6 : bgIndex - 1}`).classList.add('hidden');
        document.querySelector(`#brand_${bgIndex}`).classList.remove('hidden');

        // TEXT & DECORATOR COLOR
        switch (BG[bgIndex]) {
            case 'gray':
                for (const component of needColorChange) {
                    component.classList.remove('primary');
                    component.classList.add('secondary');
                }

                decoratorImg.src = 'assets/img/decorator-2.png';
                decoratorSource.srcset = 'assets/img/decorator-2.webp';
                break;
            default:
                for (const component of needColorChange) {
                    component.classList.remove('secondary');
                    component.classList.add('primary');
                }

                decoratorImg.src = 'assets/img/decorator-1.png';
                decoratorSource.srcset = 'assets/img/decorator-1.webp';
                break;
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        initBg();

        // MAIN LOGO ANIMATION
        gsap.from(document.querySelector('#main .logo img'), {
            scrollTrigger: {
                trigger: '#main',
                toggleActions: 'play none none none',
            },
            right: '100%',
            duration: 1.2,
            ease: 'easeInOut',
        });
        // END MAIN LOGO ANIMATION

        // BRANDING ANIMATION
        const stOptions = {
            trigger: '#branding',
        },
            bgS = gsap.utils.toArray('#branding .bg'),
            bgTimeline = gsap.timeline({
                scrollTrigger: {
                    stOptions,
                },
                repeat: -1,
                ease: 'easeInOut',
            });

        bgS.forEach((element, index) => {
            bgTimeline.from(element, {
                x: '-100%',
                duration: 1,
                delay: 1,
                onStart: () => {
                    // console.log(index);
                    setTimeout(() => {
                        changeBranding(index + 2 > 6 ? 1 : index + 2);
                    }, 250);

                    let selector = document.querySelectorAll(`#brand_${index + 2 > 6 ? 1 : index + 2} path`).length ? 'path' : 'tspan';

                    gsap.from(`#brand_${index + 2 > 6 ? 1 : index + 2} ${selector}`, {
                        scrollTrigger: stOptions,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.1,
                    });
                },
            });
        });
        // END BRANDING ANIMATION
    });
})();