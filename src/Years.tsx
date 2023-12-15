import React from 'react';
import {LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import List from './List';
import {YEAR_COL, YEAR_ROW} from './const';
import {ItemData} from './types';

interface Props {
  selectedItem: ItemData;
  data: ItemData[];
  col?: number;
  row?: number;
  onPress?: (item: ItemData) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Years = ({
  selectedItem,
  data,
  col = YEAR_COL,
  row = YEAR_ROW,
  onLayout,
  onPress,
  onLeftPress,
  onRightPress,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={onLeftPress}
          style={{
            padding: 20,
            backgroundColor: 'pink',
          }}>
          <Text>{`<`}</Text>
        </TouchableOpacity>
      </View>
      <List
        selectedItem={selectedItem}
        data={data}
        row={row}
        col={col}
        onPress={onPress}
        onLayout={onLayout}
      />
      <View
        style={{
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={onRightPress}
          style={{
            padding: 20,
            backgroundColor: 'pink',
          }}>
          <Text>{`>`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Years;
