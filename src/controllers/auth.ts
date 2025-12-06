import { Request, Response, NextFunction } from "express";
import { prismaClient } from "..";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { loginSchema, signUpSchema } from "../schemas/user";
import { NotFoundException } from "../exceptions/not-found";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  signUpSchema.parse(req.body);
  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (user)
    throw new BadRequestException(
      "User already exists",
      ErrorCodes.USER_ALREADY_EXISTS
    );
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await prismaClient.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = jwt.sign(user.id.toString(), env.JWT_SECRET as string);

  res.status(200).json({ user, token });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  loginSchema.parse(req.body);
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({ where: { email } });

  if (!user)
    throw new NotFoundException(
      "User does not exist",
      ErrorCodes.USER_DOES_NOT_EXIST
    );
    console.log(user.password, password);
    
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch)
    throw new BadRequestException(
      "Passwords don't match",
      ErrorCodes.INCORRECT_PASSWORD
    );

  const token = jwt.sign(user.id.toString(), env.JWT_SECRET as string);

  res.status(200).json({ token: token });
};

const me = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  res.json(req.user);
};

export { signUp, login, me };
