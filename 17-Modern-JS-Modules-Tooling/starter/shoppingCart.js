// Exporting
//'use strict'; // no need, default by default
const fileDesignation = 'Exporting';

console.log(`${fileDesignation} Module`);

const shippingCost = 20;
console.log(`Shipping cost is  ${shippingCost} in ${fileDesignation} file`);

const cart = [];
//exported method!
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

export const AddOneToCart = function (product) {
  addToCart(product, 1);
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice as tp, totalQuantity as tq };

export default function (x, y) {
  return x + y;
}
// const ADDTWO = function (a, y) {
//   return a + y;
// };

//export default {ADDTWO,fileDesignation};
export { cart, cart as CART };

function commonJsModule() {
  //won't work!
  const commonCart = [];
  // exports.commonAddToCart = function(product, quantity)
  // {
  //     commonCart.push({product, quantity});
  //     console.log(`${quantity} ${product} were added to commonCart`);
  //}
}
commonJsModule();
