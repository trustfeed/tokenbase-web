export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PASSWORD_REGEX = /^[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
export const PHONE_REGEX = /^[+\d]?(?:[\d-.\s()]*)$/;
export const NUMBER_REGEX = /^\d{0,}(\.\d{0,}){0,1}$/;
export const FLOAT_NUMBER_REGEX = /^\d{1,9}(\.\d{0,9})?$/;
export const ALPHANUMERIC_REGEX = /^[a-z0-9\s]+$/i;
export const ALPHABETIC_REGEX = /^[a-zA-Z]+$/;
