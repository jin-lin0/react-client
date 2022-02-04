const isArrayEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const isArrayEmpty = (arr) => !Array.isArray(arr) || arr.length;

const unionArrays = (...arr) => Array.from(new Set(arr.flat()));

const toSubsetsArrays = (arr) => arr.reduce((t, v) => t.concat(t.map(i => i.concat(v))), [[]]);

/* Object Array */

const toObjectByKey = (objArr, key) => objArr.reduce((t, v) => ({ ...t, [v[key]]: v }), {});

const countByKey = (objArr, key) => objArr.reduce((t, v) => ((t[v[key]] = ++t[v[key]] || 1), t), {});
