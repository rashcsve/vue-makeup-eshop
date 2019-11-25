const actions = {
  submitOrder(context) {
    let order = JSON.parse(JSON.stringify(context.state.order));
    alert('Odeslal jsem objednavku. Vice info v console.log');
    console.log(order);
  }
};

export default actions;
