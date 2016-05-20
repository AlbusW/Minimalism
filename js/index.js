/**
 * Created by Alice on 2016/4/21.
 */
$(document).on('touchmove', function (ev) {
    ev.preventDefault();
});

$(function () {
    //   移动端适配
    var $winW = $(window).width();
    var $winH = $(window).height();
    var main = document.getElementById('content');
    var desW = 640;
    var desH = 1008;
    if ($winW / $winH < desW / desH) {
        main.style.webkitTransform = "scale(" + $winH / desH + ")";
        main.style.transform = "scale(" + $winH / desH + ")";
    } else {
        main.style.webkitTransform = "scale(" + $winW / desW + ")";
        main.style.transform = "scale(" + $winW / desW + ")";
    }


//    获取所有场景页面li
    var $li = $('#content>ul>li');
    slidePage();
    function slidePage() {
        var startY = 0;
        var startX = 0;
        var nowIndex = 0;
        var nextorprevIndex = 0;
        var stepO = 1.5;
        var stepS = 1 / 2;

        $li.on('touchstart', function (e) {
            startY = e.originalEvent.changedTouches[0].pageY;
            startX = e.originalEvent.changedTouches[0].pageX;
            nowIndex = $(this).index();
        });

        $li.on('touchmove', function (e) {
            var moveY = e.originalEvent.changedTouches[0].pageY;
            var moveX = e.originalEvent.changedTouches[0].pageX;
            var changeY = moveY - startY;
            var changeX = moveX - startX;

            if (Math.abs(changeX) > Math.abs(changeY)) {
                return;
            }

            $(this).siblings().hide();

            if (moveY < startY) {//向上滑动
                if (nowIndex === $li.length - 1) return;
                nextorprevIndex = nowIndex == $li.length - 1 ? $li.length - 1 : nowIndex + 1;
                $(this).css('transform', 'scale(' + (1 - Math.abs((moveY - startY)) * stepS / $winH ) + ')');
                $(this).css('webkitTransform', 'scale(' + (1 - Math.abs((moveY - startY)) * stepS / $winH ) + ')');
                $(this).css({'opacity': (1 - Math.abs((moveY - startY)) * stepO / $winH )});
            } else {//向下滑动
                if (nowIndex === 0) return;
                nextorprevIndex = nowIndex == 0 ? 0 : nowIndex - 1;
                $li.eq(nowIndex).css('transform', 'scale(' + (1 + Math.abs((moveY - startY)) * stepS / $winH ) + ')');
                $li.eq(nowIndex).css('webkitTransform', 'scale(' + (1 + Math.abs((moveY - startY)) * stepS / $winH ) + ')');
                $li.eq(nowIndex).css({'opacity': (1 + Math.abs((moveY - startY)) * stepO / $winH )});
            }
        });

        $li.on('touchend', function (e) {
            var endY = e.originalEvent.changedTouches[0].pageY;
            var endX = e.originalEvent.changedTouches[0].pageX;
            var changeY = endY - startY;
            var changeX = endX - startX;

            if (Math.abs(changeX) > Math.abs(changeY)) {
                return;
            }


            if (endY < startY) {//向上滑动
                if (nowIndex === $li.length - 1) return;
                $li.eq(nowIndex).css('transform', 'scale(' + (1 - stepS) + ')');
                $li.eq(nowIndex).css('webkitTransform', 'scale(' + (1 - stepS) + ')');
                $li.eq(nowIndex).css({'opacity': (1 - stepO)});
            } else {
                if (nowIndex === 0) return;
                $li.eq(nextorprevIndex).css('transform', 'scale(1)');
                $li.eq(nextorprevIndex).css('webkitTransform', 'scale(1)');
                $li.eq(nextorprevIndex).css({'opacity': 1});
                $li.eq(nowIndex).css('transform', 'scale(1)');
                $li.eq(nowIndex).css('webkitTransform', 'scale(1)');
                $li.eq(nowIndex).css({'opacity': 1});
            }
            $li.eq(nowIndex).css('transition', '.5s').removeClass('zIndex');
            $li.eq(nowIndex).css('webkitTransition', '.5s').removeClass('zIndex');
            $li.eq(nextorprevIndex).show().addClass('zIndex');
            $li.eq(nextorprevIndex).css('transition', '.5s');
            $li.eq(nextorprevIndex).css('webkitTransition', '.5s');
        });

        $li.on('transitionEnd webkitTransitionEnd', function (e) {
            if (!$li.is(e.target)) {
                return;
            }
            resetFn();
        });

        function resetFn() {
            $li.css('transform', '');
            $li.css('webkitTransform', '');
            $li.css('transition', '');
            $li.css('webkitTransition', '');
            $li.eq(nextorprevIndex).siblings().hide();
        }
    }

    var audio = document.querySelector("#audio"), musicBtn = document.querySelector(".musicBtn");

    audio.addEventListener("canplay", function () {
        musicBtn.style.display = "block";
        musicBtn.className = "musicMove";
    }, false);

    musicBtn.addEventListener("touchend", function () {
        if (audio.paused) {
            audio.play();
            audio.className = "musicMove";
            return;
        }
        audio.pause();
        musicBtn.className = "";
    }, false);

    fnLoad();
    function fnLoad() {
        var arr = ['music.png', 'nextpage.png', 'p1_footer.png', 'p1_header.png', 'p1_text1.png', 'p1_text2.png', 'p1_text3.png', 'p1_text4.png', 'p1_text5.png', 'p1_text6.png', 'p1_tm1.png', 'p1_tm2.png', 'p1_tm3.png', 'p1_trm.png', 'p1_zleft.png', 'p1_zright.png', 'p2_bg.png', 'p2_line.png', 'p2_logo.png', 'p2_logoe.png', 'p2_remb.png', 'p2_rembL.png', 'p2_rembR.png', 'p2_text.png', 'p2_topbg.png', 'p2_trmt.png', 'p3_fgb.jpg', 'p3_fgt.jpg', 'p3_logo.png', 'p3_logobanner.png', 'p3_new.png', 'p3_new1.jpg', 'p3_new2.jpg', 'p3_new3.jpg', 'p3_new4.jpg', 'p3_xinping.png', 'p5_fengekuai.png', 'p5_kuangbtm.png', 'p5_kuangtop.png', 'p5_pic1.jpg', 'p5_pic2.jpg', 'p5_rmb.png', 'p6_pic1.jpg', 'p6_pic2.jpg', 'p6_trm.png', 'p7_bg.png', 'p7_lat.png', 'p7_vase.png', 'p7_zebra.png', 'p8_bg.png', 'p8_btn1.png', 'p8_btn2.png', 'p8_btn3.png', 'p8_btn4.png', 'p8_btn5.png', 'p8_lin.png', 'p8_pic1.jpg', 'p8_pic2.jpg', 'p8_title.png', 'p8_titleE.png', 'p9_bg.jpg', 'p9_code.png', 'p9_codebg1.png', 'p9_codebgk1.png', 'p9_codebgk2.png', 'p9_codetxt.png', 'p9_logo.png', 'p9_trbg.png', 'p9_trx.png'];


        var loading = document.querySelector("#loading");
        var n = 0;
        arr.forEach(function () {
            var oImg = new Image();
            oImg.src = "img/" + arguments[0];
            oImg.onload = function () {
                n++;
                if (n == arr.length && loading) {
                    window.setTimeout(function () {
                        main.removeChild(loading);
                        audio.play();
                        $('.p1').show();

                    }, 1000)
                }
            }
        });
    }

    drag();
    function drag() {
        var startX = 0;
        var $inner = $(".p6 .slider .inner");
        var $count = $(".p6 .count span");

        $inner.on("touchstart", function (e) {
            startX = e.originalEvent.changedTouches[0].pageX;
        });

        $inner.on("touchend", function (e) {
            var endX = e.originalEvent.changedTouches[0].pageX;
            $count.removeClass("cur");
            if (endX > startX) {//→
                $inner.css('transform', 'translate(0,0)');
                $inner.css('webkitTransform', 'translate(0,0)');
                $count.eq(0).addClass("cur");
            } else if (endX < startX){
                $inner.css('transform', 'translate(-640px,0)');
                $inner.css('webkitTransform', 'translate(-640px,0)');
                $count.eq(1).addClass("cur");
            }


        });
    }

});