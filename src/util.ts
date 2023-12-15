import dayjs from 'dayjs';
import {ItemData} from './types';

export const monthNumberToText = (month: number) =>
  dayjs(`2023-${month}-01`).format('MMM');

export const genMonths = () => {
  return Array(12)
    .fill(0)
    .map((_, index) => ({
      key: index + 1,
      label: monthNumberToText(index + 1),
    }));
};

export const genYears = ({
  from,
  amount,
  greater,
}: {
  from?: number;
  amount?: number;
  greater?: boolean;
}) => {
  const y = from || new Date().getFullYear();
  const a = amount || 21 * 2;
  const list = [];
  for (let i = 0; i <= a; i++) {
    const tmp = y + (greater ? i : -i);
    list.push({
      key: tmp,
      label: `${tmp}`,
    });
  }

  if (!greater) {
    return list.reverse();
  }

  return list;
};

export const calculateYearBlockIndex = ({
  data,
  currentYear,
  col,
  row,
}: {
  data: ItemData[];
  currentYear: ItemData;
  col: number;
  row: number;
}) => {
  const index = data.findIndex(item => item.key === currentYear.key);
  return Math.floor(index / (col * row));
};

export const calculateYearBlock = ({
  data,
  col,
  row,
}: {
  data: ItemData[];
  col: number;
  row: number;
}) => {
  const list = [];
  let start = 0;
  let end = col * row;
  while (end < data.length) {
    list.push(data.slice(start, end));
    start = end;
    end += col * row;
  }
  return list;
};
