import { Module, Global } from '@nestjs/common';

import { EmailScalar } from './scalars/email.scalar';
import { PasswordScalar } from './scalars/password.scalar';

@Module({
  providers: [EmailScalar, PasswordScalar],
})
@Global()
export class CommonsModule {}
