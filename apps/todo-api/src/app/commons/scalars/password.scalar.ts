import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode, Kind } from 'graphql';

@Scalar('Password')
export class PasswordScalar implements CustomScalar<String, String> {
  description = 'Password custom scalar type';

  parseValue(value: string): string {
    if (!value || value.length < 6) {
      throw new Error('Invalid password format');
    }
    return value; // value from the client
  }

  serialize(value: string): string {
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  }
}
