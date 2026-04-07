import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();
const PEPPER = process.env.PEPPER;

export const hashPassword = async (password) => {
  const toHash = password + PEPPER;
  return await argon2.hash(toHash);
};

export const verifyPassword = async (password, hash) => {
  const toVerify = password + PEPPER;
  return await argon2.verify(hash, toVerify);
};
