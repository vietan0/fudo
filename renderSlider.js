import renderSvg from './renderSvg.js';

async function renderSlideDot(i, activeIndex) {
  const active = i === activeIndex;
  const button = document.createElement('button');
  const svg = await renderSvg(
    `assets/icons/${active ? 'dot-fill' : 'dot'}.svg`
  );
  if (active) {
    svg.style.transform = 'scale(1.5)';
  }
  const path = svg.firstElementChild;
  path.setAttribute('fill', 'white');

  button.append(svg);
  button.onclick = () => {
    activeIndex = i;
  };
  return button;
}

export default async function renderSlider(imgSrcs) {
  const sliderContainer = document.createElement('section');
  sliderContainer.className = 'slider';
  let activeIndex = 0;

  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';

  const imgs = imgSrcs.map((src) => {
    const img = document.createElement('img');
    img.src = src;
    return img;
  });

  imgContainer.append(...imgs);

  const slideDotContainer = document.createElement('div');
  slideDotContainer.className = "slideDot-container"
  const slideDots = await Promise.all(imgSrcs.map((_, i) => renderSlideDot(i, activeIndex)));
  slideDotContainer.append(...slideDots);
  sliderContainer.append(imgContainer, slideDotContainer);

  return sliderContainer;
}
