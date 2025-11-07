// 비주얼
document.addEventListener('DOMContentLoaded', () => {
    const $dots = document.querySelectorAll('#mainVisual .pag .dot');
    const $title = document.querySelector('#mainVisual .left');
    const $slider = document.querySelector('#mainVisual .slider');
    const $num = document.querySelector('#mainVisual .num');

    const arrImg = [
        'visual_01.png',
        'visual_02.png',
        'visual_03.png',
        'visual_04.png',
        'visual_05.png',
    ];
    const arr = [
        `<p>< 국립중앙박물관 어린이박물관 새단장 ></p>
       <strong>알기 덜기 잇기, <span>문화유산 속 마음 </span></strong>
       <p class="more">자세히 보기</p>
       `,
        `<p>< 상설전시관 3층 분청사기 백자실 ></p>
       <strong>금사리<span>달항아리를 만든 곳</span></strong>
       <p class="more">자세히 보기</p>`,

        `<p>< 상설전시관 고대 그리스 / 로마실 ></p>
       <strong>그리스가 로마에게 ,<span>로마가 그리스에게</span></strong>
       <p class="more">자세히 보기</p>`,

        `<p>< 상설전시관  2층 외규장각 의궤실 ></p>
       <strong>왕의 서고, 어진 세상을 꿈꾸다<span>외규장각 의궤실 공개</span></strong>
       <p class="more">자세히 보기</p>`,

        `<p>< 국립중앙박물관 특별전시실 1 ></p>
       <strong> 조선 전기 미술 대전 <span>새나라 새미술</span></strong>
       <p class="more">자세히 보기</p>
       `,
    ];
    const rotateArray = (arr, idx) => [...arr.slice(idx), ...arr.slice(0, idx)];

    const imgSlider = (images) => {
        $slider.innerHTML = '';
        images.forEach((imgSrc) => {
            const img = document.createElement('img');
            img.src = `./images/${imgSrc}`;
            img.alt = '슬라이스 이미지';
            $slider.appendChild(img);
        });
    };
    const number = (idx) => {
        $title.innerHTML = arr[idx];
        $num.textContent = `0${idx + 1}`;
    };
    // === 메인 비주얼 자동재생 상태/유틸 ===
    const $mainVisual = document.querySelector('#mainVisual');
    const VISUAL_COUNT = $dots.length; // 슬라이드 개수 = 도트 개수
    let visualIndex = 0; // 현재 보여주는 순번(0부터 시작)
    let visualTimer = null; // setInterval을 담아둘 변수
    const INTERVAL = 3000; // 5초마다 자동 변경

    // 특정 인덱스의 슬라이드를 화면에 보여주는 함수
    function showVisual(idx) {
        visualIndex = (idx + VISUAL_COUNT) % VISUAL_COUNT; // 음수/초과 방지

        // 1) 도트 on/off 바꾸기
        $dots.forEach((d, i) => d.classList.toggle('on', i === visualIndex));

        // 2) 이미지/문구/번호 바꾸기
        imgSlider(rotateArray(arrImg, visualIndex));
        number(visualIndex);
    }

    // 타이머 시작 (자동으로 다음 슬라이드로 가기)
    function startAutoplay() {
        stopAutoplay(); // 중복 방지
        visualTimer = setInterval(() => {
            showVisual(visualIndex + 1); // 다음 인덱스로 이동
        }, INTERVAL);
    }

    // 타이머 멈춤
    function stopAutoplay() {
        if (visualTimer) {
            clearInterval(visualTimer);
            visualTimer = null;
        }
    }

    // 타이머 재시작(=리셋)
    function restartAutoplay() {
        startAutoplay();
    }

    $dots.forEach((dot, idx) =>
        dot.addEventListener('click', () => {
            $dots.forEach((d) => d.classList.remove('on'));
            showVisual(idx);
            restartAutoplay();
        })
    );

    const make = () => {
        const $lis = document.querySelectorAll('.notice-menu .menu-list li');
        const $lists = document.querySelectorAll('.notice-list');
        $lis.forEach((itemLi, idx) => {
            const $link = itemLi.querySelector('.menu-list a');

            itemLi.addEventListener('click', (e) => {
                e.preventDefault();
                $lis.forEach((item) => {
                    item.classList.remove('on');
                    item.querySelector('a')?.classList.remove('on');
                });
                itemLi.classList.add('on');
                $link?.classList.add('on');

                $lists.forEach((list) => (list.style.display = 'none'));
                $lists[idx].style.display = 'block';
            });
        });
    };

    const con5 = () => {
        const $sites = document.querySelector('.main #content .con5 .site-list');
        const $prev = document.querySelector('.main #content .con5 > .btn .prev');
        const $next = document.querySelector('.main #content .con5 > .btn .next');

        const siteImg = [
            'site01.png',
            'site02.png',
            'site03.png',
            'site04.png',
            'site05.png',
            'site06.png',
        ];
        let current = 0;
        const visibleCount = 5;

        const createElement = (imgSrc) => {
            const img = document.createElement('img');
            img.src = `./images/${imgSrc}`;
            img.alt = '슬라이드 이미지';
            return img;
        };

        const initSlider = () => {
            $sites.innerHTML = '';

            for (let i = 0; i < visibleCount; i++) {
                const imgIndex = (current + i) % siteImg.length;
                const img = createElement(siteImg[imgIndex]);
                $sites.appendChild(img);
            }
        };
        $next.addEventListener('click', (e) => {
            e.preventDefault();

            current = (current + 1) % siteImg.length;

            $sites.removeChild($sites.firstElementChild);

            const newImageIndex = (current + visibleCount - 1) % siteImg.length;
            const newImg = createElement(siteImg[newImageIndex]);
            $sites.appendChild(newImg);
        });

        $prev.addEventListener('click', (e) => {
            e.preventDefault();

            current = (current - 1 + siteImg.length) % siteImg.length;

            $sites.removeChild($sites.lastElementChild);

            const newImg = createElement(siteImg[current]);
            $sites.prepend(newImg);
        });

        initSlider();
    };

    const familysite = () => {
        const $title = document.querySelector('.family .title');
        const $ul = document.querySelector('.family ul');
        $title.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = $title.classList.contains('on');
            if (isOpen) {
                $ul.style.height = '0';
            } else {
                $ul.style.height = '130px';
            }
            $title.classList.toggle('on');
        });
    };

    const teamMembers = [
        { name: 'Emily Kim', role: 'Founder' },
        { name: 'Michael Steward', role: 'Creative Director' },
        { name: 'Emma Rodriguez', role: 'Lead Developer' },
        { name: 'Julia Gimmel', role: 'UX Designer' },
        { name: 'Lisa Anderson', role: 'Marketing Manager' },
        { name: 'James Wilson', role: 'Product Manager' },
    ];

    const cards = document.querySelectorAll('.card');
    const dots = document.querySelectorAll('.dot');
    const memberName = document.querySelector('.member-name');
    const memberRole = document.querySelector('.member-role');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove('center', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');

            if (offset === 0) {
                card.classList.add('center');
            } else if (offset === 1) {
                card.classList.add('right-1');
            } else if (offset === 2) {
                card.classList.add('right-2');
            } else if (offset === cards.length - 1) {
                card.classList.add('left-1');
            } else if (offset === cards.length - 2) {
                card.classList.add('left-2');
            } else {
                card.classList.add('hidden');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        if (memberName && memberRole) {
            memberName.style.opacity = '0';
            memberRole.style.opacity = '0';

            setTimeout(() => {
                memberName.textContent = teamMembers[currentIndex].name;
                memberRole.textContent = teamMembers[currentIndex].role;
                memberName.style.opacity = '1';
                memberRole.style.opacity = '1';
            }, 300);
        }

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    leftArrow.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    rightArrow.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateCarousel(i);
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            updateCarousel(i);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            updateCarousel(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateCarousel(currentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateCarousel(currentIndex + 1);
            } else {
                updateCarousel(currentIndex - 1);
            }
        }
    }

    updateCarousel(0);

    (() => {
        make();
        showVisual(0);
        startAutoplay();
        con5();
        familysite();
    })();
});
