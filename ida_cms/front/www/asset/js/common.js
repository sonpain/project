var dev;
var myWidth;

$(document).ready(function(){
	//search
	$('.logoWrap .searchBtn').on('click', function(){		
		if($(this).hasClass('on')){
			$('body').removeClass('fixed');
			$(this).removeClass('on');
			$(this).next().stop().slideUp(200, 'easeOutCubic');
			$('.gnbBg').hide();
		} else{
			$('body').addClass('fixed');
			$(this).addClass('on');
			$(this).next().stop().slideDown(200, 'easeOutCubic');

			if(dev == 'pc'){
				$('.gnbBg').show();
			}
		}
	});
	$('.logoWrap h1 a').on('focusin', function(){
		$('body').removeClass('fixed');
		$('.searchBtn').removeClass('on');
		$('.searchBgWrap').stop().slideUp(200, 'easeOutCubic');
		$('.gnbBg').hide();
	});
	$('.oneDepth > li > a').on('focusin', function(){
		if(dev == 'pc'){
			$('body').removeClass('fixed');
			$('.searchBtn').removeClass('on');
			$('.searchBgWrap').stop().slideUp(200, 'easeOutCubic');
		}
	});

	//gnb
	$('.allMenu > a').on('click', function(){
		$('body').addClass('fixed');		
		$('.gnbWrap').stop().animate({'left':'0'}, {duration: 300, easing: 'easeOutCubic'});
		$('.gnbBg').show();
	});
	$('.gnbWrap .close').on('click', function(){		
		$('body').removeClass('fixed');		
		$('.gnbWrap').stop().animate({'left':'-100%'}, {duration: 300, easing: 'easeOutCubic'});
		$('.oneDepth > li > a').removeClass('on');
		$('.twoDepth').stop().slideUp(300, 'easeOutCubic');
		$('.gnbBg').hide();
	});
	$('.oneDepth > li > a').on('click', function(){		
		if(dev == 'mc'){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				$(this).next().stop().slideUp(300, 'easeOutCubic');
			} else{
				$('.oneDepth > li > a').removeClass('on');
				$(this).addClass('on');
				$('.twoDepth').stop().slideUp(300, 'easeOutCubic');
				$(this).next().stop().slideDown(300, 'easeOutCubic');
			}
		}
	});

	//location
	$('.locationWrap .depthWrap > li > a').on('click',function(e){
        if($(this).parent('li').hasClass('on')){           
            $(this).parent('li').removeClass('on');
            $(this).next('.others').stop().slideUp(300, 'easeOutCubic');
        } else{         
            $('.depthWrap > li').removeClass('on');
            $(this).parent('li').addClass('on');
            $('.depthWrap .others').stop().slideUp(300, 'easeOutCubic');
            $(this).next('.others').stop().slideDown(300, 'easeOutCubic');
        }
    });
	$('.locationWrap .share').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.locationWrap .shareWrap').stop().slideUp(300, 'easeOutCubic');
		} else{
			$(this).addClass('on');
			$('.locationWrap .shareWrap').stop().slideDown(300, 'easeOutCubic');
		}
	});
	$('.locationWrap .home').on('focusin',function(){
        $('.depthWrap > li').removeClass('on');
        $('.depthWrap .others').stop().slideUp(300, 'easeOutCubic');
    });
    $('.locationWrap .depthWrap').on('focusin',function(){             
        $('.locationWrap .share').removeClass('on');
        $('.locationWrap .shareWrap').stop().slideUp(300, 'easeOutCubic');
    });
    $('.locationWrap .share').on('focusin',function(){
        $('.depthWrap > li').removeClass('on');
        $('.depthWrap .others').stop().slideUp(300, 'easeOutCubic');        
    });
    $('.locationWrap .print').on('focusin',function(){
        $('.depthWrap > li').removeClass('on');
        $('.depthWrap .others').stop().slideUp(300, 'easeOutCubic');        
        $('.locationWrap .share').removeClass('on');
        $('.locationWrap .shareWrap').stop().slideUp(300, 'easeOutCubic');
    });

    //footer ??????????????? ????????????
    $('.relatedSiteWrap > a').on('click', function(){
    	if($(this).hasClass('on')){
    		$(this).removeClass('on');
    		$(this).next().stop().slideUp(300, 'easeOutCubic');    		
    	} else{
    		$(this).addClass('on');
    		$(this).next().stop().slideDown(300, 'easeOutCubic');
    	}
    });

    $(document).on('mouseup' , function(e){
		e.preventDefault();
		
		var menuList = $('.locationWrap .depthWrap li.on');
		var subList = $('.locationWrap .depthWrap li.on .others');		
		if(menuList.length){
			var objPos = $(menuList).offset();			
			objPos.right = (objPos.left + menuList.width());			
			objPos.bottom = (objPos.top + menuList.height() + subList.height());			
			if( e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom ) {
				$(menuList).removeClass('on');	
				$(subList).stop().slideUp(300, 'easeOutCubic');			
			}
		}

		var shareMenuList = $('.locationWrap .share.on');
		var shareSubList = $('.locationWrap .shareWrap');		
		if(shareMenuList.length){
			var objPos = $(shareMenuList).offset();			
			objPos.right = (objPos.left + shareMenuList.width());			
			objPos.bottom = (objPos.top + shareMenuList.height() + shareSubList.height());			
			if( e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom ) {
				$(shareMenuList).removeClass('on');	
				$(shareSubList).stop().slideUp(300, 'easeOutCubic');			
			}
		}

		var footerMenuList = $('.relatedSiteWrap > a.on');
		var footerSubList = $('.relatedSiteWrap .siteList');		
		if(footerMenuList.length){
			var objPos = $(footerMenuList).offset();			
			objPos.right = (objPos.left + footerMenuList.width());			
			objPos.bottom = (objPos.top + footerMenuList.height() + footerSubList.height());			
			if( e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom ) {
				$(footerMenuList).removeClass('on');	
				$(footerSubList).stop().slideUp(300, 'easeOutCubic');			
			}
		}
	});

	$(window).resize(function(){
		viewResize();
	});

	viewResize();
	gnbFn();	
	
	//select
	$('select').selectric();

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
});

$.fn.datepicker.dates['kr'] = {
    days: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"],
    daysShort: ["???", "???", "???", "???", "???", "???", "???", "???"],
    daysMin: ["???", "???", "???", "???", "???", "???", "???", "???"],
    months: ["1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???"],
    monthsShort: ["1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???"],
    minDate: 0,
    maxDate: 10,
    titleFormat: "yyyy??? MM",
};

function resetFn(){
	$('body').removeClass('fixed');
	$('.gnbBg').hide();
	$('.logoWrap .searchBtn').removeClass('on');
	$('.logoWrap .searchBgWrap').hide();
	$('.oneDepth > li > a').removeClass('on');
	$('.twoDepth').hide();
	$('.locationWrap .depthWrap > li').removeClass('on');	
	$('.locationWrap depthWrap .others').hide();
	$('.locationWrap .share').removeClass('on');
	$('.locationWrap .shareWrap').hide();
}

function gnbFn(){
	var oneDepH = $('.oneDepth > li > a').innerHeight();
	var allDepH = oneDepH + $('.twoDepth').innerHeight();
	//console.log(allDepH);

	if(dev == 'pc'){
		$('.headerWrap').css({'paddingBottom':oneDepH});
		$('.gnbWrap').css({'height':oneDepH,'left':0});		
	} else{
		$('.headerWrap').css({'paddingBottom':0});
		$('.gnbWrap').css({'height':'100%','left':'-100%'});		
	}
	$('.oneDepth > li > a').on('mouseenter focusin', function(){
		if(dev == 'pc'){
			$('.gnbWrap').addClass('on');
			$('.gnbWrap').stop().animate({'height':allDepH}, {duration: 150, easing: 'easeOutCubic'});
			$('.twoDepth').show();
			$('.gnbBg').show();
		}
	});
	$('.oneDepth').on('mouseleave', function(){
		if(dev == 'pc'){			
			$('.gnbWrap').removeClass('on');			
			$('.gnbWrap').stop().animate({'height':oneDepH}, {duration: 200, easing: 'easeOutCubic'});						
			$('.twoDepth').hide();
			$('.gnbBg').hide();	
		}
	});
	$('.logoWrap .searchBtn').on('focusin', function(){
		if(dev == 'pc'){			
			$('.gnbWrap').removeClass('on');			
			$('.gnbWrap').stop().animate({'height':oneDepH}, {duration: 200, easing: 'easeOutCubic'});						
			$('.twoDepth').hide();
			$('.gnbBg').hide();	
		}
	});	
	$('.body').on('focusin', function(){
		if(dev == 'pc'){			
			$('.gnbWrap').removeClass('on');			
			$('.gnbWrap').stop().animate({'height':oneDepH}, {duration: 200, easing: 'easeOutCubic'});						
			$('.twoDepth').hide();
			$('.gnbBg').hide();	
		}
	});

	
}

function viewResize(){
	myWidth = stageWH('width');
	if(myWidth>900){
		if(dev == 'mc'){
			dev = 'pc';
			$('header').removeClass('mc');
			$('header').addClass(dev);
			resetFn();		
			gnbFn();	
			$('.headerWrap .topUtilWrap').insertBefore('.logoWrap');
			$('.gnbBg').insertBefore('.headerWrap');
		}else if(dev == undefined){
			dev = 'pc';
			$('header').removeClass('mc');
			$('header').addClass(dev);
			$('.headerWrap .topUtilWrap').insertBefore('.logoWrap');
			$('.gnbBg').insertBefore('.headerWrap');
		}
	} else{
		if(dev == 'pc'){
			dev = 'mc';
			$('header').removeClass('pc');
			$('header').addClass(dev);
			resetFn();
			gnbFn();
			$('.headerWrap .topUtilWrap').insertAfter('.oneDepth');
			$('.gnbBg').insertAfter('.gnbWrap');
		}else if(dev == undefined){
			dev = 'mc';
			$('header').removeClass('pc');
			$('header').addClass(dev);
			$('.headerWrap .topUtilWrap').insertAfter('.oneDepth');
			$('.gnbBg').insertAfter('.gnbWrap');
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
            //alert("????????? ???????????? ??????");
        }else{
            //alert("PC?????? ??????");
        }
    }
}

