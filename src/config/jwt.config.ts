import { registerAs } from "@nestjs/config";

export interface JwtConfig {
  accessTokenSigner: {
    secret: string;
    expiresIn: string;
  },
  refreshTokenSigner: {
    secret: string;
    expiresIn: string;
  }
}

export const jwtLoader = registerAs<JwtConfig>('jwt', () => ({
  accessTokenSigner: {
    secret: process.env.JWT_ACCESS_SECRET || "",
    expiresIn: process.env.JWT_ACCESS_EXPIRES || ""
  },
  refreshTokenSigner: {
    secret: process.env.JWT_REFRESH_SECRET || "",
    expiresIn: process.env.JWT_REFRESH_EXPRIES || ""
  }
}))
