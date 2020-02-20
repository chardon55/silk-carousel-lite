/*                    Silk Carousel Lite                    *
 *  Version: 1.1.1                                          *
 *  Created by: dy55                                        */

/**
 * Silk Root
 */
var $$silkc = {

	pauseTime: 0,

	initializing: "Initializing...",
	noImage: "No Image",
	slideNumError: "Incorrect Slide Number",

	learnMore: "Learn more",

	internalEventReference: new Object,

	playStatus: "",
	pause: "Paused",
	play: "Playing",
	shift: "Shifting",
	statusBox: "statusBox",

	carouselInfo: {},

	lang: "en",
	//If you would like more local language code, just modify it directly.
	//(if there exists the language file in your language at "lang" folder, please ingore it.)

	inspect: {
		current: "Current Slide",
		status: "Status",
		duration: "Duration",
		progress: "Slide Progress"
	}
}

function carouselRun({
	_target = new String,
	theme = new String,
	width = "60%",
	height = "450px",
	imageSrcs = new Array,
	anchorHrefs = new Array,
	htBoardTexts = new Array,
	_outline = true,
	playToggleBtn = true,
	hideBtnsWhenMouseLeaves = true,
	htBoardBackground = true,
	customLearnMoreContent = new Array,
	startFrom = 1,
	indicatorFilters = new Array,
	showStatus = true,
	showIndicators = true,
	intervalTime = 5000/*ms*/,
	inspection_mode = false
}) {

	if (_target == undefined || _target == null || _target == "") {
		throw new NoTargetException;
	}

	$$silkc.carouselInfo = {
		carouselTarget: _target,
		curWidth: width,
		curHeight: height,
		curSlide: startFrom,
		imageArray: imageSrcs,
		anchorArray: anchorHrefs,
		htBoard: htBoardTexts,
		outline: _outline,
		playButton: playToggleBtn,
		htBg: htBoardBackground,
		leaveHide: hideBtnsWhenMouseLeaves,
		customLearnMore: customLearnMoreContent,
		usedTheme: theme,
		barFilters: indicatorFilters,
		showStatus: showStatus,
		showIndicators: showIndicators,
		intervalTime: intervalTime,
		inspection_mode: inspection_mode
	}

	FormatSet();
	localeCheck();
	otherPreset();      //otherPreset()
	SetIndicators();
	SilkCarouselInit();
	otherOperation();   //otherOperation()
}

function FormatSet() {
	$($$silkc.carouselInfo.carouselTarget).css({
		"height": $$silkc.carouselInfo.curHeight,
		"width": $$silkc.carouselInfo.curWidth,
		"transition": `background ${$$silkc.pauseTime}ms`,
		"outline": $$silkc.carouselInfo.outline ? "1.5px black solid" : "none"
	});

	if ($$silkc.carouselInfo.usedTheme != null)
		$($$silkc.carouselInfo.carouselTarget).addClass($$silkc.carouselInfo.usedTheme);
}


const statusField = "statusField"; //Do NOT edit it.

function SilkCarouselInit() {
	$($$silkc.carouselInfo.carouselTarget).prepend(`<span class='${statusField}'></span>`).addClass("silkCarousel");
	$(`${$$silkc.carouselInfo.carouselTarget} .${statusField}`).text($$silkc.initializing);

	if ($$silkc.carouselInfo.imageArray.length <= 0) {
		reportError($$silkc.noImage);
		throw new NoSlideException;
	}

	if (typeof $$silkc.carouselInfo.curSlide != "number" || $$silkc.carouselInfo.curSlide < 1) {
		reportError($$silkc.slideNumError);
		throw new SlideNumberException;
	}

	const rightArrowLearnMore = "rightArrowLearnMore"; //Do NOT edit it.

	$($$silkc.carouselInfo.carouselTarget).prepend(`<div class='infoBoard'></div><div class='${buttonClassName} turnBtn btnPrev'></div><div class='${buttonClassName} turnBtn btnNext'></div><div class='playPause'></div>`);

	if ($$silkc.carouselInfo.showStatus)
		$($$silkc.carouselInfo.carouselTarget).append(`<div class='${$$silkc.statusBox}'></div>`);

	$(`${$$silkc.carouselInfo.carouselTarget} .infoBoard`).prepend("<div class='htBoard'></div>");
	if ($$silkc.carouselInfo.leaveHide)
		$(`${$$silkc.carouselInfo.carouselTarget} .playPause, ${$$silkc.carouselInfo.carouselTarget} .turnBtn`).addClass("leaveHide");

	$(`${$$silkc.carouselInfo.carouselTarget} .htBoard`)
		.append(`<a class='slideAnchor' target='_new'><span class='learnmorespan'>${$$silkc.learnMore}</span><span class='${rightArrowLearnMore}'> > </span></a>`)
		.prepend("<div class='hText'></div>")
		.css({
			"background-color": $$silkc.carouselInfo.htBg ? "rgba(0, 0, 0, 0.3)" : "none"
		});

	$(`${$$silkc.carouselInfo.carouselTarget} .infoBoard`).css({
		"position": "absolute",
		"width": $$silkc.carouselInfo.curWidth
	});

	$(`${$$silkc.carouselInfo.carouselTarget} .playPause`).css({
		"display": $$silkc.carouselInfo.playButton ? "inline-block" : "none",
		"margin-top": parseFloat($$silkc.carouselInfo.curHeight) * 3 / 4 + SliceToUnit($$silkc.carouselInfo.curHeight)
	}).click(() => {
			carouselPlayToggle();
		});

	$(`${$$silkc.carouselInfo.carouselTarget} .turnBtn`).css({
		"margin-top": timesOfHeight(0.49),
		"z-index": "2"
	});

	$(`${$$silkc.carouselInfo.carouselTarget} .btnPrev`).click(() => {
		if ($$silkc.playStatus == $$silkc.pause)
			TurnPrev(false);
		else {
			barHalt();
			TurnPrev();
			setSlideInterval($$silkc.carouselInfo.intervalTime, true);
		}
	});

	$(`${$$silkc.carouselInfo.carouselTarget} .btnNext`).click(() => {
		if ($$silkc.playStatus == $$silkc.pause)
			TurnNext(false)
		else {
			barHalt();
			TurnNext();
			setSlideInterval($$silkc.carouselInfo.intervalTime, true);
		}
	});

	$(`${$$silkc.carouselInfo.carouselTarget} .${statusField}`).text("");
	$($$silkc.carouselInfo.carouselTarget).hover(() => {
		$(`${$$silkc.carouselInfo.carouselTarget} .leaveHide`).css({
			"opacity": "1"
		});
	},
	() => {
		$(`${$$silkc.carouselInfo.carouselTarget} .leaveHide`).css({
			"opacity": "0"
		});
	});
	
	TurnTo($$silkc.carouselInfo.curSlide, $$silkc.carouselInfo);
	if ($$silkc.carouselInfo.imageArray.length > 1) {
		carouselPlay(false);
	}
	else {
		carouselPause(false);
		$(`${$$silkc.carouselInfo.carouselTarget} .playPause, ${$$silkc.carouselInfo.carouselTarget} .turnBtn`).css("display", "none");
		$(`${$$silkc.carouselInfo.carouselTarget} .barSet`).css("display", "none");
	}

	if ($$silkc.carouselInfo.inspection_mode) {
		inspect_init();
	}
}

function inspect_init() {
	$(`${$$silkc.carouselInfo.carouselTarget}, ${$$silkc.carouselInfo.carouselTarget} *`).addClass("silk-inspection");
	let inspWindow = document.createElement('div');
	inspWindow.className = "silk-inspection-window";
	document.body.appendChild(inspWindow);
	setInterval(() => {
		inspWindow.innerHTML = `<span align="center"><b>Silk Carousel Inspection Mode</b></span><hr>\
					${$$silkc.inspect.current}: ${$$silkc.carouselInfo.curSlide}<br>\
					${$$silkc.inspect.status}: ${$$silkc.playStatus}<br>\
					${$$silkc.inspect.duration}: ${$$silkc.carouselInfo.intervalTime} ms<br>\
					${$$silkc.inspect.progress}: ${($(`${$$silkc.carouselInfo.carouselTarget} .bar${$$silkc.carouselInfo.curSlide - 1} > div`).width() / $(`${$$silkc.carouselInfo.carouselTarget} .bar${$$silkc.carouselInfo.curSlide - 1}`).width() * 100).toFixed(0)}%`
	}, 0);

	inspWindow.style.transform = "translateX(300px)";
	$(`${$$silkc.carouselInfo.carouselTarget}, .silk-inspection-window`).hover(() => {
		inspWindow.style.transform = "none";
	}, () => {
		inspWindow.style.transform = "translateX(300px)";
	});
}

let offset = 0;//%
function SetIndicators() {
	$($$silkc.carouselInfo.carouselTarget).append("<div class='barSet'></div>");
	for (let i = 0; i < $$silkc.carouselInfo.imageArray.length; i++) {
		const cNum = i + 1;
		$(`${$$silkc.carouselInfo.carouselTarget} > .barSet`).append(`<div class='${indicatorClassName} bar${i}'></div>`);
		
		$(`${$$silkc.carouselInfo.carouselTarget} .bar${i}`).click(() => {
			if ($$silkc.playStatus == $$silkc.pause)
				TurnTo(cNum, false);
			else {
				TurnTo(cNum);
				setSlideInterval($$silkc.carouselInfo.intervalTime, true);
			}
		});
	}

	$(`${$$silkc.carouselInfo.carouselTarget} > .barSet`).css({
		"margin-top": timesOfHeight(1, -19)
	});
	let gap = 0.25;//%
	$(`${$$silkc.carouselInfo.carouselTarget} .${indicatorClassName}`).css({
		"width": `${100 / $$silkc.carouselInfo.imageArray.length - gap + offset}%`,
		"margin-right": `${gap}%`
	});

	if (!$$silkc.carouselInfo.showIndicators)
		$(".barSet").css('display', 'none');

	$(`.${indicatorClassName}`).html("<div></div>");
}

function SliceToUnit(str) {
	for (var i = 1; str[i] >= '0' && str[i] <= '9'; i++);
	return str.substring(i);
}

let barResetTimeout;

function TurnTo(toSlide, transitionBar = true, clearBarFirst = true) {
	let curStatus = $$silkc.playStatus;
	$$silkc.playStatus = $$silkc.shift;

	barHalt();
	if (clearBarFirst)
		barClear();
	
	$$silkc.carouselInfo.curSlide = toSlide;

	$($$silkc.carouselInfo.carouselTarget).css("background-image", `url(${$$silkc.carouselInfo.imageArray[toSlide - 1]})`);
	$($$silkc.carouselInfo.carouselTarget + " .slideAnchor").attr("href", $$silkc.carouselInfo.anchorArray[toSlide - 1]);

	if ($$silkc.carouselInfo.barFilters[$$silkc.carouselInfo.curSlide - 1] != null) {
		$(`${$$silkc.carouselInfo.carouselTarget} .barSet`).css({
			"filter": $$silkc.carouselInfo.barFilters[$$silkc.carouselInfo.curSlide - 1]
		});
	}
		
	checkimgurl();
	checklearnMore();
	checkhtText();
	setCustomLabel();

	barResetTimeout = setTimeout(() => {
		barReset(transitionBar);
		$$silkc.playStatus = curStatus;
	}, $$silkc.pauseTime);
}

function TurnNext(transitionBar = true) {
	$$silkc.carouselInfo.curSlide = $$silkc.carouselInfo.curSlide % $$silkc.carouselInfo.imageArray.length + 1;
	TurnTo($$silkc.carouselInfo.curSlide, transitionBar, false);
}

function TurnPrev(transitionBar = true) {
	if (--$$silkc.carouselInfo.curSlide < 1)
		TurnTo($$silkc.carouselInfo.imageArray.length, transitionBar, false);
	else
		TurnTo($$silkc.carouselInfo.curSlide, transitionBar, false);
}

///////////////////////////////////////
//Indicator Section

const indicatorClassName = "indicator"; //Do NOT edit it.

///////////////////////////////////////

function barClear() {
	$(`${$$silkc.carouselInfo.carouselTarget} .${indicatorClassName} > div`).css({
		"transition": "none",
		"width": "0"
	});
}

function barReset(transitionBar = true) {

	barClear();
	$(`${$$silkc.carouselInfo.carouselTarget} .bar${($$silkc.carouselInfo.curSlide - 1)} > div`).css({
		"transition": transitionBar ? `all ${$$silkc.carouselInfo.intervalTime}ms linear` : "none"
	});

	$(`${$$silkc.carouselInfo.carouselTarget} .bar${($$silkc.carouselInfo.curSlide - 1)} > div`).css({
		"width": "100%"
	});
}

const btnLeftId = "CarouselButtonLeft";
const btnRightId = "CarouselButtonRight";

const buttonClassName = "button";//Do NOT edit it.

function buttonsBuild() {
	$($$silkc.carouselInfo.carouselTarget).prepend(`<a class='${buttonClassName}' id='${btnLeftId}'></a><a class='${buttonClassName}' id='${btnRightId}'></a>`);

}

var pauseimgUrl = "url(../images/pause.png)";
var playimgUrl = "url(../images/start.png)";

let statusBoxTimeout;
let timeoutRefer;

function carouselPlay(resume = true) {
	$$silkc.playStatus = $$silkc.play;
	$(`${$$silkc.carouselInfo.carouselTarget} .playPause`).css({
		"background-image": pauseimgUrl
	});

	$(`${$$silkc.carouselInfo.carouselTarget} .${$$silkc.statusBox}`).text($$silkc.playStatus);
	statusBoxTimeout = setTimeout(() => {
		$(`${$$silkc.carouselInfo.carouselTarget} .${$$silkc.statusBox}`).fadeOut();
	}, 1000);

	const bar = `${$$silkc.carouselInfo.carouselTarget} .bar${($$silkc.carouselInfo.curSlide - 1)}`;
	if (!resume || $(`${bar} > div`).width() >= $(bar).width() - parseFloat($(bar).css("border-width"))) {
		setSlideInterval($$silkc.carouselInfo.intervalTime);
		barResetTimeout = setTimeout(() => {
			barReset();
		}, $$silkc.pauseTime);
		TurnTo($$silkc.carouselInfo.curSlide);
	}
	else {
		const bar = `${$$silkc.carouselInfo.carouselTarget} .bar${($$silkc.carouselInfo.curSlide - 1)}`;
		const remainTime = $$silkc.carouselInfo.intervalTime - widthToTime($(`${bar} > div`).width());
		$(`${bar} > div`).css({
			"width": "100%",
			"transition": `${remainTime}ms linear`
		});
		timeoutRefer = setTimeout(() => {
			TurnNext();
			setSlideInterval($$silkc.carouselInfo.intervalTime, true);
		}, remainTime);
	}
}

function carouselPause() {
	$$silkc.playStatus = $$silkc.pause;
	$(`${$$silkc.carouselInfo.carouselTarget} .playPause`).css({
		"background-image": playimgUrl
	});
	clearInterval($$silkc.internalEventReference);
	clearTimeout(barResetTimeout);
	clearTimeout(statusBoxTimeout);
	clearTimeout(timeoutRefer);
	barHalt();
	$(`${$$silkc.carouselInfo.carouselTarget} .${$$silkc.statusBox}`).fadeIn().text($$silkc.playStatus);
}

function carouselPlayToggle() {
	if ($$silkc.playStatus == $$silkc.pause)
		carouselPlay();
	else
		carouselPause();
}

function checkimgurl() {
	const bgImg = $($$silkc.carouselInfo.carouselTarget).css("background-image");
	if (bgImg == `url("${document.URL}")`
		||
		bgImg == `url("${document.URL}"#)`
		||
		bgImg == ""
		||
		bgImg == "#")
		$(`${$$silkc.carouselInfo.carouselTarget} .${statusField}`).text($$silkc.noImage);
	else
		$(`${$$silkc.carouselInfo.carouselTarget} .${statusField}`).text("");
}

function checkhtText() {
	const htBoard = $$silkc.carouselInfo.htBoard[$$silkc.carouselInfo.curSlide - 1];
	if ((htBoard == null || htBoard == "" || htBoard == undefined) && $($$silkc.carouselInfo.carouselTarget + " .slideAnchor").css("display") == "none")
		$(`${$$silkc.carouselInfo.carouselTarget} .htBoard`).fadeOut();
	else
		$(`${$$silkc.carouselInfo.carouselTarget} .htBoard`).fadeIn();

	if (htBoard != undefined)
		$(`${$$silkc.carouselInfo.carouselTarget} .hText`).html($$silkc.carouselInfo.htBoard[$$silkc.carouselInfo.curSlide - 1]);
	else
		$(`${$$silkc.carouselInfo.carouselTarget} .hText`).html("");
}

function checklearnMore() {
	const href = $(`${$$silkc.carouselInfo.carouselTarget} .slideAnchor`).attr("href");
	if (href == "#" || href == "" || href == null)
		$(`${$$silkc.carouselInfo.carouselTarget} .slideAnchor`).css("display", "none");
	else
		$(`${$$silkc.carouselInfo.carouselTarget} .slideAnchor`).css("display", "inline-block");
}

function timesOfWidth(times, offset = 0) {
	return parseFloat($$silkc.carouselInfo.curWidth) * times + offset + SliceToUnit($$silkc.carouselInfo.curWidth);
}

function timesOfHeight(times, offset = 0) {
	return parseFloat($$silkc.carouselInfo.curHeight) * times + offset + SliceToUnit($$silkc.carouselInfo.curHeight);
}

function setCustomLabel() {
	const lmtext = $$silkc.carouselInfo.customLearnMore[$$silkc.carouselInfo.curSlide - 1];

	if (lmtext != null && lmtext != "")
		$(`${$$silkc.carouselInfo.carouselTarget} .learnmorespan`).html(lmtext);
	else
		$(`${$$silkc.carouselInfo.carouselTarget} .learnmorespan`).html($$silkc.learnMore);
}

function localeCheck() {
	if ($("html").attr("lang") == null || $("html").attr("lang") != $$silkc.lang)
		$($$silkc.carouselInfo.carouselTarget).attr("lang", $$silkc.lang);
}

//Additional Functions

function otherPreset(){ }     //This function is safe to be overwritten.
function otherOperation(){ }  //This function is safe to be overwritten.

/////////////////////

function widthToTime(width) {
	const full = $(`${$$silkc.carouselInfo.carouselTarget} > .barSet > .${indicatorClassName}`).width();
	const times = width / full;
	const time = $$silkc.carouselInfo.intervalTime * times;
	return time.toPrecision(1);
}

function setSlideInterval(intervalTime, reset = false) {
	if (reset)
		clearInterval($$silkc.internalEventReference);
	$$silkc.internalEventReference = setInterval(() => {
		TurnNext();
	}, intervalTime);
}

function barHalt() {
	const barDiv = `${$$silkc.carouselInfo.carouselTarget} .bar${($$silkc.carouselInfo.curSlide - 1)} > div`;
	$(barDiv).css({
		"width": $(barDiv).width(),
		"transition": "none"
	});
}

function reportError(str) {
	$(`${$$silkc.carouselInfo.carouselTarget} .${statusField}`).text(str);
}

class SilkException extends Error {
	constructor(message = "") {
		this.message = message;
	}
}

class NoTargetException extends SilkException {
}

class SlideError extends SilkException {
}

class NoSlideException extends SlideError {
}

class SlideNumberException extends SlideError {
}