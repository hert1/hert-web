import React from 'react';
import {Badge} from 'antd';

const enums = {
  EDIT_TYPE: {
    CREATE: {value: 1, desc: '新建'},
    UPDATE: {value: 2, desc: '修改'},
    CONFIRM: {value: 3, desc: '确认'},
    AUDIT: {value: 4, desc: '审核'},
  },
};

//
export const isCreate = (value) => value&& value=== enums.EDIT_TYPE.CREATE.value

// 格式化公用函数
export const enumsFormatter = (enums, notMatch = '-') => info=> {
    for (const key in enums) {
      if (enums[key].value== info) {
        return enums[key].desc;
      }
    }
    return notMatch;
  };

// 对象转数组
export const toArray = enums => {
  const arr = [];
  for (const key in enums) {
    arr.push(enums[key]);
  }
  return arr;
};

// 状态格式化
export const adminTypeFormatter = enumsFormatter(enums.EDIT_TYPE);

export default enums;
