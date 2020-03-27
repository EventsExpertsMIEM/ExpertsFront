// Sorting time complexity O(n*k), n - length of the array, i - length of the largest number

const getDigit = (num, i) => Math.floor(Math.abs(num) / 10 ** i) % 10;

const digitCount = (num) => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);

const mostDigits = (nums) => nums.reduce((acc, num) => Math.max(acc, digitCount(num)));

/**
 * @param {Array<Object>} arr
 * @param {string} sortByKey
 * @param {boolean} [isAscending]
 * @returns {arr} sortedArr
 */
const radixSort = (arr, sortByKey, isAscending = true) => {
  const nums = arr.map((obj) => obj[sortByKey] || 0);
  const maxDigitCount = mostDigits(nums);

  const sort = ((_, i) => {
    const digitBuckets = Array.from({ length: 10 }, () => []);

    arr.forEach((el) => {
      const digit = getDigit(el[sortByKey] || 0, i);
      digitBuckets[digit].push(el);
    });
  });

  Array.from({ length: maxDigitCount }, sort);

  return isAscending ? arr : arr.reverse();
};

export default radixSort;
