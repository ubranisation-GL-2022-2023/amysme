import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEnum } from '../enums/department.enum';
import { PaymentMethodEnum } from '../enums/paymentmethod.enum';
import { RoleEnum } from '../enums/role.enum';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsAlpha,
  IsAlphanumeric,
  Matches,
  IsDate,
  MaxDate,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsNumberString,
  IsEnum,
} from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id: string;

  @Column({
    name: 'username',
    type: String,
    nullable: false,
    length: 20,
    unique: true,
  })
  @IsString({ message: 'String is required for the username' })
  @IsAlphanumeric('The username must be alphanumeric')
  @IsNotEmpty({ message: 'The username is required' })
  @MinLength(3, {
    message: 'A username must not be shorter than 3 charachters',
  })
  @MaxLength(20, {
    message: 'A username must not be longer than 20 characters',
  })
  username: string;

  @Column({
    name: 'firstname',
    type: String,
    nullable: false,
    length: 20,
  })
  @IsString({ message: 'String is required for the first name' })
  @IsAlpha('EN', { message: 'The firstname must be alphabetique' })
  @IsNotEmpty({ message: 'The firstname is required' })
  @MinLength(3, {
    message: 'A firstname must not be shorter than 3 charachters',
  })
  @MaxLength(20, {
    message: 'A firstname must not be longer than 20 characters',
  })
  firstname: string;

  @Column({
    name: 'lastname',
    type: String,
    nullable: false,
    length: 20,
  })
  @IsString({ message: 'String is required for the first name' })
  @IsAlpha('EN', { message: 'The lastname must be alphabetique' })
  @IsNotEmpty({ message: 'The firstname is required' })
  @MinLength(3, {
    message: 'A firstname must not be shorter than 3 charachters',
  })
  @MaxLength(20, {
    message: 'A firstname must not be longer than 20 characters',
  })
  lastname: string;

  @Column({
    name: 'password',
    type: String,
    nullable: false,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must be not empty' })
  @MinLength(8, { message: 'Password must be of at least 8 characters' })
  @Matches(
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*\/])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).*$/,
    {
      message:
        'Password must contain at least 3 lowercase characters, 2 Uppercase characters (!@#$&*/), a special character and 2 digits',
    },
  )
  password: string;

  @Column({
    name: 'Date_Of_Birth',
    type: Date,
    nullable: true,
  })
  @IsDate({ message: 'A date is required' })
  @IsOptional()
  @MaxDate(new Date(), { message: 'Date value unacceptable' })
  dateOfBirth?: Date;

  @Column({
    name: 'Email',
    type: String,
    nullable: false,
  })
  @IsNotEmpty({ message: 'The Email is required' })
  @IsString({ message: 'The Email must be a string' })
  @IsEmail({ message: 'Email form in not valid' })
  email: string;

  @Column({
    name: 'phone',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'The phone number must be a string' })
  @IsPhoneNumber('TN', { message: 'The provided phone  number is not valid' })
  phoneNumber: string;

  @Column()
  adress_id: string;

  @Column({
    name: 'Bank_Account',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'The bank account ID must be a string' })
  @Length(16, 16, {
    message: 'The bank account Id must be formed of 16 caracters',
  })
  @IsNumberString({ message: 'The bank account Id is a number' })
  bankAccount: string;

  @Column({
    name: 'Payment_Methods',
    nullable: true,
    type: 'enum',
    enum: PaymentMethodEnum,
    array: true,
  })
  @IsOptional()
  @IsEnum(PaymentMethodEnum, {
    message: 'Invalid value of the payment method: Not recognized',
  })
  paymentMethod: PaymentMethodEnum[];

  @Column({
    name: 'role',
    nullable: false,
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.client,
  })
  @IsEnum(RoleEnum, { message: 'The role provided is not recognized' })
  role: RoleEnum;

  @Column({
    name: 'department',
    type: 'enum',
    enum: DepartmentEnum,
    nullable: true,
  })
  @IsEnum(DepartmentEnum, {
    message: 'The Departement specified is not recognized',
  })
  department: DepartmentEnum;

  @Column({
    name: 'company',
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'The name of the company is a string' })
  @IsAlpha('EN', { message: 'The name of the company must be alphabetic' })
  @MinLength(5, {
    message: 'The name of the company must contain at least 5 characters',
  })
  company: string;
}
