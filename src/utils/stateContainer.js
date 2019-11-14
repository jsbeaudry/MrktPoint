import { Container } from "unstated";

class StateContainer extends Container {
  state = {
    items: [],
    goToCarts: false,
    orders: [],
    addresses: [],
    cards: [],
    selectAddress: {}
  };

  addItem = item => {
    this.state.items.push(item);
    this.setState(prevState => ({
      items: prevState.items
    }));
  };
  addAddress = address => {
    if (this.state.addresses.filter(i => i.addNew == true) == 0) {
      this.state.addresses.push({
        addNew: true
      });
    }
    this.state.addresses.unshift(address);
    this.setState(
      {
        addresses: this.state.addresses
      },
      () => {}
    );
  };
  addSelectAddress = selectAddress => {
    this.setState({
      selectAddress
    });
  };

  getItems = () => {
    return this.state.items;
  };
  getAddresses = () => {
    return this.state.addresses;
  };
  getSelectAddress = () => {
    return this.state.selectAddress;
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
