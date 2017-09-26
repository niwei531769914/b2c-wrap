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

/*加载iscroll插件*/
var myScroll;

function loaded() {
	var TotalLength = parseFloat($('#wrapper ul li').width()) * parseFloat($('#wrapper ul li').length);
	$('#wrapper ul').css({
		'width': TotalLength + 'px'
	});
	setTimeout(function() {
		myScroll = new IScroll('#wrapper', {
			scrollX: true,
			scrollY: false,
			tap: true,
			hScroll: true,
			bounceLock: true,
			momentum: true,
			hScrollbar:true,
		});
		select();
	}, 100);

	window.addEventListener("load", loaded, false);

}

function select() {
	var PositionIndex = document.querySelector('#wrapper li[class="active"]');
	myScroll.scrollToElement(PositionIndex, 200, true, true);
	$("#wrapper li").find("span").css('display', 'none');
	$(PositionIndex).find("span").css('display', 'block');
}

$('#wrapper ul li').on('tap', function() {
	var Index = $(this).index();
	$('#wrapper ul .active').removeClass('active');
	$('#wrapper ul li').eq(Index).addClass('active');
	var PositionIndex = document.querySelector('#wrapper li[class="active"]');
	$("#wrapper li").find("span").css('display', 'none');
	$(PositionIndex).find("span").css('display', 'block');
	myScroll.scrollToElement(PositionIndex, 200, true, true);
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