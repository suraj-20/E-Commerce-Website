import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 100 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_BASE_URL}/getAllProducts`)
      .then((res) => res.json())
      .then((data) => {
        setAll_Product(data.product);
      });

    if (localStorage.getItem("Auth-token")) {
      fetch(`https://${process.env.REACT_APP_BASE_URL}/cart/getCartItems`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("Auth-token")}`,
          "Content-Type": "application/json",
        },
        data: "",
      })
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // console.log(cartItems);
    if (localStorage.getItem("Auth-token")) {
      console.log(process.env.REACT_APP_BASE_URL);
      fetch(`https://${process.env.REACT_APP_BASE_URL}/cart/addToCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Auth-token": `${localStorage.getItem("Auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("Auth-token")) {
      fetch(`https://${process.env.REACT_APP_BASE_URL}/cart/removeFromCart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Auth-token": `${localStorage.getItem("Auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    // console.log(totalAmount);
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
