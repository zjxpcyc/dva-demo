
// times 构造空数组
export const times = (n) => {
  let i = 0;
  const res = [];
  while (i < n) {
    res[i] = i;
    i += 1;
  }
  return res;
};

// descartesSelf 按二维数组的层数自行迭代, 类似交集与笛卡儿积的形式
// [                  \     [
//   [1, 2, 3],    ----\      [1, 1, 1, 2, 2, 2, 3, 3, 3],
//   [a, b, c],    ----/      [a, b, c, a, b, c, a, b, c],
// ]                  /     ]
export const descartesSelf = (list) => {
  const res = [];
  if (!list || list.length === 0) return res;

  const getItems = (inx, arr) => {
    const len = arr[inx].length > 0 ? arr[inx].length : 1;

    if (!res[inx]) {
      res[inx] = [];
    }

    if (inx === arr.length - 1) {
      res[inx].push(...arr[inx]);
      return len;
    }

    let m = 1;
    arr[inx].forEach((x) => {
      m = getItems(inx + 1, arr);
      res[inx].push(...times(m).map(() => x));
    });

    return m * len;
  };
  getItems(0, list);

  return res;
};
