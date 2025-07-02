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
    //슬라이더 안에있는 기존의 이미지 모두 제거(새이미지들을 그리기 위해)

    images.forEach((imgSrc) => {
        // imgSrc는 이미지 파일이 담긴 배열, 그배열을 반복할거다
        const img = document.createElement('img');
        // 이미지태그 img를 생성
        img.src = `./images/${imgSrc}`;
        //이미지 경로 설정
        img.alt = '슬라이스 이미지';
        $slider.appendChild(img);
        //이미지 슬라이더에 붙임
    });
};
const number = (idx) => {
    $title.innerHTML = arr[idx];
    $num.textContent = `0${idx + 1}`;
};
$dots.forEach((dot, idx) =>
    dot.addEventListener('click', () => {
        $dots.forEach((d) => d.classList.remove('on'));
        dot.classList.add('on');

        imgSlider(rotateArray(arrImg, idx));
        number(idx);
    })
);

///////////////////////
const make = () => {
    const $lis = document.querySelectorAll('.notice-menu .menu-list li');
    const $lists = document.querySelectorAll('.notice-list');
    $lis.forEach((itemLi, idx) => {
        const $link = itemLi.querySelector('.menu-list a');

        itemLi.addEventListener('click', (e) => {
            // alert('hi');
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

(() => {
    make();
    imgSlider(arrImg);
    number(0);
    $dots[0].classList.add('on');
})();
