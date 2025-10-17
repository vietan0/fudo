import renderSections from './renderSections.js';
import renderSlider from './renderSlider.js';
import renderSvg from './renderSvg.js';

const heroImgSrcs = [
  'assets/images/hero-1.png',
  'assets/images/hero-2.png',
  'assets/images/hero-3.png',
];

async function renderNav() {
  const activeNavIndex = 0;
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
    navItemInfos.map(async ({ iconSrc, text }, i) => {
      const navItem = document.createElement('button');
      const iconContainer = document.createElement('div');
      iconContainer.className = 'icon-container'
      const icon = await renderSvg(`assets/icons/${iconSrc}`);
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
      if (i !== activeNavIndex) {
        itemName.style.opacity = 0.4;
        icon.style.opacity = 0.4;
      }
      navItem.append(iconContainer, itemName);
      return navItem;
    })
  );

  navContainer.append(...navItems);
  nav.append(navContainer);
  document.getElementById('root').append(nav);
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
      const icon = await renderSvg(`assets/icons/${iconSrc}`);
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

function renderScrollUp() {
  const scrollUp = document.createElement('button');
  scrollUp.className = 'scrollUp';
  scrollUp.innerHTML = `
    <p class="Caption1 Bold">Tiếp tục vuốt lên để đọc</p>
    <img src="assets/icons/drag-up.svg" />
  `;
  scrollUp.onclick = () => scrollTo(0, 0);
  document.querySelector('main').append(scrollUp);
}

async function main() {
  await renderNav();
  const heroSlider = await renderSlider(heroImgSrcs);
  document.getElementById('welcome').insertAdjacentElement('afterend', heroSlider);
  await renderShortcuts();
  await renderSections();
  renderScrollUp();
}

main();
