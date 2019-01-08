document.addEventListener('DOMContentLoader', () => {

    const catImages = [
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495636.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495625.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495622.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495619.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495616.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495613.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495592.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495579.svg",
        "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/336916.svg"
    ];

    function Slider(inputSelector, slideCollection) {
        const sliderPlace = document.querySelector(`.${inputSelector}`); 
        let currentSlide = 0;
        let slideList = getClone(slideCollection);

        const prev = document.createElement('a');
        prev.classList.add('preview-slide');
        prev.innerText = 'Prev';

        const img = document.createElement('img');
        img.classList.add('viewer');
        img.setAttribute('src', slideList[currentSlide]);

            const next = document.createElement('a');
            next.classList.add('next-slide');
            next.innerText = 'Next';

            sliderPlace.appendChild(prev);
            sliderPlace.appendChild(img);
            sliderPlace.appendChild(next);

            function getClone(itemList) {
                const temp = [];
                for (var i = 0; itemList.length >i; i++) {
                  temp[i] = itemList[i];
                }
                return temp;
            }

              //====================================================//

        getCurrentSlide = function() {
            return slideList[currentSlide];
        };

        updateSlide = function() {
            sliderPlace.querySelector('img').setAttribute('src', getCurrentSlide());
        }

        this.goToNext = function() {
            currentSlide = (currentSlide === slideList.length-1)
              ? 0
              : currentSlide + 1;
            updateSlide();
            return this;
        };

        this.goToPrev = function() {
            currentSlide = (currentSlide === 0)
              ? slideList.length - 1 
              : currentSlide - 1;
            updateSlide();
            return this;
        };

        this.goToNthSlide = function(positionSlide) {
            if (positionSlide - 1 >= 0 && positionSlide - 1 < slideList.length) {
              currentSlide = positionSlide;
            } else { 
              console.log(`ERROR\nslide number must be within [1, ${slideList.length}]`);
            }
            updateSlide();
            return this;
        };

              this.add = function(slide, positionSlide) {
                slideList.splice(positionSlide, 0, slide);
                return this;
              };

              this.del = function(positionSlide) {
                slideList.splice(positionSlide, 1);
                return this;
              };

              sliderPlace.addEventListener('click', (event) => {
                if (event.target.matches('.preview-slide')) {
                    this.goToPrev();
                }

                if (event.target.matches('.next-slide')) {
                    this.goToNext();
                }

              });

            }
});