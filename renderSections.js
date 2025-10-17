import renderSvg from './renderSvg.js';
import { vouchers, hotProducts, categories, suggestions } from './data.js';

async function renderSectionHeader(name, iconSrc) {
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';
  const icon = await renderSvg(`assets/icons/${iconSrc}.svg`);
  const sectionName = document.createElement('p');
  sectionName.className = 'Title1 Bold'
  sectionName.textContent = name;
  const seeMore = document.createElement('button');
  seeMore.className = 'Caption1 Bold'
  seeMore.textContent = 'Xem thêm';

  const leftSide = document.createElement('div');
  leftSide.className = 'left';
  leftSide.append(icon, sectionName);
  sectionHeader.append(leftSide, seeMore);

  return sectionHeader;
}

async function renderSection(id, name, icon) {
  const section = document.createElement('section');
  section.className = 'section';
  section.id = id;
  const sectionHeader = await renderSectionHeader(name, icon);
  const sectionContent = document.createElement('div');
  sectionContent.className = 'section-content';
  if (id === 'vouchers') {
    sectionContent.append(...vouchers.map((voucher) => renderVoucher(voucher)));
  }
  if (id === 'hotProducts') {
    sectionContent.append(
      ...hotProducts.map((product) => renderProduct(product))
    );
  }
  if (id === 'categories') {
    sectionContent.append(
      ...categories.map((product) => renderCategory(product))
    );
  }
  if (id === 'suggestions') {
    sectionContent.append(
      ...suggestions.map((product) => renderProduct(product))
    );
  }
  section.append(sectionHeader, sectionContent);
  return section;
}

function renderVoucher(voucher) {
  const { title, amount, desc, status, imgSrc } = voucher;
  const voucherElem = document.createElement('div');
  voucherElem.className = 'voucher';
  voucherElem.innerHTML = `
    <img src="${imgSrc}" />
    <div class="tag Callout Bold">
      <span>${amount}%</span>
    </div>
    <div class="voucher-text">
      <div class="voucher-header">
        <p class="Callout Bold">${title}</p>
        <p class="Caption1">${desc}</p>
      </div>
      <div class="bar"></div>
      <div class="voucher-footer">
        <button class="Caption1 Bold">Lấy mã</button> 
        <span class="Caption1 Bold">${status}</span> 
      </div>
    </div>
  `;

  return voucherElem;
}

function renderCategory(category) {
  const { title, imgSrc } = category;
  const categoryElem = document.createElement('div');
  categoryElem.className = 'category';
  categoryElem.innerHTML = `
    <img src="${imgSrc}" />
    <p class="Headline Bold">${title}</p>
  `
  return categoryElem;
}

function renderProduct(product) {
  const { title, desc, price, imgSrc, combo } = product;
  const productElem = document.createElement('div');
  productElem.className = 'product-vert';
  productElem.innerHTML = `
    <img src="${imgSrc}" />
    ${combo ? `
      <div class="combo-tag">
        <span class="Callout Bold">Combo</span>
      </div>` 
      : ''}
    <div class="product-info">
      <div class="product-text">
        <p class="Headline Bold">${title}</p>
        <p class="Caption1">${desc}</p>
      </div>
      <div class="product-footer">
        <p class="Headline Bold">${new Intl.NumberFormat().format(price)} đ</p>
        <button>
          <img src="assets/icons/add-to-cart.svg" />
        </button>
      </div>
    </div>
  `;
  return productElem;
}

export default async function renderSections() {
  const sectionInfos = [
    { id: 'vouchers', iconSrc: 'vouchers', text: 'Voucher' },
    { id: 'hotProducts', iconSrc: 'hot', text: 'Bán chạy' },
    { id: 'categories', iconSrc: 'add-to-screen', text: 'Danh mục' },
    { id: 'suggestions', iconSrc: 'hot', text: 'Combo gợi ý' },
  ];

  const sections = await Promise.all(
    sectionInfos.map(({ id, iconSrc, text }) =>
      renderSection(id, text, iconSrc)
    )
  );

  document.querySelector('main').append(...sections);
}
