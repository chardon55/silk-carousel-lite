// Loli Pink Theme Scheme
// 2019-8-26
// for Carousel v1.1.0
// v1.1.0
// This theme needs bootstrap to work properly

$$silkc.pausemouseover = "url(../images/loli-pink/pause/pause-mo.png)";
$$silkc.playmouseover = "url(../images/loli-pink/play/play-mo.png)";

$$silkc.pausemousedown = "url(../images/loli-pink/pause/pause-md.png)";
$$silkc.playmousedown = "url(../images/loli-pink/play/play-md.png)";

function otherPreset() {
	pauseimgUrl = "url(../images/loli-pink/pause/pause-ml.png)";
	playimgUrl = "url(../images/loli-pink/play/play-ml.png)";
}

function otherOperation() {

	let playPause = $$silkc.carouselInfo.carouselTarget + " .playPause";

	$(playPause).hover(
		() => {
			if ($$silkc.playStatus != $$silkc.pause)
				$(playPause).css("background-image", $$silkc.pausemouseover);
			else
				$(playPause).css("background-image", $$silkc.playmouseover);
		},
		() => {
			if ($$silkc.playStatus != $$silkc.pause)
				$(playPause).css("background-image", pauseimgUrl);
			else
				$(playPause).css("background-image", playimgUrl);
		}
	)
		.mousedown(
			() => {
				if ($$silkc.playStatus != $$silkc.pause)
					$(playPause).css("background-image", $$silkc.pausemousedown);
				else
					$(playPause).css("background-image", $$silkc.playmousedown);
			}
	);
}