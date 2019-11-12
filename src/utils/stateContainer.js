import { Container } from "unstated";

class StateContainer extends Container {
  state = {
    items: [],
    goToCarts: false,
    orders: []
  };

  addItem = item => {
    this.state.items.push(item);
    this.setState(prevState => ({
      items: prevState.items
    }));
  };

  getItems = () => {
    return this.state.items;
  };

  getItemsTotal = () => {
    return this.state.items.reduce((a, b) => a + b.price * b.count, 0);
  };

  getOrders = () => {
    return this.state.orders;
  };

  setOrders = () => {
    this.state.orders.concat(this.state.items);
    this.setState(
      prevState => ({
        orders: prevState.items
      }),
      () => {
        this.setState({
          items: []
        });
      }
    );
  };

  removeItem = i => {
    this.state.items.splice(i, 1);
    this.setState(prevState => ({
      items: prevState.items
    }));
  };

  updateCountItem = (i, a) => {
    this.state.items[i].count = this.state.items[i].count + a;
    this.setState(prevState => ({
      items: prevState.items
    }));
  };
}

export { StateContainer };
