/* eslint-disable no-param-reassign */

// O(n*k), n - length of array, k - length of largest number

const getDigit = (num, i) => Math.floor(Math.abs(num) / 10 ** i) % 10;

const digitCount = (num) => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);

const mostDigits = (nums) => nums.reduce((acc, num) => Math.max(acc, digitCount(num)));

/**
 * @param {Array<Object>} arr
 * @param {string} sortByKey
 * @param {boolean} [isAscending]
 * @returns {arr} sortedArr
 * */
const radixSort = (arr, sortByKey, isAscending) => {
  const nums = arr.map((obj) => obj[sortByKey] || 0);
  const maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k += 1) {
    const digitBuckets = Array.from({ length: 10 }, () => []);

    arr.forEach((el) => {
      const digit = getDigit(el[sortByKey] || 0, k);
      digitBuckets[digit].push(el);
    });

    // eslint-disable-next-line
        (function flatten() {
      // eslint-disable-next-line no-param-reassign
      arr = [];
      const cb = (bucket, current) => {
        arr = bucket.concat(current);
        return arr;
      };

      return isAscending
        ? digitBuckets.reduce(cb)
        : digitBuckets.reduceRight(cb);
    })();
  }
  return arr;
};

export default radixSort;
