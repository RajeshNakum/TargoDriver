export const notEmptyString = value => value && value.length > 0;

// Email address validation
export const isEmail = value => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(value);
};

// Mobile number validation
export const isMobile = value => {
  const regex = /^[+]*[(]{0,1}[0-9]{8,12}[)]{0,1}[-\s\./0-9]*$/g;
  return regex.test(value);
};

// Vehicle number validation
export const isVehicleNUmber = value => {
  let regex =
    /^[A-Z]{2}[\\ -]{0, 1}[0-9]{2}[\\ -]{0, 1}[A-Z]{1, 2}[\\ -]{0, 1}[0-9]{4}$/;
  return regex.test(value);
};

export const isEmpty = value => {
  if (value != null) {
    return value.trim() === '';
  } else {
    return ' ';
  }
};

// Check the return custom condition
export function renderIf(condition, component) {
  if (condition) {
    return component;
  } else {
    return null;
  }
}
