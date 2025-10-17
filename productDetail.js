import { productDetail, productDetailSuggestions, review } from './data.js';
import { renderProduct } from './renderSections.js';
import renderSlider from './renderSlider.js';
import renderSvg from './renderSvg.js';

function renderTab(name, iconName, i) {
  const activeIndex = 0;
  const tab = document.createElement('div');
  if (activeIndex === i) {
    tab.classList.add('active');
  }
  tab.innerHTML = `
    <img src="assets/icons/${iconName}.svg" />
    <p class="Headline">${name}</p>
  `;

  return tab;
}

function renderTabs() {
  const tabs = document.querySelector('.tabs');
  const tabInfos = [
    { name: 'Tổng quan', iconName: 'truck' },
    { name: 'Đánh giá', iconName: 'chat' },
  ];

  const tabElems = tabInfos.map(({ name, iconName }, i) =>
    renderTab(name, iconName, i)
  );

  tabs.append(...tabElems);
}

async function renderProductDetail(productDetail) {
  const { name, price, images, tags, shortDesc, stock, star, freeship } =
    productDetail;
  const productDetailContainer = document.createElement('div');
  productDetailContainer.className = 'productDetailContainer';

  const productSlider = await renderSlider(images);

  const statIcons = await Promise.all(
    ['box', 'star', 'truck'].map((str) => renderSvg(`assets/icons/${str}.svg`))
  );
  statIcons.forEach((svg) => {
    for (const path of svg.children) {
      path.setAttribute('fill', '#599240');
    }
  });
  const [boxIcon, starIcon, truckIcon] = statIcons;

  const info = document.createElement('div');
  info.className = 'info';
  info.innerHTML = `
    <p class="Title Bold">${name}</p>
    <div class="price">
      <p class="Title1 Bold">${new Intl.NumberFormat().format(price.final)}</p>
      <p class="original">${new Intl.NumberFormat().format(price.original)}</p>
    </div>
    <div class="tags">
      ${tags.map((tag) => `<span class="tag Caption1">${tag}</span>`).join('')}
    </div>
    <p class="BodyBold">${shortDesc}</p>
    <div class="stats">
      <div>
        ${boxIcon.outerHTML}
        <p class="Headline">Còn ${stock}</p>
      </div> 
      <div>
        ${starIcon.outerHTML}
        <p class="Headline">${star.toFixed(1)}</p>
      </div> 
      <div>
        ${truckIcon.outerHTML}
        <p class="Headline">${freeship}</p>
      </div> 
    </div>
  `;

  productDetailContainer.append(productSlider);
  productDetailContainer.append(info);
  document.getElementsByTagName('main').item(0).append(productDetailContainer);
}

async function renderReviewCard(review) {
  const { username, star, date, body, images, likes } = review;
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';
  const starIcon = await renderSvg('assets/icons/star.svg');
  const likeIcon = await renderSvg('assets/icons/thumb-up.svg');
  for (const path of likeIcon.children) {
    path.setAttribute('fill', '#AFAFAF');
  }
  reviewCard.innerHTML = `
    <div class="top">
      <div class="name-stars">
        <p class="Headline Bold">${username}</p>
        <div class="stars">
          ${starIcon.outerHTML}
          <p class="Headline Bold">${star.toFixed(1)}</p>
        </div>
      </div>
      <div class="date Caption1 Bold">${date}</div>
    </div>
    <div>
      <p class="body Callout">${body}</p>
      <div class="review-images">
        ${images.map((image) => `<img src="${image}" />`).join('')}
      </div>
    </div>
    <div class="likes">
      ${likeIcon.outerHTML}
      <span class="Caption1 Bold">${likes}</span>
    </div>
  `;

  return reviewCard;
}

async function renderReviews(reviews) {
  const reviewSection = document.createElement('section');
  reviewSection.id = 'review';
  const reviewContainer = document.createElement('div');
  reviewContainer.className = 'review-container';
  reviewSection.innerHTML = `
    <div class="see-more">
      <p class="Caption1 Bold">Xem thêm 432 đánh giá khác</p>
      <img src="assets/icons/right.svg" alt="" />
    </div>
  `;

  const reviewCards = await Promise.all(
    reviews.map((review) => renderReviewCard(review))
  );
  reviewContainer.append(...reviewCards);
  reviewSection.insertAdjacentElement('afterbegin', reviewContainer);
  document.getElementsByTagName('main').item(0).append(reviewSection);
}

function renderProductDescription() {
  const productDescription = document.createElement('section');
  productDescription.className = 'product-description';
  productDescription.innerHTML = `
    <div class="Title2 Bold">
      Chiếc khăn giấy được làm từ 100% bột tre không tẩy trắng
    </div>
    <img src="assets/images/product-desc-1.png" />
    <p class="BodyBold">Khăn giấy khô Fudo Tissue là sản phẩm khăn giấy cao cấp được sản xuất từ tre tự nhiên, an toàn cho người sử dụng và thân thiện với môi trường.</p>
    <p class="Headline Bold">Thân thiện với môi trường</p>
    <div class="desc-img-container">
      <img src="assets/images/product-desc-2.png" />
      <img src="assets/images/product-desc-2.png" />
    </div>
    <p class="BodyBold">Gỗ mất rất nhiều thời gian để tái tạo, trong khi cây tre chỉ cần khoảng 2-3 năm. Sử dụng khăn giấy khô làm từ rừng tre đạt chuẩn FSC giúp bảo vệ môi trường bền vững hơn.</p>
    <p class="Headline Bold">Giấy dai và không rã nát</p>
    <img src="assets/images/product-desc-3.png" />
    <p class="BodyBold">Gỗ mất rất nhiều thời gian để tái tạo, trong khi cây tre chỉ cần khoảng 2-3 năm. Sử dụng khăn giấy khô làm từ rừng tre đạt chuẩn FSC giúp bảo vệ môi trường bền vững hơn.</p>
    <p class="BodyBold">Fudo Tissue hiểu được giá trị của việc thay đổi và cải thiện môi trường sống, và đó là lý do tại sao chúng tôi chọn khăn giấy tre là sản phẩm tiên phong của mình!</p>
    <p class="BodyBold">Mua ngay Khăn giấy khô cao cấp Fudo Tissue loại thùng 20 gói giúp bạn tiết kiệm chi phí tới 24% so với mua gói lẻ</p>
    <p class="Headline Bold">Thông tin sản phẩm</p>
    <ul>
      <li class="BodyBold">Loại sản phẩm: Giấy ăn / khăn giấy</li>
      <li class="BodyBold">Thương hiệu: FUDO TISSUE</li>
      <li class="BodyBold">Thành phần: 100% sợi tre tự nhiên</li>
      <li class="BodyBold">Quy cách: 130 tờ x 3 lớp / 1 gói, 190mm x 152mm</li>
      <li class="BodyBold">Đóng gói: Thùng 20 gói giấy rút</li>
    </ul>
  `;

  document.getElementsByTagName('main').item(0).append(productDescription);
}

function renderSuggestions() {
  const suggestions = document.createElement('section');
  suggestions.className = 'suggestions';
  suggestions.innerHTML = `
    <div class="suggestions-header">
      <p class="Title2 Bold">Gợi ý sản phẩm</p>
      <p class="Caption1 Bold">Tất cả</p>
    </div>
  `;

  const suggestionContainer = document.createElement('div');
  suggestionContainer.className = 'suggestion-container';
  const suggestedCards = productDetailSuggestions.map((product) =>
    renderProduct(product)
  );

  suggestionContainer.append(...suggestedCards);
  suggestions.append(suggestionContainer);
  document.getElementsByTagName('main').item(0).append(suggestions);
}

async function renderBtnIslandIcons() {
  const leftGroup = document.querySelector('.left-group');
  const addToCartBtn = document.querySelector('.add-to-cart');
  const btnIslandIcons = await Promise.all([
    renderSvg('assets/icons/cart.svg'),
    renderSvg('assets/icons/sharetochat.svg'),
    renderSvg('assets/icons/MaterialSymbolsAddCircleOutlineRounded.svg'),
  ]);

  const [cartIcon, shareToChatIcon, plusIcon] = btnIslandIcons;
  for (const path of cartIcon.children) {
    path.setAttribute('fill', 'white');
  }

  shareToChatIcon.children.item(0).setAttribute('stroke', 'white');
  shareToChatIcon.children.item(1).setAttribute('fill', 'white');
  leftGroup.append(cartIcon, shareToChatIcon);
  addToCartBtn.append(plusIcon);
}

async function main() {
  renderTabs();
  await renderProductDetail(productDetail);
  await renderReviews(new Array(3).fill(review));
  renderProductDescription();
  renderSuggestions();
  renderBtnIslandIcons();
}

main();
