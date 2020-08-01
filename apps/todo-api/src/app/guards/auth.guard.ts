import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    ctx.user = this.validateToken(ctx.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    const components = auth.split(' ');
    if (components[0] !== 'Bearer') {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    const token = components[1];
    try {
      return jwt.verify(token, this.config.get('auth.secret'));
    } catch (e) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
