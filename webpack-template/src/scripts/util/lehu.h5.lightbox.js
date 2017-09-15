
export const lightbox = function () {
    //对需要方法的图片进行事件绑定
    function mess() {

        let obj = document.querySelectorAll('img.light-box');

        for (let i = 0; i < obj.length; i++) {
            let objCase = obj[i];
            objCase.addEventListener('click', function (event) {
                let ev = event.target;
                let positionIndex = ev.getAttribute("data-index");
                let images = [];
                let objCaseTotal = objCase.parentNode.children;
                for (let m = 0; m < objCaseTotal.length; m++) {
                    let objtest = objCaseTotal[m];
                    let image = {};
                    image.img = objtest.getAttribute('src');
                    images.push(image);
                }
                init(positionIndex, images);
            }, false);
        }
    };

    //项目初始化
    mess();

    function init(index, images) {
        console.log(index);
        index = parseFloat(index);
        //container元素
        let container = document.createElement("div");
        container.setAttribute('class', 'container');
        let html = '';
        html += '<div class="page-nub"><em id="slide-nub" class="fz18">' + (index + 1) + '</em><em class="nub-bg">/</em><em id="slide-sum" class="fz12">' + images.length + '</em></div><div class="scroll-img" ><div class="slide"><ul class="scroll-ul" >';
        for (let i = 0; i < images.length; i++) {
            html += '<li class="slide-img" data-index="' + i +'"><img src="' + images[i].img + '"></li>'
        }
        html += '</ul></div></div>';
        document.body.appendChild(container);
        container.innerHTML = html;
        //动态改变图片的尺寸
        Size();
        //动态改变图片的尺寸
        window.onresize = function () {
            Size();
        };
        //动态改变图片的尺寸
        function Size() {
            let imgHeight = document.querySelector('div.scroll-img').offsetHeight;
            let imgWidth = document.querySelector('div.scroll-img').offsetWidth;
            let slide = document.querySelectorAll('li.slide-img');
            if (slide) {
                for (let i = 0; i < slide.length; i++) {
                    let mya = slide[i];
                    mya.setAttribute('style', 'width:' + imgWidth + 'px; height: ' + imgHeight + 'px');
                }
            }
            let Lilenght = document.querySelector('li.slide-img').offsetWidth;
            let Length = document.querySelectorAll('li.slide-img').length;
            document.querySelector('div.scroll-img').setAttribute('style', 'margin-top:-' + (imgHeight / 2) + 'px');
            document.querySelector('div.slide').setAttribute('style', 'height:' + imgHeight + 'px');
            document.querySelector('ul.scroll-ul').setAttribute('style', 'width: ' + (Lilenght * Length) + 'px ;height:' + imgHeight + 'px;transform :translateX(-' + (Lilenght * index) + 'px)');
        }

        //对ul的x轴进行处理
        let ulDom = document.querySelector('ul.scroll-ul');

        //删除真实Dom
        document.querySelector('ul.scroll-ul').addEventListener('click',function () {
            document.body.removeChild(document.querySelector('div.container'));
        },false);

        //初始化数据
        let init = {
            startX: 0, //x触摸起点X坐标
            touchX: 0, // x触摸时坐标X
            pax: 0, //获取transform的x轴数值
            juli: 0,  //初始化距离
            scrollX: 0,  //水平x移动的距离
            widthX: 0,  // 底部X减去屏宽的距离
        };

        ulDom.addEventListener('touchstart', function (event) {
            init.startX = event.targetTouches[0].pageX;
            let le = ulDom.style.transform || ulDom.style.webkitTransform;
            ulDom.style.transition = '';
            init.pax = parseFloat(le.substr(11));
        }, false);

        ulDom.addEventListener('touchmove', function (event) {
            event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
            init.touchX= event.targetTouches[0].pageX;
            init.juli = parseFloat(init.startX) - parseFloat(init.touchX);
            init.scrollX = -init.juli + init.pax;
            ulDom.style.transform = 'translateX(' + init.scrollX + 'px)';
        }, false);

        ulDom.addEventListener('touchend', function (event) {
            let scrollSingle = document.querySelector('li.slide-img').offsetWidth;
            let singleLength = document.querySelectorAll('li.slide-img').length;
            let scrollTotal = scrollSingle*(singleLength - 1);
            if (init.scrollX > 0) {
                ulDom.style.transform = 'translateX(0px)';
                ulDom.style.transition = '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)';
                return false;
            }
            if(Math.abs(init.scrollX) > scrollTotal){
                ulDom.style.transform = 'translateX(-' + scrollTotal + 'px)';
                ulDom.style.transition = '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)';
                return false;
            }
            //又滑一页
            if(init.juli > 0 && Math.abs(init.juli) > 100){
                document.getElementById('slide-nub').innerHTML = parseFloat(document.getElementById('slide-nub').innerHTML) + 1;
                let scrollhua = init.pax - scrollSingle;
                ulDom.style.transform = 'translateX(' + scrollhua + 'px)';
                ulDom.style.transition = '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)';
                return false;
            }
            //左滑一页
            if(init.juli < 0 && Math.abs(init.juli) > 100){
                document.getElementById('slide-nub').innerHTML = parseFloat(document.getElementById('slide-nub').innerHTML) - 1;
                let scrollhua = init.pax + scrollSingle;
                ulDom.style.transform = 'translateX(' + scrollhua + 'px)';
                ulDom.style.transition = '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)';
                return false;
            }
            if( Math.abs(init.juli) < 100){
                ulDom.style.transform = 'translateX(' + init.pax + 'px)';
                ulDom.style.transition = '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)';
                return false;
            }
        }, false);


    }

};