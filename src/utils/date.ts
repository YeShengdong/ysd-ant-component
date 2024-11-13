import dayjs, { ConfigType, ManipulateType } from 'dayjs';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../constants';

export const dateFormat = (date?: ConfigType, format: string = DATE_FORMAT) => {
  return date ? dayjs(date).format(format) : '';
};

export const dateQuarter = (date?: ConfigType) => {
  return date;
};

export const toDate = (date?: ConfigType) => {
  return date ? dayjs(date) : undefined;
};

export const getEndOfDay = (date?: ConfigType) => dayjs(date).endOf('day');

export const getAfterDate = (
  date: ConfigType,
  gap: number,
  unit: ManipulateType = 'day',
) => {
  return dayjs(date).add(gap, unit);
};

export const getBeforeDate = (
  date: ConfigType,
  gap: number,
  unit: ManipulateType = 'day',
) => {
  return dayjs(date).subtract(gap, unit);
};

export const getDiffTime = (
  startDate: ConfigType,
  endDate: ConfigType,
  unit: ManipulateType = 'day',
): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return end.diff(start, unit);
};

export const getCurrentDate = (format = DATE_FORMAT) => dayjs().format(format);

export const parseDateRangeValue = (value: any[]): any => {
  const [start, end] = value || [];
  const newStartDate = start ? dateFormat(start, DATE_TIME_FORMAT) : null;
  const newEndDate = end
    ? dateFormat(getEndOfDay(end), DATE_TIME_FORMAT)
    : null;

  return [newStartDate, newEndDate];
};

export const parseDateRangeIsoValue = (value: any[]): any => {
  const [start, end] = value || [];
  const newStartDate = start ? toDate(start)?.toISOString() : null;
  const newEndDate = end ? getEndOfDay(end)?.toISOString() : null;

  return [newStartDate, newEndDate];
};
