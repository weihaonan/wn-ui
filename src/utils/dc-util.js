import Vue from 'vue';
export function getNumberText(num) {
  const { locale } = Vue.config;
  let number = num;
  if (number >= 100000000000) {
    // 大于1千亿
    number = (number / 100000000).toFixed(2);
    const numberStr = `${number}`;
    // eslint-disable-next-line radix
    return `${parseInt(number / 1000)},${numberStr.substring(number.length - 6)
    }亿`;// 亿
  } if (number >= 100000000) {
    // 大于1亿
    number = parseFloat(number) / 100000000;
    return `${number.toFixed(2)}亿`; // 亿
  } if (number >= 10000) {
    // 大于1万
    if (/^en/ig.test(locale)) {
      number = parseFloat(number) / 1000;
    } else {
      number = parseFloat(number) / 10000;
    }
    return `${number.toFixed(2)}万`;// 万
  } if (number >= 1000) {
    // 大于1千
    let numberStr = '';
    // eslint-disable-next-line radix
    numberStr += parseInt(number / 1000);
    const remainder = number % 1000;
    if (remainder >= 100) {
      numberStr += `,${remainder}`;
    } else if ((number % 1000) >= 10) {
      numberStr += `,0${remainder}`;
    } else {
      numberStr += `,00${remainder}`;
    }
    return numberStr;
  }
  return number;
};
// 校验保存文本
export function validateInput(str) {
  const nameRegexp = /^[^\\/<>&“”‘’'"]*$/g;
  nameRegexp.lastIndex = 0;
  return nameRegexp.test(str);
};
