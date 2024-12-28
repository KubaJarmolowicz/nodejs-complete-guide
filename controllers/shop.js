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
  try {
    const cart = await req.user.getCart();
    const products = await cart?.getProducts();
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products,
    });
  } catch (e) {
    console.log("ERROR getCart -> Cannot render /cart", e);
  }
};

const postCart = async (req, res, next) => {
  try {
    const {
      user,
      body: { productId },
    } = req;
    const cart = await user.getCart();
    const products = await cart.getProducts({
      where: {
        id: productId,
      },
    });

    const product = products?.[0];

    if (product) {
      const oldQuantity = product.cartItem.quantity;
      await cart.addProduct(product, {
        through: {
          quantity: oldQuantity + 1,
        },
      });
    } else {
      const definition = await Product.findByPk(productId);
      await cart.addProduct(definition, {
        through: {
          quantity: 1,
        },
      });
    }
    res.redirect("/cart");
  } catch (e) {
    console.log("ERROR postCart -> Cannot render /cart", e);
  }
};

const postCartDeleteProduct = async (req, res, next) => {
  try {
    const {
      user,
      body: { productId },
    } = req;

    const cart = await user.getCart();
    const products = await cart.getProducts({
      where: {
        id: productId,
      },
    });

    const product = products?.[0];

    if (!product) {
      // TODO: code 400 bad request?
    }

    await product.cartItem.destroy();
    res.redirect("/cart");
  } catch (e) {
    console.log("ERROR postCartDeleteProduct -> Cannot render /cart", e);
  }
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
  postCartDeleteProduct,
  getCheckout,
  getOrders,
};
