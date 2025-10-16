import renderSections from './renderSections.js';
import renderSvg from './renderSvg.js';

async function renderNav() {
  const nav = document.createElement('nav');
  const navContainer = document.createElement('div');

  const navItemInfos = [
    { iconSrc: 'shop.svg', text: 'Cửa hàng' },
    { iconSrc: 'product.svg', text: 'Sản phẩm' },
    { iconSrc: 'cart.svg', text: 'Giỏ hàng' },
    { iconSrc: 'box.svg', text: 'Đơn hàng' },
    { iconSrc: 'user.svg', text: 'Cá nhân' },
  ];

  const navItems = await Promise.all(
    navItemInfos.map(async ({ iconSrc, text }) => {
      const navItem = document.createElement('button');
      const iconContainer = document.createElement('div');
      iconContainer.className = 'icon-container'
      const icon = await renderSvg(`assets/icons/nav/${iconSrc}`);
      iconContainer.append(icon);

      if (text === 'Giỏ hàng') {
        const productCounter = 3;
        const productCounterChip = document.createElement('span');
        productCounterChip.className = 'chip Caption2 Bold';
        productCounterChip.textContent = productCounter;
        iconContainer.append(productCounterChip);
      }

      const itemName = document.createElement('span');
      itemName.className = 'Caption1 Bold';
      itemName.textContent = text;
      navItem.append(iconContainer, itemName);
      return navItem;
    })
  );

  navContainer.append(...navItems);
  nav.append(navContainer);
  document.getElementById('root').append(nav);
}

async function renderHeroSlider() {
  let activeIndex = 0;
  async function renderSlideDot(i) {
    const active = i === activeIndex;
    const button = document.createElement('button');
    const svg = await renderSvg(
      `assets/icons/common/${active ? 'dot-fill' : 'dot'}.svg`
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

  const imgContainer = document.getElementById('img-container');
  const heroImgSrcs = ['hero-1.png', 'hero-2.png', 'hero-3.png'];

  const heroImgs = heroImgSrcs.map((src) => {
    const img = document.createElement('img');
    img.src = `assets/images/${src}`;
    img.alt = src;

    return img;
  });

  imgContainer.append(...heroImgs);

  const slideDotContainer = document.getElementById('slideDot-container');
  const slideDots = await Promise.all(
    heroImgSrcs.map((_, i) => renderSlideDot(i))
  );
  slideDotContainer.append(...slideDots);
}

async function renderShortcuts() {
  const shortcuts = document.getElementById('shortcuts');
  const shortcutInfos = [
    { iconSrc: 'post.svg', text: 'Bài viết' },
    { iconSrc: 'vouchers.svg', text: 'Voucher' },
    { iconSrc: 'affiliate.svg', text: 'Affiliate' },
  ];

  const shortcutItems = await Promise.all(
    shortcutInfos.map(async ({ iconSrc, text }) => {
      const shortcutItem = document.createElement('button');
      const icon = await renderSvg(`assets/icons/common/${iconSrc}`);
      for (const path of icon.children) {
        path.setAttribute('fill', '#599240');
      }
      const itemName = document.createElement('span');
      itemName.className = 'Caption1 Bold';
      itemName.textContent = text;
      shortcutItem.append(icon, itemName);

      return shortcutItem;
    })
  );

  shortcuts.append(...shortcutItems);
}

renderNav();
renderHeroSlider();
renderShortcuts();
renderSections();
