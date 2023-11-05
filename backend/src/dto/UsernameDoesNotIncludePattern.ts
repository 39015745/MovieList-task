import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'UsernameDoesNotIncludePattern', async: false })
export class UsernameDoesNotIncludePattern
  implements ValidatorConstraintInterface
{
  validate(username: string) {
    const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
    return !pattern.test(username);
  }

  defaultMessage() {
    return 'Username must not include special characters.';
  }
}

export function UsernameDoesNotIncludePatternValidation() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'Username must not include special characters.',
      },
      constraints: [],
      validator: UsernameDoesNotIncludePattern,
    });
  };
}
