let windowChk;
$(function () {
	// skipNav
	fn_SkipNav();

	// common Layout
	fn_Layout();

	// common function
	fn_Common();

    // content function
	fn_Content();
});

/* 모달 (Modal) */
const fn_layer = (name, width) => {
    /* 2025-11-06 */
    $('body, html').css({ overflow: 'hidden' })
    $('*:focus').addClass('focusTarget')
    $(`#${name}`).find('> .inner').css('width', width)
    $(`#${name}`).fadeIn(200).addClass('on')
    var pdt = $(`#${name}`).find(".inner").css('padding-top').replace(/[^-\d\.]/g, ''),
        pdb = $(`#${name}`).find(".inner").css('padding-bottom').replace(/[^-\d\.]/g, '');
    $(window).resize(function(){
		if($(window).width() > 767){
			$(`#${name}`).find('.cont').css({'max-height':$(`#${name}`).height()*0.9 - (Number(pdt) + Number(pdb))});
		}else{
			$(`#${name}`).find('.cont').css({'max-height':$(`#${name}`).height() - (Number(pdt) + Number(pdb))});
		}
	}).resize();
    /*-- 2025-11-06 */
}

/* 모달 (Modal) */
const fn_layer_close = (target) => {
    $('body, html').css({ overflow: 'auto' })
    $(target).closest('.layerPop').fadeOut(200).removeClass('on')
    $(target).find('> .inner').removeAttr('style')
    $('.focusTarget').focus().removeClass('focusTarget')
}
// 건너뛰기 링크 (Skip link)
const fn_SkipNav = () => {
    $("a[href^='#']").click(function (evt) {
        var anchortarget = $(this).attr('href')
        $(anchortarget).attr('tabindex', -1).focus()
        $(anchortarget).removeAttr('tabindex')
    })
    if (window.location.hash) $(window.location.hash).attr('tabindex', -1).focus()

    var skipNav = $('#skipNav a')
    skipNav.focus(function () {
        skipNav.removeClass('on')
        $(this).addClass('on')
    })
    skipNav.blur(function () {
        skipNav.removeClass('on')
    })

    // 접근성 텍스트
    $('.categoryList a.curr').attr('title', '선택됨')
    $('.scroll').attr('tabindex','0');
}
const fn_Layout = () => {
    /*** 관련사이트 바로가기 ****/
    let shortcutSiteBtn = $(".shortcutSite button"),
        shortcutSiteList = $(".shortcutSite > ul");
    shortcutSiteBtn.on("click", function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
            $(this).next().slideUp(200);
        }else{
            $(this).addClass("on");
            $(this).next().slideDown(200);
        }
    });
    // 영역 밖 클릭 시 닫기
    $(document).on("click", function(e) {
        if (!$(e.target).closest(".shortcutSite").length) {
            shortcutSiteBtn.removeClass("on").next().slideUp(200);
        }
    });
    // 마지막 목록 포커스 아웃 되면 목록 닫기
    shortcutSiteList.find("li:last-child").focusout(function(){
        shortcutSiteBtn.removeClass("on");
        shortcutSiteList.slideUp(200);
    });

    /*** gnb ***/
    const $gnbLi = $('.gnbUl > li');
    $gnbLi.on('mouseenter focusin', function(){
        $(this).find(".subDepth").stop().slideDown(200);
    });
    $gnbLi.on('mouseleave focusout', function(){
        $(this).find('.subDepth').stop().slideUp(200).scrollTop(0);
    });

    const gnbHtml = $('.gnbUl').html();
    $('.gnbMob .in').append(`<ul class="mobUl">${gnbHtml}</ul>`)
    $('#sitemap .in, .sitemap .in').append(`<ul class="sitemapGnb">${gnbHtml}</ul>`)

    /*** mobile menu ***/
    let gnbNavBtn = $(".gnbNav > li:not(.myPage, .home) > a");
    let mobUlList = $(".mobUl > li");
    let gnbNavCurrIndex = $(".gnbNav > li.curr").index();
    mobUlList.hide();
    mobUlList.eq(gnbNavCurrIndex).show();
    gnbNavBtn.on("click", function(){
        if($(this).parent("li").hasClass("curr")) {
            $(this).parent("li").removeClass("curr");
        }else {
            gnbNavBtn.parent("li").removeClass("curr");
            $(this).parent("li").addClass("curr");
        }
        let newIndex = $(this).parent("li.curr").index();
        mobUlList.hide().eq(newIndex).show();
    });
    $('.mobUl > li > a').on('click', function(e){
        e.preventDefault();
    })
    $('.mobUl > li .subDepthItem > ul > li > ul li').each(function(){
        const hasDepth = $(this).find('> ul').length
        if(!!hasDepth) $(this).addClass('hasDepth');
    })
    $(document).on('click', '.hasDepth > a', function(e){
        e.preventDefault();
        let li = $(this).closest('li');
        if(li.hasClass('open')) li.removeClass('open').find('> ul').slideUp(200);
        else li.addClass('open').find('> ul').slideDown(200);
    })
    $('.btnHam').on('click', function(e){
        e.preventDefault();
        $('.gnbMobArea').addClass('open');
    })
    $('.btnHamCls').on('click', function(e){
        e.preventDefault();
        $('.gnbMobArea').removeClass('open');
        $('.btnHam').focus();
    })

    /*** 통합검색 ***/
    $('.btnSearchForm').on('click', function(e){
        e.preventDefault();
        $('.headSearchWrap').fadeIn(200);
    })
    $('.btnHeaeSearCls').on('click', function(e){
        e.preventDefault();
        $('.headSearchWrap').fadeOut(200);
        $('.btnSearchForm').focus();
    })

    /*** 사이트맵 ***/
    $('.btnSitemap').on('click', function(e){
        e.preventDefault();
        $('#sitemap').slideDown(200);
    })
    $('.btnSitemapCls').on('click', function(e){
        e.preventDefault();
        $('#sitemap').slideUp(200);
        $('.btnSitemap').focus();
    })

    /*** lnb ***/
    $('.lnbUl li').each(function(){
        let hasDepth = $(this).find('> ul').length
        if(hasDepth) $(this).addClass('hasDepth');
    });
    $('.lnbUl a.curr').each(function(){
        $(this).parents('li').addClass('curr open');
        $(this).attr('title', '선택됨')
    })
    // $('.lnbUl li.hasDepth > a').on('click', function(e){
    //     e.preventDefault();
    //     let li = $(this).closest('li'),
    //         chkOpen = li.hasClass('open');
    //         console.log(chkOpen, li)
    //     if(chkOpen) {
    //         li.find('> ul').slideUp(200);
    //         li.removeClass('open');
    //     }else{
    //         li.find('> ul').slideDown(200);
    //         li.addClass('open');
    //     }
    // })

    /*** top ***/
    $('.btnTop').on('click', function(){
        $('html,body').animate({scrollTop:0}, 200);
        $('#container').attr('tabindex', -1).focus()
        $('#container').removeAttr('tabindex')
    })
    
    /*** quick menu ***/
    $('.btnQuick').on('click', function(){
        $('.quick').toggleClass('open').find('> ul').slideToggle(200);
    })
}

const fn_Common = () => {
    // title
    const projectName = getComputedStyle(document.documentElement).getPropertyValue('--project-name'),
        titleDepth = $('.breadcrumb ol li').not('.home, .short')
    $('title').text(projectName)
    titleDepth.each(function () {
        let title = $('title').text()
        $('title').text(`${$(this).text()} < ${title}`)
    })

    // 아코디언 (Accordion)
    $('.accordion').each(function () {
        const accordion = $(this),
            accordionRow = accordion.find('> dl')

        accordionRow.not('.curr').find('button').append(`<span class="hide">닫힘</span>`)
        accordion.on('click', '.btnAccor', function () {
            let currIndex = $(this).closest('dl').index(),
                hasClass = $(this).closest('dl').hasClass('curr')
            currEvent(currIndex, hasClass)
        })
        const currEvent = (currIndex, hasClass) => {
            accordionRow.removeClass('curr').find('> dt .hide').text('닫힘')
            accordionRow.find('> dd').slideUp(200)
            if (!hasClass) {
                accordionRow.eq(currIndex).find('> dd').slideDown(200)
                accordionRow.eq(currIndex).addClass('curr').find('> dt .hide').text('열림')
            }
        }
    })

    // 탭 (Tab)
    $('.tabFunc').each(function () {
        let currIndex = 0
        const tab = $(this)

        // 두 가지 구조 구분
        const isCategory = tab.find('> .tabTit .swiper-slide a').length > 0

        // 버튼 그룹/버튼 단위 선택자
        const tabTit = isCategory
            ? tab.find('> .tabTit .swiper-slide a') // swiper 구조
            : tab.find('> .tabTit ul li')           // 기본 구조

        const tabCont = tab.find('> .tabCont > div')

        // 공통 탭 전환 함수
        const currEvent = (currIndex) => {
            if (isCategory) {
                // a 태그에 curr
                tabTit.removeClass('curr').removeAttr('title')
                tabTit.eq(currIndex).addClass('curr').attr('title', '선택됨')
            } else {
                // li 태그에 curr
                tabTit.removeClass('curr').find('> a').removeAttr('title')
                tabTit.eq(currIndex).addClass('curr').find('> a').attr('title', '선택됨')
            }
            tabCont.hide().eq(currIndex).show()
        }

        // 각 버튼 순회
        tabTit.each(function (idx) {
            const tabTitle = isCategory ? $(this).text() : $(this).find('> a').text()
            tabCont.eq(idx).prepend(`<h3 class="hide">${tabTitle}</h3>`)

            // 초기 currIndex
            if ($(this).hasClass('curr')) currIndex = idx

            // 클릭 이벤트용 실제 버튼
            const btn = isCategory ? $(this) : $(this).find('> a')

            btn.not('.disabled').on('click', function (e) {
                e.preventDefault()
                currEvent(idx)
            })

            btn.filter('.disabled').on('click', function (e) {
                e.preventDefault()
            })
        })

        // 초기 실행
        currEvent(currIndex)
    })
    setTimeout(function(){
        updatePaddingByLockButton();
    },200)

    // 셀렉트 (Select)
    $('.select').not('.disabled').each(function () {
        const select = $(this);
        select.find('> button').on('click', function () {
            select.find('> ul').slideToggle()
            select.find('> ul > li').eq(0).find('a').focus()
            select.toggleClass('curr')
        })

    })
    $('*').on('focus',function () {
        const hasSelect = $(this).closest('.select').length;
        if (!hasSelect) {
            $('.select > ul').slideUp(200)
            $('.select').removeClass('curr')
        }
    })
    
    // 달력 (Calendar)
    $('.date input').datepicker({
        dateFormat: 'yy-mm-dd',
        showOtherMonths: true,
        showMonthAfterYear: true,
        changeYear: true,
        changeMonth: true,
        showOn: 'both',
        buttonImage: '../assets/images/component/ico-input-cal.svg',
        buttonImageOnly: true,
        buttonText: '선택',
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        // dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        // dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    })

    // 달력 (Calendar)
    $('.dateRange:not(.single) input').daterangepicker({
        locale: {
            format: 'YYYY/MM/DD',
            cancelLabel: '취소',
            applyLabel: '확인',
            // daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        },
        singleDatePicker: false, // datepicker랑 동일한 기능
        showDropdowns: true,
    })

    // 달력 (Calendar)
    $('.dateRange.single input').daterangepicker({
        locale: {
            format: 'YYYY/MM/DD',
            cancelLabel: '취소',
            applyLabel: '확인',
            // daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        },
        singleDatePicker: true, // datepicker랑 동일한 기능
        showDropdowns: true,
    })

    // 달력 (Calendar)
    if($(".year .yearpicker").length){
        $(".year .yearpicker").yearpicker();
    }

    /* 파일 업로드 (File upload) */
    $('.fileWrap').each(function () {
        const fileWrap = $(this).closest('.fileWrap')
        fileWrap.find('.btnUpload').on('click', function () {
            $(this).closest('.fileBtn').find('input[type=file]').trigger('click')
        })
        fileWrap.on('click', '.btnDelete', function () {
            fileWrap.find('.fileInput').val('')
        })
        fileWrap.find('input[type=file]').on('change', function (e) {
            let fileName = e.target.files[0].name;
            fileWrap.find('.fileInput').val(fileName);
        })
    })

     // 툴팁 (Tooltip)
    $('.tooltip').each(function(){
        let tooltip = $(this),
            btn = $(this).find('> button, > a, .btnTooltip'),
            btnCls = $(this).find('.btnTooltipCls');
        btn.on('click', function(e){
            e.stopPropagation();
            e.preventDefault();
            let hasClass = tooltip.hasClass('open');
            if(hasClass) tooltip.removeClass('open');
            else tooltip.addClass('open').closest('body').addClass('tooltipOn');
            $(this).addClass('focusTarget'); // 웹접근성
            btnCls.focus(); // 웹접근성
        })
        btnCls.on('click', function(e){
            e.stopPropagation();
            tooltip.removeClass('open');
            $('.focusTarget').focus().removeClass('focusTarget'); // 웹접근성
        })
    });
    $(document).on('click', function(e){
        $('.tooltip.open').removeClass('open');
    })

    // 체크박스 전체 선택
    $('.checkboxWrap').each(function(){ 
        let hasAllBtn = $(this).find('.checkboxAll').length;
        if(!!hasAllBtn) {
            let $this = $(this),
                inputTotal = $this.find('.checkbox input').length;
            $(this).find('.checkbox input').on('change', function(){
                let inputCurr = $this.find('.checkbox input:checked').length;
                inputTotal = $this.find('.checkbox input').length;
                if(inputTotal === inputCurr) $this.find('.checkboxAll input').prop('checked', true);
                else $this.find('.checkboxAll input').prop('checked', false);
            })
            $(this).find('.checkboxAll input').on('change', function(){
                let check = $(this).is(':checked');
                if(check)  $this.find('.checkbox input').prop('checked', true);
                else $this.find('.checkbox input').prop('checked', false);
            })
        }
    })

    // 테이블 체크박스 전체 선택
    $('table').each(function(){
        let hasAllBtn = $(this).find('thead .tableChk').length;
        if(!!hasAllBtn) {
            let $this = $(this),
                inputTotal = $this.find('tbody .checkbox input').length;
            $(this).find('tbody .checkbox input').on('change', function(){
                let inputCurr = $this.find('tbody .checkbox input:checked').length;
                inputTotal = $this.find('tbody .checkbox input').length;
                if(inputTotal === inputCurr) $this.find('thead .checkbox input').prop('checked', true);
                else $this.find('thead .checkbox input').prop('checked', false);
            })
            $(this).find('thead .checkbox input').on('change', function(){
                let check = $(this).is(':checked');
                if(check)  $this.find('tbody .checkbox input').prop('checked', true);
                else $this.find('tbody .checkbox input').prop('checked', false);
            })

        }
    })

    // 비민번호 표시/숨김 버튼
    let $btnPsswrdToggle = $(".btnPsswrdToggle");
    $btnPsswrdToggle.each(function(){
        $(this).on("click",function(){
            $(this).toggleClass("on");
            if($(this).hasClass("on")) {
            $(this).text("비밀번호 숨김");
        }else{
            $(this).text("비밀번호 표시");
        }
        });
    });
    
}

const fn_Content = () => {
     $('.history .swiper').each(function(id){
		$(this).addClass(`hisSlide${id}`);
		const historySlide = new Swiper(`.hisSlide${id}`, {
			// navigation: {
			// 	nextEl: `.hisSlide${id} .swiper-button-next`,
			// 	prevEl: `.hisSlide${id} .swiper-button-prev`,
			// },
            scrollbar: {
                el: `.hisSlide${id} .swiper-scrollbar`,
                draggable: true,
            },
            enabled: true,
			observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 40,
            mousewheel: true,
            on: {
                slideChange: function(swiper){
                    $(swiper.el).find('.swiper-slide a, .swiper-slide button').attr('tabindex','-1');
                    $(swiper.el).find('.swiper-slide').eq(swiper.activeIndex).find('a, button').attr('tabindex','0');
                }
            },
		});
        
        // 2025-10-14 추가
        function updateSwiperControls() {
            if (window.innerWidth <= 767) {
                historySlide.allowTouchMove = false;
                historySlide.mousewheel.disable();
            } else {
                historySlide.allowTouchMove = true;
                historySlide.mousewheel.enable();
            }
        }
        updateSwiperControls();
        window.addEventListener("resize", updateSwiperControls);
	})

    // 회원가입 step 2025-11-14 수정
    let stepSwiper = new Swiper(".stepSwiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                spaceBetween: 0,
                allowTouchMove: true,
            },
            601: {
                spaceBetween: 0,
                allowTouchMove: false,
            },
            768: {
                spaceBetween: 20,
                allowTouchMove: false,
            }
        },
        on: {
            init: function () {
                // 현재 스탭 단계로 슬라이드 이동
                const idx = document.querySelector('.stepSwiper .swiper-slide.curr');
                if (idx) {
                    const i = [...idx.parentNode.children].indexOf(idx);
                    this.slideTo(i, 0);
                }
            }
        }
    });
    let $stepSwiper = $(".stepSwiper");
    $stepSwiper.each(function(){
        let $stepSlide = $(this).find(".swiper-slide");
        if($stepSlide.length < 4) {
             $(this).addClass("stepShort");
        }else{
            $(this).removeClass("stepShort");
        }
    });

    $('#agreeAll').click(function(){
		let isCheck = $(this).is(':checked');
		if(isCheck) {
			$('.agreeChk input[value=n]').prop('checked', false);
			$('.agreeChk input[value=y]').prop('checked',true);
		}else{
			$('.agreeChk input[value=y]').prop('checked', false);
			$('.agreeChk input[value=n]').prop('checked',true);
		}
	})

	$('.agreeChk input').click(function(){
		let isAllCheck = 0,
			totalCount = $('.agreeChk').length;
		$('.agreeChk').each(function(){
			let isValCheck = $(this).find('input:checked').val();
			if(isValCheck === 'y') isAllCheck ++;
		})
		if(isAllCheck == totalCount) $('#agreeAll').prop('checked', true);
		else $('#agreeAll').prop('checked', false);
	})

    /* 검색필터 */
    $('.searchArea').each(function(){
        let btnDetail = $(this).find('.btnSearchDetail');
        btnDetail.on('click', function(){
            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $(this).closest(".in").find(".searchDetail").slideUp(200);
                $(this).text('고급검색');
            }else{
                $(this).addClass('open');
                $(this).closest(".in").find(".searchDetail").slideDown(200);
                $(this).text('기본검색');
            }
            
        });
    })

    // 모바일 셀렉트
    let mbSelectBtn = $(".mbSelect > a");
    mbSelectBtn.on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("on");
        if($(this).hasClass("on")){
            $(this).next().slideDown(200);
        }else{
            $(this).next().slideUp(200);
        }
    });
    // 영역 밖 클릭 시 닫기
    $(document).on("click", function(e) {
        if (!$(e.target).closest(".mbSelect").length) {
            mbSelectBtn.removeClass("on").next().slideUp(200);
        }
    });

    /*** 소담인프라 ***/
    // 시설 사진 스와이퍼
    var imgSwiper = new Swiper(".imgSwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    //  나와 가까운 소담인프라 목록 스와이퍼
    var sodamInfraSwiper = new Swiper(".sodamInfraSwiper", {
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });

    // 지도 안 키워드 버튼 클릭
    let keywordMore = $(".sodamKeywordList .moreBox button");
    keywordMore.on("click", function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on").next().hide();
        }else{
            $(this).addClass("on").next().css("display","flex");
        }
    });
    // 영역 밖 클릭 시 닫기
    $(document).on("click", function(e) {
        if (!$(e.target).closest(".sodamKeywordList").length) {
            keywordMore.removeClass("on").next().hide();
        }
    });

    // 팝업 안 스와이퍼
    var inSwiper = new Swiper(".inSwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // 이달의 지원 프로그램 스와이퍼
    var monthPrgrmSwiper = new Swiper(".monthPrgrmSwiper", {
		slidesPerView: 2,
		spaceBetween: 16,
		grid: {
			rows: 2,
			// fill: "row", 
		},
		slidesPerGroup :4,
		navigation: {
			nextEl: ".monthPrgrmSwiperWrap .swiper-button-next",
			prevEl: ".monthPrgrmSwiperWrap .swiper-button-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
				grid: {
					rows: 1,
				},
			},
		},
    });
    // 이달의 지원 프로그램 grid 이슈 해결
    setTimeout(updateSlideHeight, 200);

    // 지원 사업정보 스와이퍼
    var sodamSprtPrgrmSwiper = new Swiper(".sodamSprtPrgrmSwiper", {
		slidesPerView:1,
		spaceBetween: 16,
		grid: {
			rows: 4,
			fill: "row"
		},
		navigation: {
			nextEl: ".sodamSprtPrgrmSwiperWrap .swiper-button-next",
			prevEl: ".sodamSprtPrgrmSwiperWrap .swiper-button-prev",
		},
		breakpoints: {
        768: {
			slidesPerView: 2,
			grid: {
				rows: 2,
			},
        },
		1471: {
			slidesPerView: 4,
			grid: {
				rows: 1,
			},
        },
      },
    });

    // 소담스퀘어 올해의 사장님 스와이퍼
    var thisYearOwnerSwiper = new Swiper(".thisYearOwnerSwiper", {
		slidesPerView:1,
		spaceBetween: 16,
		grid: {
			rows: 3,
			fill: "row"
		},
		navigation: {
			nextEl: ".thisYearOwnerSwiperWrap .swiper-button-next",
			prevEl: ".thisYearOwnerSwiperWrap .swiper-button-prev",
		},
		breakpoints: {
            1471: {
                spaceBetween: 16,
                slidesPerView: 3,
                grid: {
                    rows: 1,
                },
            },
      },
    });

    /*** 마이페이지 ***/
    /* 나의 활동 */
    var swiper = new Swiper(".actSwiper", {
        slidesPerView: 1,
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });

    /* 상품관리 */
    $('.itemView').each(function(){
        let itemClick = $('.itemClick');
        itemClick.click(function(){
            if($(this).hasClass('open')){
                $(this).removeClass('open').find('span').text('상품정보 펼쳐보기');
                $(this).siblings().removeClass('open');
            }else{
                $(this).addClass('open').find('span').text('상품정보 접기');
                $(this).siblings().addClass('open');
            }
        })
    })

    if($(".thumbSwiper").length){
        var thumbSwiper = new Swiper(".thumbSwiper", {
            slidesPerView: "auto",
            navigation: {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
            },
            spaceBetween: 10,
            centeredSlides: true,
            // breakpoints: {
            //     767: {
            //         spaceBetween: 10,
            //     },
            // },
        });
    }

    var itemImg = $(".itemImg"),
        dImg = itemImg.find(".img img"),
        btnThumb = itemImg.find(".thumbSwiper .swiper-slide");
    btnThumb.click(function(e){
        e.preventDefault();
        var i = $(this).find("img").attr("src");
        btnThumb.removeClass("on");
        $(this).addClass("on");
        dImg.attr("src", i);
    });

    $('.btnTxt.fold').each(function(){
        const $div = $(this).closest(".titArea").nextAll("div").first();
        $(this).click(function(){
            if($(this).hasClass('open')){
                $(this).removeClass('open').text('접기');
                $div.slideDown(200);
            }else{
                $(this).addClass('open').text('펼치기');
                $div.slideUp(200);
            }
        })
    })

    var swiper = new Swiper(".categorySwiper", {
		slidesPerView: "auto",
		spaceBetween: 5,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

    /* 지원사업 신청내역 */
    if($('.anchorWrap').length){
        $('body, #container .contents > .inner, .subCont > div').css({'overflow':'visible'});
    }
    var anchor = $(".anchorTit");
    anchor.find("a").click(function(e){
        e.preventDefault();
        var id = $(this).attr("href");
        if($(this).parent().hasClass("curr")){
            anchor.find("li").removeClass("curr");
        }else{
            anchor.find("li").removeClass("curr");
            $(this).parent().addClass("curr");
        }
        $("html, body").animate({scrollTop:$(id).offset().top - 180},300);
    });

    $(window).scroll(function(){
        var sclTop = $(window).scrollTop();
        anchor.css({"display":"block"});
        var $cont = $("h3[id^='anchor']");
        $.each($cont, function(index, item){
            var $target = $cont.eq(index),
                $targetTop = $target.offset().top - 250;
            if($targetTop <= sclTop){
                anchor.find("li").removeClass("curr");
                anchor.find("li").eq(index).addClass("curr");
            }
            
        });
    });

    /* 이용현황 및 내역(리사이즈) */
    let imgSquare = $('.imgSquare');
    function setSquare() {
        imgSquare.each(function () {
            let $width = $(this).width();
            $(this).height($width);
        });
    }

    setSquare();

    // 리사이즈 시 실행
    $(window).on('resize', function () {
        setSquare();
        setTimeout(function(){
            updatePaddingByLockButton();
        },200);

        // 이달의 지원 프로그램 grid 이슈 해결
        setTimeout(updateSlideHeight, 30);
    });

    // 예약자 리뷰
    $('.scope').each(function(){
        const $el = $(this);
        let rating = parseFloat($el.data('rating')) || parseFloat($el.text()) || 0;
        rating = Math.max(0, Math.min(5, rating)); // 0~5 사이 제한

        // 소수점 1자리까지 고정
        const displayRating = rating.toFixed(1);

        // 이미지 경로
        const fullStar = '../assets/images/content/ico-star.png';       // 꽉찬 별
        const halfStar = '../assets/images/content/ico-star-half.png';  // 반 별
        const emptyStar = '../assets/images/content/ico-star-empty.png';// 빈 별

        // 별 표시 컨테이너
        const $stars = $('<span class="rating" role="img" aria-label="'+displayRating+'"></span>');

        // 별 이미지 5개 생성
        for (let i = 1; i <= 5; i++) {
            let src;
            if (rating >= i) {
            src = fullStar;
            } else if (rating >= i - 0.5) {
            src = halfStar;
            } else {
            src = emptyStar;
            }
            $stars.append('<img src="'+src+'" alt="'+(i <= rating ? '별' : '빈 별')+'" />');
        }

        // 이미지 뒤에 숫자(소수점 1자리) 추가
        $stars.append('<span class="rating-num">'+displayRating+'</span>');

        // 기존 span 안에 별 이미지와 숫자 추가
        $el.empty().append($stars);
    });

    // 2025-11-06
    // ESG 자가진단소개
    $('.esgYears').each(function () {
        const esgYear = $(this).find('> dl');

        esgYear.find('a').append(`<span class="hide">열림</span>`);
        esgYear.on('click', 'a', function (e) {
            e.preventDefault();
            console.log('클릭');
            if($(this).hasClass('curr')){
                $(this).removeClass('curr');
                $(this).parent().next().slideUp(200);
                $(this).find('.hide').text('열림');
            }else{
                $(this).addClass('curr');
                $(this).parent().next().slideDown(200);
                $(this).find('.hide').text('닫힘');
            }
        })
    })
    //-- 2025-11-06
}

// 소담인프라 팝업
const sodamMap_layer = (name, width) => {
    $('*:focus').addClass('focusTarget')
    $(`#${name}`).css('width', width)
    $(`#${name}`).fadeIn(200).addClass('on')
    $(`#${name}`).find('> .popCont').attr('tabindex', 0).focus();
}

// 소담인프라 팝업 닫기
const sodamMap_layer_close = (target) => {
    $(target).closest('.sodamMapPop').fadeOut(200).removeClass('on')
    $(target).removeAttr('style')
    $('.focusTarget').focus().removeClass('focusTarget')
}

// 탭 스와이퍼 버튼 존재 여부에 따라 스와이퍼에 패딩 값 업데이트
const updatePaddingByLockButton = () => {
    let $targets = $(".categorySwiper").not(".squareType .categorySwiper");
    let hasLock = $targets.find(".swiper-button-lock").length > 0;
    if(hasLock) {
        $targets.removeClass("btnLock");
    }else{
        $targets.addClass("btnLock");
    }

    if($(window).width() < 767) {
        $(".squareType .categorySwiper").addClass("btnLock");
    }else{
        $(".squareType .categorySwiper").removeClass("btnLock");
    }
}

// 이달의 지원 프로그램 모바일 화면 gird 화면 이슈 해결
function updateSlideHeight() {
    const $slide = $('.monthPrgrmSwiperWrap .swiper-slide').first();
    if ($slide.length === 0) return;

    const slideWidth = $slide.outerWidth(); 
    const $wrap = $('.monthPrgrmSwiper');
    $wrap.css('--slide-width', slideWidth + 'px'); 
}