/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Header from './Header';
import List from './List';
import Years from './Years';
import {
  calculateYearBlock,
  calculateYearBlockIndex,
  genMonths,
  genYears,
} from './util';
import {ItemData} from './types';
import {YEAR_COL, YEAR_ROW} from './const';

function App(): React.JSX.Element {
  const monthList = genMonths();
  const [yearList, setYearList] = useState(() => {
    const y = new Date().getFullYear();
    const y1 = genYears({from: y, greater: false});
    const y2 = genYears({from: y + 1, greater: true});
    return [...y1, ...y2];
  });

  const [month, setMonth] = useState<ItemData>(() => {
    const currentMonth = new Date().getMonth();
    return monthList[currentMonth];
  });
  const [year, setYear] = useState<ItemData>(() => {
    const currentYear = new Date().getFullYear();
    const yearIndex = yearList.findIndex(item => item.key === currentYear);
    return yearList[yearIndex];
  });

  const [yearBlockIndex, setYearBlockIndex] = useState(() =>
    calculateYearBlockIndex({
      data: yearList,
      currentYear: year,
      col: YEAR_COL,
      row: YEAR_ROW,
    }),
  );

  const yearBlocks = useMemo(
    () => calculateYearBlock({data: yearList, col: YEAR_COL, row: YEAR_ROW}),
    [yearList],
  );

  const [view, setView] = useState<'day' | 'month' | 'year'>('month');

  const [boxWidth, setBoxWidth] = useState(0);

  const leftMonthPress = () => {
    if (month.key > 1) {
      setMonth(monthList[month.key - 2]);
    } else {
      const yearIndex = yearList.findIndex(item => item.key === year.key);
      if (yearList[yearIndex - 1]) {
        setYear(yearList[yearIndex - 1]);
      } else {
        const newYears = genYears({from: year.key - 1, greater: false});
        setYear(newYears[newYears.length - 1]);
        setYearList([...newYears, ...yearList]);
        setYearBlockIndex(
          Math.floor((newYears.length - 1) / (YEAR_COL * YEAR_ROW)),
        );
      }
      setMonth(monthList[monthList.length - 1]);
    }
  };

  const rightMonthPress = () => {
    if (month && month.key < 12) {
      setMonth(monthList[month.key]);
    } else {
      const yearIndex = yearList.findIndex(item => item.key === year.key);
      if (yearList[yearIndex + 1]) {
        setYear(yearList[yearIndex + 1]);
      } else {
        const newYears = genYears({from: year.key + 1, greater: true});
        setYear(newYears[0]);
        setYearList([...yearList, ...newYears]);
        setYearBlockIndex(yearBlockIndex + 1);
      }
      setMonth(monthList[0]);
    }
  };

  const leftYearPress = () => {
    if (yearBlocks[yearBlockIndex - 1]) {
      setYearBlockIndex(yearBlockIndex - 1);
    } else {
      const newYears = genYears({from: yearList[0].key - 1, greater: false});
      setYearList([...newYears, ...yearList]);
      setYearBlockIndex(
        Math.floor((newYears.length - 1) / (YEAR_COL * YEAR_ROW)),
      );
    }
  };

  const rightYearPress = () => {
    if (yearBlocks[yearBlockIndex + 1]) {
      setYearBlockIndex(yearBlockIndex + 1);
    } else {
      const newYears = genYears({
        from: yearList[yearList.length - 1].key + 1,
        greater: true,
      });
      setYearList([...yearList, ...newYears]);
      setYearBlockIndex(yearBlockIndex + 1);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}>
      <Header
        month={month}
        year={year}
        leftPress={leftMonthPress}
        rightPress={rightMonthPress}
        monthPress={() => setView('month')}
        yearPress={() => {
          setView('year');
          setYearBlockIndex(
            calculateYearBlockIndex({
              data: yearList,
              currentYear: year,
              col: YEAR_COL,
              row: YEAR_ROW,
            }),
          );
        }}
        style={{width: boxWidth}}
      />
      {view === 'month' && (
        <List
          selectedItem={month}
          data={monthList}
          onLayout={e => setBoxWidth(e.nativeEvent.layout.width)}
          onPress={m => {
            setMonth(m);
          }}
        />
      )}
      {view === 'year' && (
        <Years
          selectedItem={year}
          data={yearBlocks[yearBlockIndex]}
          col={YEAR_COL}
          row={YEAR_ROW}
          onLeftPress={leftYearPress}
          onRightPress={rightYearPress}
          onPress={y => {
            setYear(y);
            setView('month');
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default App;
