//页面rem
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			var clientWidth = $(".nwrapper").width();
			/*if (!clientWidth) return;*/
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';

		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

let myscroll;

function loaded() {
	myscroll = new IScroll("wrapper", {
		hScroll: true,
		vScroll: false,
		bounce: true,
		hScrollbar: false,
		hideScrollbar: true
	});
	select();
}
window.addEventListener("DOMContentLoaded", loaded, false);

$('.equal-table li').click(function() {
	let Index = $(this).index();
	$('.equal-table .nav-current').removeClass('nav-current');
	$('.equal-table li').eq(Index).addClass('nav-current');
	let PositionIndex = document.querySelector('#wrapper li[class="nav-current"]');
	myscroll.scrollToElement(PositionIndex, 200, true, true);
});

function select() {
	let PositionIndex = document.querySelector('#wrapper li[class="nav-current"]');
	myscroll.scrollToElement(PositionIndex, 200, true, true);
}

$(window).ready(function() {
	$('#wrapper li').click(function() {

	})
})

//swiper切换
var mySwiper = new Swiper('.swiper-container-01', {
	autoplay: 2000, //可选选项，自动滑动
	autoplayDisableOnInteraction: false,
	loop: true,
})
//头条切换
var mySwiper = new Swiper('.swiper-container-02', {
	autoplay: 2000, //可选选项，自动滑动
	autoplayDisableOnInteraction: false,
	loop: true,
	direction: 'vertical',
})

/*倒计时*/
var starttime = new Date("2017/9/19 23:00:00").getTime();
setInterval(function() {
	var nowtime = new Date().getTime();
	var time = starttime - nowtime;
	var hour = parseInt(time / 1000 / 60 % 24);
	var minute = parseInt(time / 1000 / 60 % 60);
	var seconds = parseInt(time / 1000 % 60);
	if(hour < 10) {
		hour = "0" + hour;
	}
	if(minute < 10) {
		minute = "0" + minute;
	}
	if(seconds < 10) {
		seconds = "0" + seconds;
	}
	$('.hour').html(hour);
	$('.minute').html(minute);
	$('.seconds').html(seconds);
}, 1000);