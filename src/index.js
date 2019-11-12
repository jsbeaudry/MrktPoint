import React from "react";
import { UIManager, Platform } from "react-native";

import RootContainer from "./RootContainer";

// critical application bootstrap like stitch
import { initStitch } from "./services";

//initStitch();

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => <RootContainer />;

console.ignoredYellowBox = ["Warning: isMounted(...)"];

// export default App;
