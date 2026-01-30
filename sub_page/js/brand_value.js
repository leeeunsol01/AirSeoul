document.addEventListener('DOMContentLoaded', function(){
    $('.lang_select ul li').on('click', function() {
        const text = $(this).text();
    
        $(this).closest('.lang_select').find('.select_btn').text(text);
        $(this).parent().slideUp(200);
    });
    
    $(document).on('click', (e) => {
        if(!$(e.target).closest('.lang_select').length){
            $('.lang_select ul').slideUp(200);
        }
    });

    $('.select_btn').on('click', function() {
        $(this).next('ul').stop().slideToggle(200);
    });
    // mobile_gnb_lang
    
    const headerHeight = 130;
    
    $('.gnb_meta a').on('click', function(e){
        e.preventDefault();
    
        const menuScroll = $(this).attr('href');
        const menuTop = $(menuScroll).position().top + $('.mo_gnb').scrollTop() - headerHeight;
    
        $('.mo_gnb').stop().animate({
            scrollTop: menuTop
        }, 500);
    
        $(this).addClass('meta_on').siblings().removeClass('meta_on');
    });
    // mobile_gnb_metapo

    const searchInput = document.querySelector('.header_search');
    const searchBox = document.querySelector('.search_box');
    const searchTxts = document.querySelectorAll('.search_txt');

    searchInput.addEventListener('click', () =>{
        searchBox.classList.add('search_open');
    });

    document.addEventListener('click', (e) => {
        if(!e.target.closest('.header_search') &&
        !e.target.closest('.search_box')){
            searchBox.classList.remove('search_open');
        }
    });

    searchTxts.forEach(button => {
        button.addEventListener('click', () => {
            searchInput.value = button.textContent.replace('#','');
            searchInput.focus();
        });
    });
    // pc_search

    document.querySelectorAll('.view_detail button').forEach(btn => {
        btn.addEventListener('click', () => {
            const detail = btn.closest('.view_detail').querySelector('.detail_txt');
            const arrow = btn.querySelector('.arrow');

            detail.classList.toggle('open');
            arrow.classList.toggle('arrow_on');
        });
    });
    // mobile_footer_detail
});