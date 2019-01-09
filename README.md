# Slider
Adaptive slider for free used and modified. Was written on native JS, SCSS. To see demo click here

<img src="https://raw.githubusercontent.com/IgnatSemchuk/slider/master/src/images/preview-slider.jpg">

## How to use
1. Download form github package or use GIT:  
    `$ git clone https://github.com/IgnatSemchuk/slider`
2. Make `npm install`, `npx gulp`, build is in `src` folder 
3. Choose place for slider into your markup, set class, run script:
    ```
    <div class="slider-container">
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                new getSlider('slider-container', [array slides]);
            });
        </script>
    </div>
    ```
  
