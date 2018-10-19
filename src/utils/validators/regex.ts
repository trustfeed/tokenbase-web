export const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PASSWORD_REGEXP = /^[a-zA-Z0\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
export const PHONE_REGEXP = /^[+\d]?(?:[\d-.\s()]*)$/;
export const NUMBER_REGEXP = /^\d{0,}(\.\d{0,}){0,1}$/;
export const FLOAT_NUMBER_REGEXP = /^\d{1,9}(\.\d{0,9})?$/;
