import { Container } from "unstated";
import { updateUser } from "../services";

import { Stitch } from "mongodb-stitch-react-native-sdk";

class StateContainer extends Container {
  state = {
    items: [],
    goToCarts: false,
    orders: [],
    addresses: [],
    cards: [],
    selectAddress: {},
    selectCard: {}
  };

  addItem = item => {
    this.setState({
      items: item
    });
    console.log(item);
  };
  modifyItemCount = (id, val) => {
    this.state.items[id].count = val;
    this.setState({
      items: this.state.items
    });
  };
  addAddress = address => {
    if (this.state.addresses.filter(i => i.addNew == true) == 0) {
      this.state.addresses.push({
        addNew: true
      });
    }
    this.state.addresses.unshift(address);
    this.setState({
      addresses: this.state.addresses
    });
  };

  addCard = card => {
    if (this.state.cards.filter(i => i.addNew == true) == 0) {
      this.state.cards.push({
        addNew: true
      });
    }
    this.state.cards.unshift(card);
    this.setState(
      {
        cards: this.state.cards
      },
      () => {}
    );
  };

  addSelectAddress = selectAddress => {
    this.setState({
      selectAddress
    });
  };

  addSelectCard = selectCard => {
    this.setState({
      selectCard
    });
  };

  getItems = () => {
    return this.state.items;
  };
  getAddresses = () => {
    return this.state.addresses;
  };
  getCards = () => {
    return this.state.cards;
  };

  getSelectAddress = () => {
    return this.state.selectAddress;
  };
  getSelectCard = () => {
    return this.state.selectCard;
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
