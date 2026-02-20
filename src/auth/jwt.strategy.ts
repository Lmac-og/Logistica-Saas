import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // pega o token do header Authorization
      ignoreExpiration: false, // rejeita tokens expirados
      secretOrKey: process.env.JWT_SECRET || 'segredo_super_forte', // deve ser o mesmo do JwtModule
    });
  }

  async validate(payload: any) {
    // Esse retorno será injetado pelo decorator @CurrentUser()
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}