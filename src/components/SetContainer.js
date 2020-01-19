import React from "react";
import { Text, View } from "react-native";
import { Subscribe } from "unstated";
import { StateContainer } from "../utils/stateContainer";

const componentName = ({ items, bags }) =>
  <Subscribe to={[StateContainer]}>
    {containers => {
      if (bags) {
        containers.addItem(bags);
      }
      return null;
    }}
  </Subscribe>;

export default componentName;
