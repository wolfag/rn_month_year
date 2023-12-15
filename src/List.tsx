import React, {useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  ListRenderItemInfo,
  View,
} from 'react-native';
import Item from './Item';
import {BORDER_WIDTH, MARGIN_BOX} from './const';
import {ItemData} from './types';

interface Props {
  selectedItem?: ItemData;
  onPress?: (item: ItemData) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  data: ItemData[];
  row?: number;
  col?: number;
  renderItem?: ListRenderItem<ItemData>;
}

const List = ({
  selectedItem,
  data,
  row = 4,
  col = 3,
  onLayout,
  onPress,
  renderItem,
}: Props) => {
  const [boxSize, setBoxSize] = useState(0);

  const renderDefault: ListRenderItem<ItemData> = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => onPress?.(item)}
        onLayout={e => setBoxSize(e.nativeEvent.layout.height)}
        isSelected={selectedItem?.key === item.key}
      />
    );
  };

  const handleRenderItem = (renderProps: ListRenderItemInfo<ItemData>) => {
    if (renderItem) {
      return renderItem(renderProps);
    } else {
      return renderDefault(renderProps);
    }
  };

  return (
    <View onLayout={onLayout}>
      <View
        style={{
          backgroundColor: 'pink',
          height: (boxSize + (BORDER_WIDTH + MARGIN_BOX)) * row,
        }}>
        <FlatList
          data={data}
          numColumns={col}
          horizontal={false}
          keyExtractor={item => `${item.key}`}
          renderItem={handleRenderItem}
        />
      </View>
    </View>
  );
};

export default List;
