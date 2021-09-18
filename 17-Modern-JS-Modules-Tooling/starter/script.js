//'use strict'; // no need, default by default
//Importing
import {
  addToCart,
  AddOneToCart as add1ToCart,
  tp,
  tq,
} from './shoppingCart.js';

import * as ShoppingCart from './shoppingCart.js'; //import everything into a object.
import foo from './shoppingCart.js'; //take default export

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
function BaseBehavior() {
  const fileDesignation = 'Importing';
  console.log(`${fileDesignation} Module`);
  console.log;
  try {
    console.log(`Shipping cost is  ${shippingCost} in ${fileDesignation} file`);
  } catch {
    console.log(`Shipping cost is not defined in ${fileDesignation} file`);
  }

  addToCart('pig', 2); //imported method!
  add1ToCart('pizza');
  console.log(`${fileDesignation} tp ${tp} tq ${tq}`);
  ShoppingCart.AddOneToCart('burger');
  console.log(ShoppingCart, typeof ShoppingCart);
  console.log(foo(11, 11));

  ShoppingCart.AddOneToCart('burger');
  console.log(...ShoppingCart.cart);
  ShoppingCart.cart.push(7);
  console.log(...ShoppingCart.cart.flat());
}
//BaseBehavior();

function modulePattern() {
  const moduleShoppingCart = (function () {
    const moduleCart = [];
    const moduleShippingCost = 75;
    const moduleAddToCart = function (product, quantity) {
      moduleCart.push({ product, quantity });
      console.log(`${quantity} ${product} was added to the cart`);
    };
    const moduleOrder = function (product) {
      console.log(`ordering ${product} from supplier`);
    };

    return { moduleCart, moduleAddToCart, moduleOrder };
  })();
  moduleShoppingCart.moduleAddToCart('apple', 9);
  console.log(...moduleShoppingCart.moduleCart);
}
//modulePattern();

// common js won't work
//const { commonAddToCartC } = require('./shoppingCart.js');

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 10 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(state, stateClone, stateDeepClone);
