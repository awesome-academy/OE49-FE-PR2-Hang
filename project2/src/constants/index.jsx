export const PRODUCT_API_URL = "http://localhost:3000/products";

export const USER_API_URL = "http://localhost:3000/users";

export const phone_regex =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

export const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const password_regex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
