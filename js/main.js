let priceDate = {};

document.addEventListener('DOMContentLoaded', async () =>{
    const response = await fetch('./js/flightPrices.json');
    const data = await response.json();

    priceDate = data;
    
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

    const metaLinks = document.querySelectorAll('.gnb_meta a');
    const sections = document.querySelectorAll('.gnb_bottom .menu');
    const scrollContainer = document.querySelector('.mo_gnb'); 

    function activateMetaOnScroll() {
        const scrollY = scrollContainer.scrollTop; 
        const containerHeight = scrollContainer.clientHeight;

        let activeIndex = 0;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollY + containerHeight / 2 >= sectionTop + sectionHeight / 2) {
                activeIndex = index;
            }
        });

        metaLinks.forEach((link, i) => {
            link.classList.toggle('meta_on', i === activeIndex);
        });
    }
    scrollContainer.addEventListener('scroll', activateMetaOnScroll);
    activateMetaOnScroll();
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

    let isOneWay = false;

    function fullReset() {
        startTd = null;
        endTd = null;
        calenderBtnStart = null;
        calenderBtnEnd = null;
        const oneWayArrow = document.querySelector('.one_way_arrow');
        const toDayH3 = document.querySelector('.to_day');
        const fromToContainer = document.querySelector('.day_from_to');
        
        if (dayTds) {
            dayTds.forEach(td => td.classList.remove('day_select', 'day_between'));
        }
        if (fromDayEl) fromDayEl.textContent = '가는 날';
        if (toDayEl) toDayEl.textContent = '오는 날';
        
        const activeReserClass = isOneWay ? '.quick_reser02' : '.quick_reser01';
        const container = document.querySelector(activeReserClass);

        if (isOneWay) {
            if (oneWayArrow) oneWayArrow.classList.add('hidden');
            if (toDayH3) toDayH3.classList.add('hidden');
            if(fromToContainer) fromToContainer.classList.add('center');
            if (fromDayEl) fromDayEl.textContent = '가는 날';
        } else {
            if (arrow) arrow.classList.remove('hidden');
            if (toDayH3) hideDayH3.classList.remove('hidden');
            if(fromToContainer) fromToContainer.classList.remove('center');
            if (fromDayEl) fromDayEl.textContent = '가는 날';
            if (toDayEl) toDayEl.textContent = '오는 날';
        }

        if (container) {
            const fCity = container.querySelector('.from_city');
            const tCity = container.querySelector('.to_city');
            const fCode = container.querySelector('.from_code');
            const tCode = container.querySelector('.to_code');
            const dInput = container.querySelector('.days_input');

            if (fCity) fCity.textContent = '출발지';
            if (tCity) tCity.textContent = '도착지';
            if (fCode) fCode.textContent = 'OUT'; 
            if (tCode) tCode.textContent = 'IN';
            
            if (dInput) {
                dInput.textContent = isOneWay ? '가는 날' : '가는 날 ~ 오는 날';
            }

            const adultNum = container.querySelector('.passenger.adult .num');
            const childNum = container.querySelector('.passenger.child .num');
            const infantNum = container.querySelector('.passenger.infant .num');
            
            if (adultNum) adultNum.textContent = '1';
            if (childNum) childNum.textContent = '0';
            if (infantNum) infantNum.textContent = '0';
            const passengerInput = container.querySelector('.passenger_input');
            if (passengerInput) {
                passengerInput.textContent = '성인 1';
            }
        }
    }

    const calRestBtn = document.querySelector('.calender_reset');

    if(calRestBtn){
        calRestBtn.addEventListener('click', () => {
            fullReset();
            resetTemp();
            updateTotalPrice();
        });
    }

    const oneWayBtn = document.getElementById('one_way_btn');
    const roundTripBtn = document.getElementById('round_trip_btn');

    if(oneWayBtn) {
        oneWayBtn.addEventListener('change', () => {
            isOneWay = true;
            fullReset();
        });
    }

    if(roundTripBtn) {
        roundTripBtn.addEventListener('change', () => {
            isOneWay = false;
            fullReset();
        });
    }
    // trip
    
    const calenderBox = document.querySelector('.calender_box');
    const calenderClose = calenderBox.querySelector('.close_img');
    const calenderBtn = document.querySelector('.calender_btn');
    
    document.querySelectorAll('.days').forEach(target => {
        target.addEventListener('click', () => {

            const fromCity = document.querySelector('.from_city').textContent.trim();
            const toCity = document.querySelector('.to_city').textContent.trim();

            if (fromCity === '출발지' || toCity === '도착지') return;

            const isTargetOneWay = target.closest('.quick_reser02') !== null;

            if (isOneWay !== isTargetOneWay) {
                isOneWay = isTargetOneWay;
                fullReset();
            }
            if (calenderBox) {
                calenderBox.classList.add('calender_open');
                document.body.classList.add('no_scroll');
                fillPrices();
                restoreCalender(); 
            }

            calenderBox.classList.add('calender_open');
            document.body.classList.add('no_scroll');
            
            fillPrices();
            restoreCalender(); 
        });
    });
    
    calenderClose.addEventListener('click', (e) =>{
        e.stopPropagation();
    
        resetTemp();
        closeCalender();
    });

    window.addEventListener('mousedown', (e) => {
        if (calenderBox.classList.contains('calender_open')) {
            const isClickInside = calenderBox.contains(e.target);
            const isClickInput = e.target.closest('.days');
            
            if (!isClickInside && !isClickInput) {
                resetTemp(); 
                closeCalender();
            }
        }
    });
    
    function closeCalender(){
        calenderBox.classList.remove('calender_open');
        document.body.classList.remove('no_scroll');
        calenderBox.scrollTop = 0;
    }
    // calender_open_close
    
    const dayTds = calenderBox.querySelectorAll('.calender td');
    const fromDayEl = document.querySelector('.from_day');
    const toDayEl = document.querySelector('.to_day');
    
    let startTd = null;
    let endTd = null;
    
    let calenderBtnStart = null;
    let calenderBtnEnd = null;
    
    function fillPrices() {
        dayTds.forEach(td => {
            const dateInfo = getDateInfo(td);
            if(!dateInfo) return;
    
            const yearMonth = dateInfo.fullDate.slice(0, 7);
            const dayData = priceDate[yearMonth]?.find(d => d.date === dateInfo.fullDate);
    
            const priceEl = td.querySelector('.day_price');

            if(dayData){
                if(priceEl){
                    priceEl.textContent = dayData.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            }else{
                priceEl.textContent = '';
            }
        });
    }
    
    function getDateInfo(td){
        const calender = td.closest('.calender');
        const yearMonth = calender.querySelector('h3').textContent;
        const dayText = td.querySelector('p')?.textContent.trim();
    
        if(!dayText) return null;
    
        const [year, month] = yearMonth.split('.').map(v => v.trim());
        const yearMonthJson = `${year}-${month.padStart(2, '0')}`;
    
        return {
            fullDate: `${yearMonthJson}-${dayText.padStart(2, '0')}`,
            dateObj: new Date(year, month - 1, dayText)
        };

    }
    
    function hightlightBetween(){
        const tdArray = [...dayTds];
        const startIndex = tdArray.indexOf(startTd);
        const endIndex = tdArray.indexOf(endTd);
    
        const [min, max] = startIndex < endIndex ?
            [startIndex, endIndex] : [endIndex, startIndex];
            
        tdArray.forEach((td, idx) => {
            if(idx > min && idx < max){
                td.classList.add('day_between');
            }
        });
    };
    
    dayTds.forEach((td) => {
        td.addEventListener('click', () => {
            const info = getDateInfo(td);
            if(!info) return;

            if (isOneWay) {
                dayTds.forEach(t => t.classList.remove('day_select', 'day_between'));
                startTd = td;
                td.classList.add('day_select');
                fromDayEl.textContent = info.fullDate;
                toDayEl.textContent = ''; 
                endTd = null;
                document.querySelector('.one_way_arrow')?.classList.add('hidden');
                document.querySelector('.to_day')?.classList.add('hidden');
            } else {
                if (!startTd || (startTd && endTd)) {
                    dayTds.forEach(t => t.classList.remove('day_select', 'day_between'));
                    startTd = td;
                    endTd = null;
                    td.classList.add('day_select');
                    fromDayEl.textContent = info.fullDate;
                    toDayEl.textContent = '오는 날';
                    document.querySelector('.one_way_arrow')?.classList.remove('hidden');
                    document.querySelector('.to_day')?.classList.remove('hidden');
                } else if (!endTd) {
                    const startInfo = getDateInfo(startTd);
                    if (info.dateObj < startInfo.dateObj) {
                        startTd.classList.remove('day_select');
                        startTd = td;
                        td.classList.add('day_select');
                        fromDayEl.textContent = info.fullDate;
                    } else {
                        endTd = td;
                        td.classList.add('day_select');
                        toDayEl.textContent = info.fullDate;
                        hightlightBetween();
                    }
                }
            }
            updateTotalPrice();
        });
    });
    
    
    function restoreCalender(){
        if(!calenderBtnStart || !calenderBtnEnd) return;
        
        startTd = calenderBtnStart;
        endTd = calenderBtnEnd;
        
        startTd.classList.add('day_select');
        endTd.classList.add('day_select');
        
        fromDayEl.textContent = getDateInfo(startTd).fullDate;
        toDayEl.textContent = getDateInfo(endTd).fullDate;
        
        hightlightBetween();
    }
    
    function resetTemp(){
        dayTds.forEach(td => {
            td.classList.remove('day_select', 'day_between');
        });
        
        startTd = null;
        endTd = null;
        
        fromDayEl.textContent = '가는 날';
        toDayEl.textContent = '오는 날';
    }

    function updateTotalPrice(){
        const totalEl = document.querySelector('.total_price');
        const fromDate = fromDayEl.textContent;
        const toDate = toDayEl.textContent;

        let total = 0;

        if(fromDate){
            const fromYearMonth = fromDate.slice(0, 7);
            const fromData = priceDate[fromYearMonth]?.find(d => d.date === fromDate);
            
            if(fromData) total += Number(fromData.price);
        }
        
        if(toDate){
            const toYearMonth = toDate.slice(0, 7);
            const toData = priceDate[toYearMonth]?.find(d => d.date === toDate);
            
            if(toData) total += Number(toData.price);
        }

        totalEl.textContent = total > 0 ? total.toLocaleString() + ' 원' : '0 원';
    }

    calenderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeReser = isOneWay ? '.quick_reser02' : '.quick_reser01';
        const targetInput = document.querySelector(`${activeReser} .days_input`);

        if (isOneWay) {
            if (!startTd) return;
            calenderBtnStart = startTd;
            targetInput.textContent = fromDayEl.textContent;
        } else {
            if (!startTd || !endTd) return;
            calenderBtnStart = startTd;
            calenderBtnEnd = endTd;
            targetInput.textContent = `${fromDayEl.textContent} ~ ${toDayEl.textContent}`;
        }
        closeCalender();
    });

    const calPrevBtn = document.querySelector('.calender_prev');
    const calNextBtn = document.querySelector('.calender_next');
    const calSets = document.querySelectorAll('.calender_set');

    let currentIndex = 0;

    function showSet(index){
        calSets.forEach(set => set.classList.remove('cal_active'));
        calSets[index].classList.add('cal_active');
    }

    calPrevBtn.addEventListener('click', () => {
        if(currentIndex > 0){
            currentIndex--;
            showSet(currentIndex);
        }
    });

    calNextBtn.addEventListener('click', () => {
        if(currentIndex < calSets.length - 1){
            currentIndex++;
            showSet(currentIndex);
        }
    });
// calender
    
    let lastReservationKey = '';
    let ticketNumber = '';

    function getReservationData(){
        const activeReserClass = isOneWay ? '.quick_reser02' : '.quick_reser01';
        const container = document.querySelector(activeReserClass);
        
        const fromCity = container.querySelector('.from_city').textContent.trim();
        const toCity = container.querySelector('.to_city').textContent.trim();
        const fromCode = container.querySelector('.from_code').textContent.trim();
        const toCode = container.querySelector('.to_code').textContent.trim();

        let fromDay = container.querySelector('.days_input').textContent.trim();
        let toDay = "";
        if(isOneWay){
            if(fromDay === '가는 날') fromDay = "";
        }else{
            if(fromDay === '가는 날 ~ 오는 날') fromDay = "";
            const days = fromDay.split('~').map(d => d.trim());
            fromDay = days[0] || "";
            toDay = days[1] || "";
        }

        return{
            from: fromCity,
            to: toCity,
            fromCode: fromCode,
            toCode: toCode,
            fromDay: fromDay,
            toDay: toDay,
            adult: Number(container.querySelector('.passenger.adult .num').textContent),
            child: Number(container.querySelector('.passenger.child .num').textContent),
            infant: Number(container.querySelector('.passenger.infant .num').textContent),
        };
    }

    function makeReservationKey(data){
        return[
            data.from,
            data.to,
            data.fromDay,
            data.toDay,
            data.adult,
            data.child,
            data.infant
        ].join('|');
    }

    function generateTicketNumberFromKey(key){
        const airCode = '724';
        let hash = 0;

        for(let i = 0; i < key.length; i++){
            hash = (hash * 31 + key.charCodeAt(i)) % 10000000;
        }

        const serial = String(hash).padStart(7, '0');
        return `${airCode}-${serial}`;
    }

    document.querySelectorAll('.quick_reser_btn').forEach(btn => {
        btn.addEventListener('click', () => {
        const data = getReservationData();

        const fromCity = data.from;
        const toCity = data.to;

        if(!fromCity || fromCity === '출발지' || !toCity || toCity === '도착지') return;
        if(isOneWay && !data.fromDay) return;
        if(!isOneWay && (!data.fromDay || !data.toDay)) return;
        
        const currentKey = makeReservationKey(data);

        if(currentKey !== lastReservationKey){
            ticketNumber = generateTicketNumberFromKey(currentKey);
            lastReservationKey = currentKey;
        }

        document.querySelectorAll('.quick_reser_result').forEach(m => m.style.display = 'none');

        showResultModal(data);
        });
    });

    function showResultModal(data){
        const modalSelector = isOneWay ? '.quick_reser_result.result02' : '.quick_reser_result.result01';
        const modal = document.querySelector(modalSelector);
        const overlay = document.querySelector('.quick_reser_result_overlay');

        if (!modal) return;

        const setText = (selector, text) => {
            const el = modal.querySelector(selector);
            if (el) el.textContent = text;
        };

        setText('.from_result', data.from);
        setText('.to_result', data.to);
        setText('.from_result_code', data.fromCode);
        setText('.to_result_code', data.toCode);
        setText('.from_day_result', data.fromDay || '-');

        const toDayEl = modal.querySelector('.to_day_result');
        if (toDayEl) {
            if (isOneWay) {
                toDayEl.style.display = 'none'; 
            } else {
                toDayEl.style.display = 'inline-block'; 
                toDayEl.textContent = data.toDay || '-';
            }
        }

        const adultPoint = modal.querySelector('.passenger_result_adult .passenger_point');
        if (adultPoint) adultPoint.textContent = data.adult;

        const togglePassenger = (selector, count) => {
            const row = modal.querySelector(selector);
            if (row) {
                row.style.display = count > 0 ? 'block' : 'none';
                const point = row.querySelector('.passenger_point');
                if (point) point.textContent = count;
            }
        };

        togglePassenger('.passenger_result_child', data.child);
        togglePassenger('.passenger_result_infant', data.infant);

        setText('.random_num', '항공권 번호 : ' + ticketNumber);

        overlay.style.display = 'block';
        modal.style.display = 'block';
        document.body.classList.add('no_scroll');
    }

    function closeResultModal(){
        document.querySelector('.quick_reser_result_overlay').style.display = 'none';
        document.querySelectorAll('.quick_reser_result').forEach(m => m.style.display = 'none');
        document.body.classList.remove('no_scroll');
    }

    document.querySelectorAll('.reser_result_btn').forEach(btn => {
        btn.addEventListener('click', closeResultModal);
    });
    // quick_reser_modal


    document.querySelectorAll('.tip_btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const li = btn.closest('.tip_banner ul li');
            li.classList.toggle('open');
        });
    });
    // tip_banner

    const lis = document.querySelectorAll('.lowest_fare ul li');
    const tooltipBox = document.querySelector('.graph_price');
    const countryBtns = document.querySelectorAll('.select_country button');

    let currentPriceArray = [];

    function renderGraph(dataKey) {
        const fullData = priceDate[dataKey]; 
        if (!fullData) return;

        currentPriceArray = fullData.slice(0, 28);

        if (tooltipBox.parentNode) tooltipBox.remove();
        tooltipBox.classList.remove('lowest_price_on');

        const unitHeight = 40;
        const unitPrice = 100000;

        const prices = currentPriceArray.map(item => Number(item.price));
        const minPrice = Math.min(...prices.filter(p => p > 0));

        lis.forEach((li, index) => {
            const item = currentPriceArray[index];
            const bar = li.querySelector('.graph');

            if (!item) return;

            const price = Number(item.price);
            const height = Math.max(unitHeight, (price / unitPrice) * unitHeight);
            
            bar.style.height = `${height}px`;
            bar.style.backgroundColor = (price === minPrice) ? '#FF6565' : '';
            bar.classList.remove('graph_active');

            bar.onclick = () => {
                lis.forEach((otherLi, i) => {
                    const otherBar = otherLi.querySelector('.graph');
                    if (!currentPriceArray[i]) return;
                    
                    const otherPrice = Number(currentPriceArray[i].price);
                    otherBar.classList.remove('graph_active');
                    otherBar.style.backgroundColor = (otherPrice === minPrice) ? '#FF6565' : '';
                });

                bar.classList.add('graph_active');

                li.appendChild(tooltipBox);
                tooltipBox.querySelector('.price').textContent = `${price.toLocaleString()}원`;
                tooltipBox.classList.add('lowest_price_on');

                tooltipBox.style.transform = "translateX(-50%)";
                tooltipBox.style.left = "50%";
                tooltipBox.style.right = "auto";

                if (index === 0) {
                    tooltipBox.style.left = "0";
                    tooltipBox.style.transform = "translateX(0)";
                } else if (index === lis.length - 1) {
                    tooltipBox.style.left = "auto";
                    tooltipBox.style.right = "0";
                    tooltipBox.style.transform = "translateX(0)";
                }
            };
        });
    }

    const dataKeys = ["2026-01", "2026-02", "2026-03", "2026-04"];

    countryBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            countryBtns.forEach(b => b.classList.remove('select_on'));
            btn.classList.add('select_on');
            
            renderGraph(dataKeys[idx]);
        });
    });
    renderGraph("2026-01");
    // lowest

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
