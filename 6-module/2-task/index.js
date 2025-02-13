import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    
    this.render();
    this.elem.querySelector('.card__button').addEventListener('click', this.onClick);
  }

  render () {
    this.elem = createElement(`
    <div id="holder" class="container_half">
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${this.product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  </div>
    `);
  }

  onClick = (event) => {
    let customEvent = new CustomEvent('product-add', {detail: this.product.id, bubbles: true});
    this.elem.dispatchEvent(customEvent);    
    
  }
}
