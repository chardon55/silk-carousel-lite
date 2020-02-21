# 💠 Silk Carousel Lite 💠

![Version_1.2.0](.github/info/version.svg)

Silk Carousel Lite is a micro website carousel project based on previous Silk Carousel.

## 💡 Changes 💡

1. Changed extern png image references to embedded base64 code, in order to improve the performance.

2. Optimized effect.

3. Code refactoring.

4. Refined locale files.

## 🎯 Usage 🎯

1. Import the files

    i. Link the CSS file
        
    ```HTML
    <link type="text/css" rel="stylesheet" href="css/silk-carousel-lite.css" />
    ```
    The theme CSS file should be linked behind the main CSS file.

    ii. Import JQuery

    ```HTML
    <script src="js/jquery.js"></script>
    ```

    iii. Import the JS file

    ```HTML
    <script src="js/silk-carousel-lite.js"></script>
    ```
    The theme JS file should be imported behind the main JS file.

2. Create a div

    ```HTML
    <div id="bannerCarousel"></div>
    ```

3. Call function
    

    ```HTML
    <script type="text/javascript">
        carouselRun({
                _target: "#bannerCarousel",
                theme: "the-taste-of-sky",
                width: "80%",
                height: "550px",
                imageSrcs: [
                    "images/qd1.jpg",
                    "images/qd2.jpg",
                    "images/qd3.jpg",
                    "images/qd4.jpg",
                    "images/qd5.jpg",
                    "images/qd6.jpg",
                    "images/qd7.jpg"
                ],
                anchorHrefs: [
                    "images/qd1.jpg",
                    "images/qd2.jpg",
                    "#",
                    "images/qd4.jpg",
                    "images/qd5.jpg",
                    "images/qd6.jpg",
                    "#"
                ],
                captions: [
                    "<label>Brio of Qingdao</label><h2>May 4th Square</h2>",
                    "",
                    "",
                    "<h2>Christian Church in Qingdao</h2>",
                    "<h2>Olympic Sailing Center</h2>",
                    "<h2>Landing Stage</h2>",
                    "Let's find the beauty of Qingdao together!",
                ]
            });
    </script>
    ```
                
### Function Information

```JavaScript
//function information
function carouselRun(info = {
    _target: new String,                 // Target Name (ID/Class/...)
    theme: new String,                   // Theme Name
    width: "60%",                        // Width (Default: "60%")
    height: "450px",                     // Height (Default: "450px")
    imageSrcs: new Array,                // Images URLs Array
    anchorHrefs: new Array,              // Links Hrefs Array
    captions: new Array,                 // Caption for Each Slide
    _outline: true,                      // Show Outline (Default: true)
    playToggleBtn: true,                 // Show Play/Pause Button (Default: true)
    hideBtnsWhenMouseLeaves: true,       // Hide Buttons When Mouse Leaves (Default: true)
    captionBg: true,                     // Whether show background of the caption (Default: true)
    customLearnMoreContent: new Array,   // Custom Content of "Learn More" Button for Each Slide
    startFrom: 1,                        // Start from Which Slide (Default: 1)
    indicatorFilters: new Array,         // Progress Bars' Filters for Each Slide
    showStatus: true,                    // Whether show status box (Default: true)
    showindicator = true,                // Show Progress Bar
    intervalTime = 5000,                 // Interval Time (ms)
    inspection_mode = false              // Inspection Mode Switch
}){...}

```

**<> with 💖 by dy55**
