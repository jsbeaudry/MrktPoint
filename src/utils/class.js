class Business {
  constructor(image, name, subTitle, logo, isOpen, deliveryTime, freeDelivery, openHours, location) {
    this._image = image;
    this._name = name;
    this._subTitle = subTitle;
    this._logo = logo;
    this._isOpen = isOpen;
    this._deliveryTime = deliveryTime;
    this._freeDelivery = freeDelivery;
    this._openHours = openHours;
    this._location = location;
  }

  get image() {
    return this._image;
  }

  get name() {
    return this._name;
  }

  get subTitle() {
    return this._subTitle;
  }

  get logo() {
    return this._logo;
  }

  get isOpen() {
    return this._isOpen;
  }

  get deliveryTime() {
    return this._deliveryTime;
  }

  get freeDelivery() {
    return this._freeDelivery;
  }

  get openHours() {
    return this._openHours;
  }

  get location() {
    return this._location;
  }

  set image(image) {
    this._image = image;
  }

  set name(name) {
    this._name = name;
  }

  set subTitle(subTitle) {
    this._subTitle = subTitle;
  }

  set logo(logo) {
    this._logo = logo;
  }

  set isOpen(isOpen) {
    this._isOpen = isOpen;
  }

  set deliveryTime(deliveryTime) {
    this._deliveryTime = deliveryTime;
  }

  set freeDelivery(freeDelivery) {
    this._freeDelivery = freeDelivery;
  }

  set openHours(openHours) {
    this._openHours = openHours;
  }

  set location(location) {
    this._location = location;
  }
}

class User {
  constructor(firstname, lastname, image, email, password, verified) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._image = image;
    this._email = email;
    this._password = password;
    this._verified = verified;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get verified() {
    return this._verified;
  }

  set firstname(firstname) {
    this._firstname = firstname;
  }

  set lastname(lastname) {
    this._lastname = lastname;
  }

  set email(email) {
    this._email = email;
  }

  set password(password) {
    this._password = password;
  }

  set verified(verified) {
    this._verified = verified;
  }

  addUser = () => {};

  getUser = () => ({
    firstname: this._firstname,
    lastname: this._lastname,
    email: this._email,
    password: this._password,
    verified: this._verified
  });

  getUserFullName = () => `${this._firstname} ${this._lastname}`;
}

class Product {
  constructor(
    image,
    name,
    subTitle,
    isAvaliable,
    isSponsorized,
    deliveryPrice,
    deliveryTime,
    price,
    currency,
    description,
    productBy,
    shop,
    stock,
    cretedAt
  ) {
    this._image = image;
    this._name = name;
    this._subTitle = subTitle;
    this._isAvaliable = isAvaliable;
    this._isSponsorized = isSponsorized;
    this._deliveryPrice = deliveryPrice;
    this._deliveryTime = deliveryTime;
    this._price = price;
    this._currency = currency;
    this._description = description;
    this._productBy = productBy;
    this._shop = shop;
    this._stock = stock;
    this._cretedAt = cretedAt;
  }

  get image() {
    return this._image;
  }

  get name() {
    return this._name;
  }

  get subTitle() {
    return this._subTitle;
  }

  get isAvaliable() {
    return this._isAvaliable;
  }

  get isSponsorized() {
    return this._isSponsorized;
  }

  get deliveryPrice() {
    return this._deliveryPrice;
  }

  get deliveryTime() {
    return this._deliveryTime;
  }

  get price() {
    return this._price;
  }

  get currency() {
    return this._currency;
  }

  get description() {
    return this._description;
  }

  get productBy() {
    return this._productBy;
  }

  get shop() {
    return this._shop;
  }

  get stock() {
    return this._stock;
  }

  get cretedAt() {
    return this._cretedAt;
  }

  set image(image) {
    this._image = image;
  }

  set name(name) {
    this._name = name;
  }

  set subTitle(subTitle) {
    this._subTitle = subTitle;
  }

  set isAvaliable(isAvaliable) {
    this._isAvaliable = isAvaliable;
  }

  set deliveryPrice(deliveryPrice) {
    this._deliveryPrice = deliveryPrice;
  }

  set deliveryTime(deliveryTime) {
    this._deliveryTime = deliveryTime;
  }

  set price(price) {
    this._price = price;
  }

  set currency(currency) {
    this._currency = currency;
  }

  set description(description) {
    this._description = description;
  }

  set productBy(productBy) {
    this._productBy = productBy;
  }

  set shop(shop) {
    this._shop = shop;
  }

  set stock(stock) {
    this._stock = stock;
  }

  set cretedAt(cretedAt) {
    this._cretedAt = cretedAt;
  }
}

export { Business, User, Product };
