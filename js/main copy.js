const dots = document.querySelectorAll('#mainVisual .pag .dot');
const title = document.querySelector('#mainVisual .left');
const slider = document.querySelector('#mainVisual .slider');
const num = document.querySelector('#mainVisual .num');
// const showBox = document.querySelector('#mainVisual');

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

let current = 0,
    size = arr.length;
//현재 보여지고 있는 이미지의 번호(현재값)

const imgTag = document.createElement('img');
imgTag.src = `./images/${arrImg[current]}`;
imgTag.alt = '슬라이드 이미지';
slider.appendChild(imgTag);

const Slide = () => {
    imgTag.src = `./images/${arrImg[current]}`;
    title.innerHTML = arr[current];
    // title요소에 보여줘야할 글자를 바꿀거다=현재값(0부터 시작)(슬라이드번호)에 해당하는걸
    dots.forEach((dot, i) => dot.classList.toggle('on', i === current));
    //forEach는 dot를 하나씩 꺼내 반복 작업하는 것
    //i===current가 참이면 'on'을 붙일거다/거짓이면 때라 i=idx
    num.textContent = `0${current + 1}`;
};

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        current = idx;
        Slide();
    });
});

Slide();
