var dev;
var myWidth;
$(window).load(function(){

	$('select').selectric();

	var stickerleft = $('.menuWrap');
	var stickertop = $('.naviWrap');
	stickerleft.sticky({zIndex:10001, wrapperClassName:'leftStickyWrap'});
	stickertop.sticky({zIndex:10000, wrapperClassName:'topStickyWrap'});

	$(".scrollWrap").mCustomScrollbar({
		axis:"x",
		theme:"dark-thick"
	});
	$(".scrollWrapY").mCustomScrollbar({
		axis:"y",
		theme:"dark-thick"
	});

	$(window).resize(function(){
		viewResize();
	});
	navFn();
	snbFn();
	viewResize();

	$('.menuWrap .menu').on('click' , function(e){
		if($('.menuWrap').hasClass('in')){
			$('.menuWrap').removeClass('in');
			$('.body').removeClass('in');
			$('.menuWrap').animate({ left : '0px'} , {duration:600, easing:"easeOutBack"});
			$('.naviWrap').animate({ 'padding-left' : '260px'} , {duration:600, easing:"easeOutBack"});
			$('.contents').animate({ 'margin-left' : '260px'} , {duration:600, easing:"easeOutBack"});
			$('.footerWrap').animate({ 'margin-left' : '260px'} , {duration:600, easing:"easeOutBack"});

		}else{
			$('.menuWrap').addClass('in');
			$('.body').addClass('in');
			$('.menuWrap').animate({ left : '-170px'} , {duration:600, easing:"easeOutBack"});
			$('.naviWrap').animate({ 'padding-left' : '90px'} , {duration:600, easing:"easeOutBack"});
			$('.contents').animate({ 'margin-left' : '90px'} , {duration:600, easing:"easeOutBack"});
			$('.footerWrap').animate({ 'margin-left' : '90px'} , {duration:600, easing:"easeOutBack"});
			overFn();
		}
	});

	// 트리메뉴
	$('.treeMenuWrap .menuList ul > li > a').on('click', function() {
	    if ($(this).hasClass('on')) {
	        $(this).removeClass('on');
	        $(this).next().hide();
	    } else {
	        if ($(this).hasClass('last')) {
	        	$('.treeMenuWrap .menuList ul > li > .last').removeClass('active');
	            $(this).addClass('active');
	        } else {
	            $(this).addClass('on');
	            if ($(this).next().length) {
	                $(this).next().show();
	            }
	        }
	    }
	});

	//datepicker
	if($('.datepic').length){
		$('.datepic').datepicker({
			calendarWeeks: false,
			todayHighlight: true,
			autoclose: true,
			format: "yyyy.mm.dd",
			language: "kr"
		});
	}

	//탭 메뉴
	$('.tab li').on('click', function(){
		var idx = $(this).index();
		//console.log(idx);		
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		} else{
			$('.tab li').removeClass('on');
			$(this).addClass('on');

			if($('.tabConts').length){
				//console.log('y');
				$('.tabContainer .tabConts').hide();
				$('.tabContainer .tabConts').eq(idx).show();
			} else{
				//console.log('n');
				return false;
			}
		}
	});

	//탈퇴회원 상세 활동이력조회
	$('.accordionWrap').on('click', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');				
			$(this).find('.top').addClass('ellipsis');									
		} else{
			$('.accordionWrap').removeClass('on');
			$(this).addClass('on');
			$('.accordionWrap .top').addClass('ellipsis');
			$(this).find('.top').removeClass('ellipsis');
		}
	});

	//팝업
	$('.popupWrap .close').on('click', function(){
		$('.popupWrap').hide();
	});

	// divTableCell 안에 input, select 들어가는 경우 padding값 조절
	var inputCell = $('.divTableCell').find('input').length;
	if(inputCell){
		//console.log('y');
		$('input').parents('.divTableCell').addClass('pd');
		$('input[type=radio]').parents('.divTableCell').removeClass('pd');
		$('input[type=checkbox]').parents('.divTableCell').removeClass('pd');
		$('select').parents('.divTableCell').addClass('pd');
		$('textarea').parents('.divTableCell').addClass('pd');
	} else{
		//console.log('n');
		return false;
	}


});

$.fn.datepicker.dates['kr'] = {
    days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
    daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
    daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    minDate: 0,
    maxDate: 10,
    titleFormat: "yyyy년 MM",
};

// 관리자 메뉴권한 롤링 페이지
(function($){
	$.fn.rollingAct = function (settings) {
		settings = jQuery.extend({
			autoPlay : false,
			rPaging : "r-paging",
			rTot :"r-cnt-tot",
			speed : 400,
			interval : 2000
		}, settings);

		var opts = [];
		opts = $.extend({}, $.fn.rollingAct.defaults, settings);

		return this.each(function () {

			var _this = this;

			$.fn.extend(this, rollingAct);
			this.opts = opts;
			_this.init();	
		});
	};
	var rollingAct = {
		init : function(){
			var _this =  this;
			this.rListWrap = $(this).find("ul:first-child");
			this.rList = this.rListWrap.children();
			this.itemWidth = this.rList.first().outerWidth(true);
			this.viewCnt = ($(this).attr("viewCnt") == "") ? 3 :  parseInt($(this).attr("viewCnt"));
			this.viewWidth = this.viewCnt*this.itemWidth  - parseInt(this.rList.first().css("margin-right"));
			this.speed = ($(this).attr("speedCnt") == "") ? 300 :  parseInt($(this).attr("speedCnt"));
			this.prev = $(this).find("."+this.opts.btnPrev);
			this.next = $(this).find("."+this.opts.btnNext);
			this.page = 1;
			this.lastCnt = Math.ceil(this.rList.size()/this.viewCnt);
			this.moveX = this.viewWidth + parseInt(this.rList.first().css("margin-right"))
			this.rPaging = $(this).find("."+this.opts.rPaging);
			this.rTot = $(this).find("."+this.opts.rTot);
			this.rCnt = $(this).find("."+this.opts.rCnt);
			this.cloneCnt = 0;
			this.autoPlay = ($(this).attr("auto") == "") ? false : true;
			this.autoObj = "";
			this.intervalTime = ($(this).attr("interval") == "") ? 2000 :  parseInt($(this).attr("interval"));

			if(this.viewCnt >= this.rList.size()){
				this.prev.hide();
				this.next.hide();
				return false;
			}


			$(this).width(this.viewWidth);

			for(var i=0;i<this.lastCnt;i++){
				if(i == 0) { 
					this.rPaging.append('<span class="ctl on"></span>');
				}else{
					this.rPaging.append('<span class="ctl"></span>');
				}
			}


			if(this.rList.size()%this.viewCnt != 0){
				this.cloneCnt = this.viewCnt - this.rList.size()%this.viewCnt;

				for(var i=0;i < this.cloneCnt;i++){
					this.rListWrap.append(this.rList.first().clone(false).outerWidth(this.rList.first().outerWidth()).outerHeight(this.rList.first().outerHeight()).empty());
				}
			}


			this.rTot.text(this.lastCnt);

			if(this.autoPlay){
				this.autoAction();
			}

			$(this).mouseenter(function() {
				_this.stopAuto();
			});

			$(this).mouseleave(function() {
				_this.stopAuto();
				_this.autoAction();
			});

			this.next.click(function() {
				_this.action(1);
			});

			this.prev.click(function() {
				_this.action(-1);
			});

			this.rPaging.children().click(function() {
				var clickPage = _this.rPaging.children().index($(this));

				if(_this.page < clickPage + 1){
					_this.page = clickPage + 1;				
					for(var i=0;i < _this.viewCnt*clickPage;i++){
						_this.rListWrap.append(_this.rList.eq(i));
					}
				}

				if(_this.page > clickPage + 1){
					for(var i=0;i < _this.viewCnt*(_this.page - clickPage - 1);i++){
						_this.rListWrap.prepend(_this.rListWrap.children().last());
					}
					_this.page = clickPage + 1;
				}

				_this.actionCallBack();
			});
		},

		action : function(d) {
			var _this = this;

			if(this.rListWrap.is(":animated ")) return false;

			if(d == 1){
				if(this.page == this.lastCnt){
					this.page = 1;
				}else{
					this.page++;
				}

				this.rListWrap.stop().animate({'margin-left':-this.moveX},this.speed, function() {
					$(this).css('margin-left',0);
					for(var i=0;i<_this.viewCnt;i++){
						_this.rListWrap.append(_this.rListWrap.children().first());
					}

					_this.actionCallBack();
				});
			}else{
				if(this.page == 1) { 
					this.page = this.lastCnt;
				}else{
					this.page--;
				}

				this.rListWrap.css({'margin-left':-this.moveX});
				for(var i=0;i<_this.viewCnt;i++){
					_this.rListWrap.prepend(_this.rListWrap.children().last());
				}
				
				this.rListWrap.stop().animate({'margin-left':0},this.speed, function() {
					_this.actionCallBack();
				});
			}
		},

		autoAction : function() {
			var _this = this;
			_this.stopAuto();
			if(this.autoPlay){
				this.autoObj = setInterval(function() {
					_this.action(1);
				},_this.intervalTime);
			}
		},

		stopAuto : function() {
			if(this.autoPlay){
				clearInterval(this.autoObj);
			}
		},

		actionCallBack : function() {
			var _this = this;
			this.rCnt.text(this.page);
			this.rPaging.children().removeClass("on");
			this.rPaging.children().eq(this.page - 1).addClass("on");
		}
	};
})(jQuery);
$(document).ready(function() {
	$(".rolling-box").rollingAct({
		autoPlay : false,
		interval : 2000
	});
});

function navFn(){
	$('.naviWrap .naviDep1 > li > a').on('mouseenter', function(){
		$(".scrollWrap").mCustomScrollbar("disable");
		$('.naviWrap .naviDep1 > li > a').removeClass('active');
		$(this).addClass('active');
		$(this).next().stop().slideDown({duration:400, easing:"easeOutBack"})
		//$('.mCSB_scrollTools').addClass('over')
	});

	$('.naviWrap .naviDep1 > li').on('mouseleave', function(){
		$(this).children().removeClass('active');
		$(this).find('.naviDep2').stop().slideUp({duration:300, easing:"easeOutBack" , complete: showScroll })
		//$(".scrollWrap").mCustomScrollbar("update");
		//$('.mCSB_scrollTools').removeClass('over');

	});
}

function showScroll(){
	if($('.naviWrap .naviDep1 > li > a').hasClass('active')){

	}else{
		$(".scrollWrap").mCustomScrollbar("update");
	}

}

function overFn(){
	$('.menuWrap.in').on('mouseenter' , function(e){
		//console.log('enter')
		if($(this).hasClass('in')){
			$('.menuWrap').stop().animate({ left : '0px'} , {duration:600, easing:"easeOutStrong"});
		}
		$(this).addClass('over');

	});
	$('.menuWrap.in').on('mouseleave' , function(e){
		if($(this).hasClass('in')){
			$('.menuWrap').stop().animate({ left : '-170px'} , {duration:600, easing:"easeOutBack"});
		}
		$(this).removeClass('over');

	});
}


function snbFn(){
	$('.snb .depth2 > ul > li > a').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).next().stop().slideUp({duration:400, easing:"easeOutBack" })
		} else{
			$('.snb .depth2 > ul > li > a').removeClass('active');
			$(this).addClass('active');
			$('.snb .depth3').hide();
			$(this).next().stop().slideDown({duration:400, easing:"easeOutBack"})
		}
	});

	$('.snb .depth3 > ul > li > a').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).next().stop().slideUp({duration:400, easing:"easeOutBack" })
		} else{
			$('.snb .depth3 > ul > li > a').removeClass('active');
			$(this).addClass('active');
			$('.snb .depth4').hide();
			if($(this).next().length){
				$(this).next().stop().slideDown({duration:400, easing:"easeOutBack"})
			}
		}
	});

	$('.snb .depth4 > ul > li > a').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).next().stop().slideUp({duration:400, easing:"easeOutBack" })
		} else{
			$('.snb .depth4 > ul > li > a').removeClass('active');
			$(this).addClass('active');
			$('.snb .depth5').hide();
			if($(this).next().length){
				$(this).next().stop().slideDown({duration:400, easing:"easeOutBack"})
			}
		}
	});
}


function resetFn(){

}


function viewResize(){
	myWidth = stageWH('width');
	if(myWidth>900){
		if(dev == 'mc'){
			dev = 'pc';
			$('header').removeClass('mc');
			$('header').addClass(dev);
			resetFn();
		}else if(dev == undefined){
			dev = 'pc';
			$('header').removeClass('mc');
			$('header').addClass(dev);
		}
	} else{
		if(dev == 'pc'){
			dev = 'mc';
			$('header').removeClass('pc');
			$('header').addClass(dev);
			resetFn();
		}else if(dev == undefined){
			dev = 'mc';
			$('header').removeClass('pc');
			$('header').addClass(dev);
		}
	}
}

function stageWH(mode){
    var stageWidth, stageHeight;

    if (typeof (window.innerWidth) == 'number') { //Chrome

         stageWidth = window.innerWidth;

         stageHeight = window.innerHeight;

    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {

         stageWidth = document.documentElement.clientWidth;

         stageHeight = document.documentElement.clientHeight;

    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) { //IE9

         stageWidth = document.body.clientWidth;

         stageHeight = document.body.clientHeight;

    }
    if(mode == 'width'){
        return stageWidth;
    }else if(mode == 'height'){
        return stageHeight;
    }else{
        return [stageWidth,stageHeight];
    }
}

function platformCheck(){
	var filter = "win16|win32|win64|mac";

    if( navigator.platform  ){
        if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
            //alert("모바일 기기에서 접속");
        }else{
            //alert("PC에서 접속");
        }
    }
}

