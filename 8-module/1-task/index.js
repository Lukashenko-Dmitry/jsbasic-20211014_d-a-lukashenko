import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;    
    let isMobile = document.documentElement.clientWidth;

    if (window.pageYOffset > initialTopCoord) {
    let coordXcontainer = document.querySelector('.container').getBoundingClientRect().right + 20;
    let coordXwindow = document.documentElement.clientWidth - this.elem.offsetWidth - 10;

    let leftIndent = Math.min(coordXcontainer, coordXwindow) + 'px';   

    Object.assign(this.elem.style, {
      position: 'fixed',
      top:50,
      zIndex: 1e3,
      right:'10px',
      left: leftIndent,
    });
    } else if (window.pageYOffset === initialTopCoord) {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      zIndex: '',        
      left: '',
    });
  } else if (isMobile <= 767){
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      zIndex: '',        
      left: '',
    });
  }

      
    

  }
}