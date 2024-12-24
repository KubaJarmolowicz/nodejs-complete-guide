const Product = require("../models/product");
const Cart = require("../models/cart");

const getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Home",
      path: "/",
    });
  } catch (e) {
    console.log("ERROR -> Cannot render index", e);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
    });
  } catch (e) {
    console.log("ERROR getProducts -> Cannot render /products", e);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    res.render("shop/product-detail", {
      product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (e) {
    console.log("ERROR getProduct -> Cannot render /products", e);
  }
};

const getCart = async (req, res, next) => {
  const { products: cartProducts } = await Cart.getContent();
  const products = await Product.findAll();
  const productsInCart = products.reduce((acc, item) => {
    const associatedCartProd = cartProducts.find(
      (cartProd) => cartProd.id === item.id
    );
    if (!associatedCartProd) {
      return acc;
    }

    return [...acc, { productData: item, qty: associatedCartProd.qty }];
  }, []);
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    products: productsInCart,
  });
};

const postCart = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findByPk(productId);
  Cart.addProduct(product.id, product.price);
  res.redirect("/cart");
};

const postCartDeleteItem = async (req, res, next) => {
  const { id } = req.body;
  await Cart.deleteProduct(id);
  res.redirect("/cart");
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  postCartDeleteItem,
  getCheckout,
  getOrders,
};
