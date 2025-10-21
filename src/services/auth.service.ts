import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { RegisterDTO, LoginDTO } from "../dtos/auth.dto";

export class AuthService {
  async register(data: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const hash = await bcrypt.hash(data.password, config.bcryptSaltRounds);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash
      }
    });

    const token = this.generateToken(user.id);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      token
    };
  }

  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error("Credenciales inválidas");
    }

    const token = this.generateToken(user.id);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      token
    };
  }

  private generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    config.jwtSecret as string,
    {
      expiresIn: config.jwtExpiresIn
    }
  );
}
}
