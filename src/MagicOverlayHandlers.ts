import React, { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type OverlayContent = React.FC | ReactNode;

export type NewOverlayProps = Partial<{
  backdropStyle: ViewStyle;
}>;

/**
 * @description Show an overlay. If an overlay is already present, it will close it first before displaying.
 * @param newContent Recieves a function that returns an overlay component.
 * @param newProps Recieves {@link NewOverlayProps}  to override the default configs.
 * @returns {Promise<any>} Returns a Promise that resolves with the {@link hide} props when the overlay is closed. If the overlay is dismissed it will resolve to undefined.
 */
const show = async (
  newContent: OverlayContent,
  newProps?: NewOverlayProps
): Promise<any> => magicOverlayRef.current?.show?.(newContent, newProps);

/**
 * @description Hide the current overlay.
 * @param args Those args will be passed to the {@link show} resolve function.
 * @returns {Promise<void>} Returns a promise that resolves when hide happens.
 */
const hide = async (args?: any): Promise<void> =>
  magicOverlayRef.current?.hide?.(args);

export interface TMagicOverlay {
  show: typeof show;
  hide: typeof hide;
}

export const magicOverlayRef = React.createRef<TMagicOverlay>();

/**
 * @example
 * ```js
 * // ...
 * import { magicOverlay } from 'react-native-magic-overlay';
 *
 * // ...
 * const ExampleContent = () => (
 *  <TouchableOpacity onPress={() => magicOverlay.hide("hey")}>
 *    <Text>Test!</Text>
 *  </TouchableOpacity>
 * )
 *
 * const result = await magicOverlay.show(ExampleContent or ()=><ExampleContent {...someProps}/>);
 * console.log(result); // Returns 'hey' when the overlay is closed by the TouchableOpacity.
 * ```
 */
export const magicOverlay = {
  show,
  hide,
};
