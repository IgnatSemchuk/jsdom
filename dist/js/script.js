    function getSlider(inputSelector, slideList) {
        const amountSlides = slideList.length;
        let currentSlide = 0;
        const slider = init();
        updateSlide();

        function init() {
            const slider = document.createElement(`div`);
            slider.className = 'is-slider is-slider_height_medium is-slider_font_roboto';

            const img = document.createElement('img');
            img.className = 'is-slider__img';
            slider.appendChild(img);

            const navigation = document.createElement(`ul`);
            navigation.className = 'is-slider__navigation';
            slideList.forEach((cat, index) => {
                const navButton = document.createElement(`li`);
                navButton.className = 'is-slider__button is-slider__button_nav';
                navButton.setAttribute('data-index', `${index}`);
                navigation.appendChild(navButton);
            });
            slider.appendChild(navigation);

            const next = document.createElement('a');
            next.className = 'is-slider__button is-slider__button_next is-slider__button_color_grey';
            next.innerHTML = '&#10095';
            slider.appendChild(next);

            const prev = document.createElement('a');
            prev.className = 'is-slider__button is-slider__button_prev is-slider__button_color_grey';
            prev.innerHTML = '&#10094';
            slider.appendChild(prev);

            document.querySelector(`.${inputSelector}`).appendChild(slider);

            return slider;
        }

        function getCurrentSlide() {
            return slideList[currentSlide];
        };

        function toggleCalssNavButton(buttonIndex) {
            slider.querySelector(`[data-index="${buttonIndex}"]`).classList.toggle('is-slider__button_active');
        };

        function updateSlide() {
            slider.querySelector('.is-slider__img').setAttribute('src', getCurrentSlide());
            toggleCalssNavButton(currentSlide);
            
        }

        function goToNext() {
            toggleCalssNavButton(currentSlide);
            currentSlide = (currentSlide === amountSlides-1)
              ? 0
              : currentSlide + 1;
            updateSlide();
        };

        function goToPrev() {
            toggleCalssNavButton(currentSlide);
            currentSlide = (currentSlide === 0)
              ? amountSlides - 1 
              : currentSlide - 1;
            updateSlide();
        };

        function goToNthSlide(targetSlide) {
            //if (targetSlide === currentSlide) return;
            toggleCalssNavButton(currentSlide);
            currentSlide = targetSlide;
            updateSlide();
        };

        slider.addEventListener('click', (event) => {
            if (event.target.matches('.is-slider__button_prev')) {
                goToPrev();
            }

            if (event.target.matches('.is-slider__button_next')) {
                goToNext();
            }

            if (event.target.matches('.is-slider__img')) {
                goToNext();
            }

            if (event.target.matches('.is-slider__button_nav')) {
                goToNthSlide(+event.target.dataset.index);
            } 
        });

    }

    new getSlider('slider-container', catImages);