/* eslint-disable*/
import dateFormat from './dateFormat';
import {getWeekDate} from './dateFormat'
import { t } from '../../../src/locale';
console.log(t('dc.timeDate.last5Minute'))
const timeDate = {
  shortcuts: [
    {
      label: t('dc.timeDate.last5Minute'),
      type: 't5',
      picker: (newTime) => {
        console.log(t)
        const baseTime = newTime || new Date();
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          new Date(baseTime).getHours(),
          new Date(baseTime).getMinutes() - 5,
          new Date(baseTime).getSeconds()
        );
        const end = new Date(baseTime);
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.last30Minute'),
      type: 't30',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          new Date(baseTime).getHours(),
          new Date(baseTime).getMinutes() - 30,
          new Date(baseTime).getSeconds()
        );
        const end = new Date(baseTime);
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.last1Hour'),
      type: 't60',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          new Date(baseTime).getHours() - 1,
          new Date(baseTime).getMinutes(),
          new Date(baseTime).getSeconds()
        );
        const end = new Date(baseTime);
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.today'),
      type: 'today',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        // 获取当天的开始时间
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          '00',
          '00',
          '00'
        );
        // 获取当天的结束时间
        const end = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          '23',
          '59',
          '59'
        );
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.yesterday'),
      type: 'lastday',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        // 获取昨日的开始时间
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate() - 1,
          '00',
          '00',
          '00'
        );
        // 获取昨日的结束时间
        const end = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate() - 1,
          '23',
          '59',
          '59'
        );
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.last7Day'),
      type: 'last7day',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate() - 6,
          '00',
          '00',
          '00'
        );
        const end = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          '23',
          '59',
          '59'
        );
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.tweek'),
      type: 'tweek',
      picker: (newTime) => {
        const start = getWeekDate(new Date()).weekStartDate;
        const end = getWeekDate(new Date()).weekEndDate;
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.lastweek'),
      type: 'lastweek',
      picker: (newTime) => {
        const start = getWeekDate(
          new Date().setDate(new Date().getDate() - 7)
        ).weekStartDate;
        const end = getWeekDate(
          new Date().setDate(new Date().getDate() - 7)
        ).weekEndDate;
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.last30Day'),
      type: 'last30day',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate() - 30,
          '00',
          '00',
          '00'
        );
        const end = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          new Date(baseTime).getDate(),
          '23',
          '59',
          '59'
        );
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.thisMonth'),
      type: 'tmonth',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        // 获取当天的开始时间
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          '01',
          '00',
          '00',
          '00'
        );
        // 获取当天的结束时间
        const end = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth() + 1,
          '00',
          '23',
          '59',
          '59'
        );
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.lastMonth'),
      type: 'lastmonth',
      picker: (newTime) => {
        const baseTime = newTime || new Date();
        // 获取当天的开始时间
        const start = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth() - 1,
          '01',
          '00',
          '00',
          '00'
        );
        // 获取当天的结束时间
        const end = new Date(
          new Date(baseTime).getFullYear(),
          new Date(baseTime).getMonth(),
          '00',
          '23',
          '59',
          '59'
        );
        return [start, end];
      },
    },
    {
      label: t('dc.timeDate.custom'),
      type: 'diy',
      value: false,
    },
  ],
  pickerOptions(newTime) {
    return timeDate.shortcuts.map((a) => {
      let { value } = a;
      if (value == undefined) {
        const picker = a.picker(newTime);
        value = [
          dateFormat(picker[0], '%Y-%M-%D %H:%I:%S'),
          dateFormat(picker[1], '%Y-%M-%D %H:%I:%S'),
        ];
      }
      return {
        ...a,
        value,
      };
    });
  },
  getTimeWidthType(type,newTime) {
    const pickerOptions = timeDate.pickerOptions(newTime);
    const isExist = pickerOptions.find(
      (a) => a.type == type
    );
    return isExist.value || false;
  },
  getTypeWidthTime(time,newTime) {
    const pickerOptions = timeDate.pickerOptions(newTime); 
    const isExist = pickerOptions.find(
      (a) => (a.value || []).join() == time.join()
    )||{};
    return isExist.type || '';
  },
};
export default timeDate;
