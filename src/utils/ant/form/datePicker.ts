import dayjs from 'dayjs';

export const getShowTimeConfig = () => ({
  showTime: {
    hideDisabledOptions: true,
    defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
  },
  format: 'YYYY-MM-DD HH:mm:ss',
});
