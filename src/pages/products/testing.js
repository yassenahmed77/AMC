function calcCartTotal(cartItems) {
    cartitems.reduce((acc, item) => {return acc + (item.price * item.quantity)},0 )
}