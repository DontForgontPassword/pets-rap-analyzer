/**
 * Comprares old and new data percentage descending
 * @param a
 * @param b
 * @returns {number} percentage
 */
const comprare = (a, b) => {
    return Math.floor((a - b) / a * 100);
}

module.exports.comprare = comprare;