/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

// 根据form字段获取初始值
export const getFormValues = (form, source) => {
  const formValues = {};
  Object.keys(form.getFieldsValue()).forEach(key => {
    formValues[key] = source[key] !== undefined ? source[key] : null;
  });
  return deepClone(formValues);
}

/**
 * 判断是否是函数
 * @param obj
 * @returns {boolean}
 */
export const isFunction = (obj) => {
  return typeof obj === 'function';
}

// 根据某个字段的值从list中获取对象
export const getActiveItemByFiledName = (list, filedName, value) => {
  return list.filter(item => item[filedName] == value );
}

/*tree 转list 辅助工具*/
export const generateList = (data) => {
  let dataList = [];
  if (!data || !data.length) return dataList
    for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const id = node.id;
    if(id != 0) {
      dataList.push({ id, name: node.name });
    }

    if (node.children) {
      dataList = [...dataList, ...generateList(node.children)]
    }
  }
  return dataList;
};

/**
 * 获取树结构里面第一个没有children的节点
 * @param treeData
 * @returns {string}
 */
export const getFirstNode = treeData => {
  if(treeData === undefined || !treeData) return null;
  if(treeData.children && treeData.children.length) {
    return getFirstNode(treeData.children[0])
  }
  return treeData
};

/**
 * 合并单元格，设置某一行的列数
 * @param colName, data
 * @returns Map<index, num>
 */
export const setTableRowNum = (colName, data) => {
  let new_clientRowNum = new Map();
  if(!data) return new_clientRowNum;
  let flag = true;
  let now_colName = '';
  for(let i = 0; i < data.length; i++) {
    if (now_colName !== data[i][colName]) {
      flag = true;
      now_colName = data[i][colName]
    }
    const num = data.filter(item => item[colName] === now_colName).length
    if (flag && num) {
      new_clientRowNum.set(i, num);
      flag = false
    } else {
      new_clientRowNum.set(i, 0)
    }
  }
  return new_clientRowNum
};
