const actions = {
  submitOrder(context) {
    let order = JSON.parse(JSON.stringify(context.state.order));
    alert('The order was sent. You can find more info in console');
    console.log(order);
  }
};

export default actions;
