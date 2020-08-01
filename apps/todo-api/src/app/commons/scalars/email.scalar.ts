import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode, Kind } from 'graphql';

const EMAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

@Scalar('Email')
export class EmailScalar implements CustomScalar<String, String> {
  description = 'Email custom scalar type';

  parseValue(value: string): string {
    if (!value || !EMAIL_REGEX.test(value)) {
      throw new Error('Invalid email format');
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
