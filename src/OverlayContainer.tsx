import React, { PropsWithChildren } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

export const OverlayContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Modal transparent={true}>
      <View style={styles.parentContainer}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parentContainer: { height: '100%', width: '100%', position: 'absolute' },
});
