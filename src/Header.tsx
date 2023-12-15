import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ItemData} from './types';

interface Props {
  month?: ItemData;
  year?: ItemData;
  style?: ViewStyle;
  monthPress?: () => void;
  yearPress?: () => void;
  leftPress?: () => void;
  rightPress?: () => void;
}

const Header = ({
  month,
  year,
  style,
  monthPress,
  yearPress,
  leftPress,
  rightPress,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={leftPress}>
        <Text>{`<`}</Text>
      </TouchableOpacity>
      <View style={styles.titleGroup}>
        <TouchableOpacity style={styles.btnTitle} onPress={monthPress}>
          <Text style={{color: 'white'}}>{month?.label || ''}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTitle} onPress={yearPress}>
          <Text style={{color: 'white'}}>{year?.label || ''}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={rightPress}>
        <Text>{`>`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  btnTitle: {
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  titleGroup: {
    flexDirection: 'row',
  },
});

export default Header;
