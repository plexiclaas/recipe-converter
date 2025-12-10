/**
 * Calculate the area of a circle given its diameter
 * @param {number} diameter - The diameter of the circle
 * @returns {number} The area of the circle
 */
export const circleArea = (diameter) => {
  const r = diameter / 2;
  return Math.PI * r * r;
};

/**
 * Calculate the area of a rectangle given width and length
 * @param {number} width - The width of the rectangle
 * @param {number} length - The length of the rectangle
 * @returns {number} The area of the rectangle
 */
export const rectArea = (width, length) => width * length;



