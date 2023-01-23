import React, {
  useState,
  useImperativeHandle,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { BackHandler, View, ViewStyle } from 'react-native';
import { magicOverlayRef } from './MagicOverlayHandlers';
import type {
  NewOverlayProps,
  OverlayContent,
  TMagicOverlay,
} from './MagicOverlayHandlers';
import { OverlayContainer } from './OverlayContainer';

type ResolveFunction = (props?: any) => void;

type MagicOverlayPortalProps = { defaultBackdropStyle?: ViewStyle };

/**
 * @description A magic portal that should stay on the top of the app component hierarchy for the overlay to be displayed.
 */
export const MagicOverlayPortal: React.FC<MagicOverlayPortalProps> = ({
  defaultBackdropStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<NewOverlayProps>({});
  const [overlayContent, setOverlayContent] = useState<OverlayContent>(() => (
    <></>
  ));
  const lastPromiseDidResolve = useRef(true);

  const resolveRef = useRef<ResolveFunction>(() => {});

  const hide = useCallback<TMagicOverlay['hide']>(async (props) => {
    setIsVisible(false);
    resolveRef.current(props);
  }, []);

  useImperativeHandle(magicOverlayRef, () => ({
    hide: hide,
    show: async (
      newContent: OverlayContent,
      newProps: Partial<NewOverlayProps> = {}
    ) => {
      if (!lastPromiseDidResolve.current) {
        resolveRef.current(undefined);
      }
      setOverlayContent(newContent);
      setConfig(newProps);
      lastPromiseDidResolve.current = false;
      setIsVisible(true);
      return new Promise((resolve) => {
        resolveRef.current = (value) => {
          resolve(value);
          lastPromiseDidResolve.current = true;
        };
      });
    },
  }));

  useEffect(() => {
    if (isVisible) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setIsVisible(false);
          return true;
        }
      );
      return () => {
        backHandler.remove();
      };
    } else {
      return () => {};
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <OverlayContainer>
          <View
            style={[
              originalBackdropStyle,
              defaultBackdropStyle,
              config.backdropStyle,
            ]}
          >
            {overlayContent}
          </View>
        </OverlayContainer>
      )}
    </>
  );
};

const originalBackdropStyle: ViewStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
};
