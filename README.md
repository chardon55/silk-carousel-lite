# 💠 Silk Carousel Lite 💠

![Version_1.1.0](.github/info/version.svg)

## ❓ What is Silk Carousel Lite? ❔

Silk Carousel Lite is a parallel project of Silk Carousel.

The Silk Carousel Project is now attempted to develop for the next major version (3.0.0). While Silk Carousel Lite is based upon Silk Carousel 2.x, and to make it better, lighter and more useful.

## 💡 What is new in the SC-Lite 1.1.0? 💡

1. Some of the code was changed to improve the performance.

2. Inspection Mode was added for carousel testing.

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
	            htBoardTexts: [
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
    width: new String,                   // Width (Default: "60%")
    height: new String,                  // Height (Default: "450px")
    imageSrcs: new Array,                // Images URLs Array
    anchorHrefs: new Array,              // Links Hrefs Array
    htBoardTexts: new Array,             // Hyper-text Board Contents for Each Slide
    _outline: new Boolean,               // Show Outline (Default: true)
    playToggleBtn: new Boolean,          // Show Play/Pause Button (Default: true)
    mouseLeaveHideBtn: new Boolean,      // Hide Buttons When Mouse Leaves (Default: true)
    htBoardBackground: new Boolean,      // Show Background of the Hyper-text Board (Default: true)
    customLearnMoreContent: new Array,   // Custom Content of "Learn More" Button for Each Slide
    startFrom: new Number,               // Start from Which Slide (Default: 1)
    progressBarFilters: new Array,       // Progress Bars' Filters for Each Slide
    showStatus: new Boolean,             // Whether show status box (Default: true)
	showProgressBar = true,              // Show Progress Bar
	intervalTime = 5000,                 // Interval Time (ms)
	inspection_mode = false              // Inspection Mode Switch
}){...}

```

**<> with 💖 by dy55**
