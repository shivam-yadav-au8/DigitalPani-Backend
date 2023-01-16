import { Injectable } from '@nestjs/common';
import {
  JWTPayload,
  Token,
} from '../authentication/interfaces/jwt-payload.interface';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: JWTPayload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  }
  async validateToken(payload: Token) {
    const { token } = payload;
    try {
      const validated = verify(token, process.env.SECRET_KEY);
      if (validated) return true;
    } catch (error) {
      return false;
    }
  }
  async validateUser(payload: JWTPayload) {
    return await this.userService.findByPayload(payload);
  }
}
