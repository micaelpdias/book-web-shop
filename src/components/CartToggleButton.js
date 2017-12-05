import React, { Component } from 'react';
import Cart from '../utils/Cart';

class CartToggleButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCart: Cart.inCart(this.props.bookId),
    }

    this.toggleInCart = this.toggleInCart.bind(this);
  }

  toggleInCart() {
    const { bookId } = this.props;

    if (this.state.inCart) {
      Cart.remove(bookId);
    } else {
      Cart.add(bookId);
    }

    const inCart = ! this.state.inCart;

    this.setState(state => ({
      ...state,
      inCart,
    }));

    if (this.props.onToggled) {
      this.props.onToggled(inCart);
    }
  }

  render() {
    const { inCart } = this.state;

    return <button type="button" onClick={this.toggleInCart}>{inCart ? 'Remove from cart' : 'Add to cart'}</button>;
  }
}

export default CartToggleButton;
