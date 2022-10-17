export function stringTrim(value, index = 2) {
  if (value !== undefined) {
    const parts = value && value.split(',');
    const firstTwo = parts.slice(0, index);
    const result = firstTwo.join(',');
    return result;
  } else {
    // console.log('UNDEFINED TRIM');
  }
}
export function LastStringTrim(value) {
  if (value !== undefined) {
    const parts = value && value.lastIndexOf('/');
    const result = value.slice(parts + 1);
    return result;
  } else {
    // console.log('UNDEFINED TRIM');
  }
}
