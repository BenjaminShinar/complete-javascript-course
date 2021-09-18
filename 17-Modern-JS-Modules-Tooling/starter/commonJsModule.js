commonCart = [];
exports.commonAddToCart = function (product, quantity) {
  commonCart.push({ product, quantity });
  console.log(`${quantity} ${product} were added to commonCart`);
};
