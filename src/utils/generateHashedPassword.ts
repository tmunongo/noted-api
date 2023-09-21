import * as bcrypt from 'bcrypt';

// Function to generate a random password and hash it
export const generateHashedPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return { password, hashedPassword };
};
