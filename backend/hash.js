import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();
// pepper burde ligge i .env
const PEPPER = "supersecretpepper123";

export const hashPassword = async (password) => {
  const toHash = password + PEPPER;
  // argon2 generer et tilfældigt salt og det hele hashes
  return await argon2.hash(toHash);
};

export const verifyPassword = async (password, hash) => {
  const toVerify = password + PEPPER;
  return await argon2.verify(hash, toVerify);
};
