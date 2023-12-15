import React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {BORDER_WIDTH, BOX_HEIGHT, BOX_WIDTH, MARGIN_BOX} from './const';
import {ItemData} from './types';

interface Props {
  onPress?: () => void;
  isSelected?: boolean;
  item: ItemData;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const Item = ({onPress, isSelected, item, onLayout}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLayout={onLayout}
      style={[styles.box, isSelected && styles.selected]}>
      <Text style={isSelected && styles.selected}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: BORDER_WIDTH,
    borderColor: 'black',
    margin: MARGIN_BOX,
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  selected: {
    backgroundColor: 'blue',
    color: 'white',
  },
});

export default Item;
