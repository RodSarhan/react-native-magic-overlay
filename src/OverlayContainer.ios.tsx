import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';

export const OverlayContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    //@ts-ignore
    <FullWindowOverlay style={styles.parentContainer}>
      {children}
    </FullWindowOverlay>
  );
};

const styles = StyleSheet.create({
  parentContainer: { height: '100%', width: '100%', position: 'absolute' },
});
