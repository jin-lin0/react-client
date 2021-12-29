const isArrayEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const isArrayEqualDisOrder = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

const isArrayEmpty = (arr) => !Array.isArray(arr) || arr.length;

const castArray = (v) => Array.isArray(v) ? v : [v];

const cloneArray = (arr) => Array.from(arr);

const unionArrays = (...arr) => Array.from(new Set(arr.flat()));

const toNumberArray = (arr) => arr.map(Number);

const toEmptyArray = (arr) => arr.length = 0;

const toSubsetsArrays = (arr) => arr.reduce((t, v) => t.concat(t.map(i => i.concat(v))), [[]]);

/* Object Array */

const toObjectByKey = (objArr, key) => objArr.reduce((t, v) => ({ ...t, [v[key]]: v }), {});

const countByKey = (objArr, key) => objArr.reduce((t, v) => ((t[v[key]] = ++t[v[key]] || 1), t), {});
