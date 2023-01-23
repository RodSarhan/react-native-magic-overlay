![React Native Magic Overlay Cover](/docs/assets/banner.png)

_An overlay library that can be called imperatively from anywhere and shows on top of other modals!_

## React Native Magic Overlay :sparkles: 

This library enables displaying customizeable overlays that always appear on top of other modals, it can be called imperatively on Android and IOS device without having to worry about the other modals that currently exist in the component tree.

This library relies on the FullWindowOverlay component of [software-mansion/react-native-screens](https://github.com/software-mansion/react-native-screens) on IOS in order to render the view on top of other views, and on React Native's Modal component on Android.

## 📸 Examples

| IOS                                                                                                                           | Android                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| <img src="/docs/assets/ios.gif" height=500/> | <img src="/docs/assets/android.gif" height=500/>  |

## 🛠 Installation

```sh
yarn add react-native-magic-overlay
```

## ⚙️ Usage

First, insert a `MagicOverlayPortal` at the top level of the application udner GestureHandlerRootView if it exists.

You can add a default style for the backdrop view in here if you don't want to use the default one or don't want to specify the backdrop style everytime the overlay is displayed.

```js
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MagicOverlayPortal} from 'react-native-magic-overlay';

export default function App() {
  return (
    <OtherProviders>
        <GestureHandlerRootView style={{flex: 1}}>
            <MagicOverlayPortal defaultBackdropStyle={}/>  // <-- On the top of the app component hierarchy
            <AppComponents /> // The rest of the app goes here
        </GestureHandlerRootView>
    </OtherProviders>
  );
}
```

Then, you are free to use the `magicOverlay` as shown from anywhere you want.

```js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { magicOverlay } from 'react-native-magic-overlay';

const CustomAlert = (someProps) => (
  <View style={{height:"50%", width:"80%"}}>
    <Text>Custom Alert</Text>
    <TouchableOpacity 
    onPress={() => {
        magicOverlay.hide({result: true})
    }}> // This will hide the alert, resolve the promise with the passed object
      <Text>OK</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={() => {
        magicOverlay.hide({result: false})
    }}> // This will hide the alert, resolve the promise with the passed object
      <Text>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const showAlert = async () => {
  // We can call it with or without props, depending on the requirements.
  const result = await magicOverlay.show(CustomAlert);

  //OR (with props)
  const result = await magicOverlay.show(<CustomAlert {...someProps}/>);

  console.log(result) 
  // will show {result: true}, or {result: false} based on the pressed button
};

export const Screen = () => {
  return (
    <View>
      <TouchableOpacity onPress={showAlert}>
        <Text>Show alert</Text>
      </TouchableOpacity>
    </View>
  );
};
```

Alternatively, if we don't care about waiting the resolved value of the promise we can just trigger some action instead.

```js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {magicOverlay} from 'react-native-magic-overlay';

const CustomAlert = (props) => (
  <View>
    <TouchableOpacity 
      onPress={() => {
        magicOverlay.hide();
        props.onConfirm(true)
      }}> 
      <Text>Confirm</Text>
    </TouchableOpacity>
  </View>
);

export const Screen = () => {
  const [confirmed, setConfirmed] = useState(false);

  const showAlert = useCallback(
    () => {
      magicOverlay.show(
        () => <CustomAlert onConfirm={(value)=>{setConfirmed(value)}}/>
      )
    }
  ,[])

  return (
    <View>
      <TouchableOpacity 
        onPress={showAlert}>
        <Text>Show alert</Text>
      </TouchableOpacity>
    </View>
  );
};
```

magicOverlay.show( ) can take a second optional argument to pass extra props to the overlay such as backdropStyle

Example:

```js
magicOverlay.show(
    () => <SomeComponent {...someProps}>,
    {backdropStyle: styles.overlayBackdrop}
)
```

## 😬 Notes

### State management

The overlay view is not reactive, as in the props that are passed to the component are a snapshot of when the overlay is displayed, so it's advised to use the overlay in the same way we use Alert.alert() and not rely on reactive values to control the texts or views inside it.

## 👨‍🏫 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## ⚖️ License

[MIT](LICENSE)
