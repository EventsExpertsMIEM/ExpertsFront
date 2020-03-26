// O(n*k), n - length of array, k - length of largest number

const getDigit = (num, i) => Math.floor(Math.abs(num) / 10 ** i) % 10;

const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

const mostDigits = (nums) => {
  let maxDigits = 0;
  nums.forEach((num) => {
    maxDigits = Math.max(maxDigits, digitCount(num));
  });
  return maxDigits;
};

const flatten = (arr, order, digitBuckets) => {
  // eslint-disable-next-line no-param-reassign
  arr = [];
  const cb = (acc, current) => {
    // eslint-disable-next-line no-param-reassign
    arr = acc && acc.concat(current);
    return arr;
  };

  return order === 'ASC'
    ? digitBuckets.reduce(cb, [])
    : digitBuckets.reduceRight(cb, []);
};

const sort = (arr, maxDigitCount, sortByKey, order) => Array.from({ length: maxDigitCount })
  .map((_, k) => {
    const digitBuckets = Array.from({ length: 10 }, () => []);

    arr.forEach((el) => {
      const digit = getDigit(el[sortByKey] || 0, k);
      digitBuckets[digit].push(el);
    });

    return flatten(arr, order, digitBuckets);
  });


/**
 * @param {array} arr
 * @param {string} sortByKey
 * @param {('ASC'|'DESC')} order
 * @returns {undefined}
 */
const radixSort = (arr, sortByKey, order = 'ASC') => {
  const nums = arr.map((obj) => obj[sortByKey] || 0);
  const maxDigitCount = mostDigits(nums);
  const sortedArr = sort(arr, maxDigitCount, sortByKey, order).pop();

  return sortedArr;
};

export default radixSort;
