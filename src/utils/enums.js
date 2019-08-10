const enums = {
  MENU_TYPE: {
    MENU: {value: 1, label: '新建'},
    BUTTON: {value: 2, label: '修改'},
  },
};

//

// 格式化公用函数
export const enumsFormatter = (enums, notMatch = '-') => info=> {
    for (const key in enums) {
      if (enums[key].value== info) {
        return enums[key].label;
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
 const enumsArray = {
   menuType: toArray(enums.MENU_TYPE)
 }

