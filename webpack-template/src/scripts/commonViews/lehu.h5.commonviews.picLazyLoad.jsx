// 加载组件
import React, {
	Component
} from 'react';



class PicLazyLoad extends Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		//图片懒加载替换图片
		(function($) {
			$.extend($, {
				imgLazyLoad: function() {
					var timer,
						len = $('img.lazyload').length;

					function getPos(node) {
						var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
							scrollt = document.documentElement.scrollTop || document.body.scrollTop;
						var pos = node.getBoundingClientRect();
						return {
							top: pos.top + scrollt,
							right: pos.right + scrollx,
							bottom: pos.bottom + scrollt,
							left: pos.left + scrollx
						}
					}

					function loading() {
						timer && clearTimeout(timer);
						timer = setTimeout(function() {
							var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
								imgs = $('img.lazyload'),
								screenHeight = document.documentElement.clientHeight;
							for(var i = 0; i < imgs.length; i++) {
								var pos = getPos(imgs[i]),
									posT = pos.top,
									posB = pos.bottom,
									screenTop = screenHeight + scrollTop;
								if((posT > scrollTop && posT < screenTop) || (posB > scrollTop && posB < screenTop)) {
									var IMG = imgs[i].getAttribute('data-img');
									$(imgs[i]).addClass("data-img_fadein");
									if(IMG.indexOf('http://') > -1) {
										IMG = IMG.replace(/http/g, 'https');
									}
									imgs[i].src = IMG;
									$(imgs[i]).removeClass('lazyload');
								} else {
									// new Image().src = imgs[i].getAttribute('data-img');
								}
							}
						}, 100);
					}
					if(!len) return;
					loading();
					$(window).on('scroll resize', function() {
						if(!$('img.lazyload').length) {
							return;
						} else {
							loading();
						}
					})
				}
			})
		})($ || Zepto || jQuery);
	}

	render() {
		return(
			<div className="is-loading">
                <em></em>
                <span>加载中....</span>
            </div>
		)
	}

}

export {
	PicLazyLoad
}