import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

export class IsLoginConstraint implements ValidatorConstraintInterface {
  validate(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const emailRg = new RegExp('^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$');
    const alphanumRg = new RegExp('^[A-Za-z0-9]+$');
    return !(emailRg.test(value) || alphanumRg.test(value));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The value presented is not valid';
  }
}
