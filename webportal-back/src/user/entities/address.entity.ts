import {
  IsAlpha,
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4', { message: 'User Identifier must be of the form uuid v.4' })
  @IsOptional()
  id: string;

  @Column({
    name: 'street',
    type: String,
    nullable: false,
    default: '',
  })
  @IsString({ message: 'The name of the street must be a string' })
  @IsNotEmpty({ message: 'The name of the street must be provided' })
  @IsAlphanumeric('EN', {
    message: 'The name of the street must be alphanumeric',
  })
  @MinLength(5, {
    message: 'The name of the street must contain at least 5 characters',
  })
  street: string;

  @Column({
    name: 'city',
    type: String,
    nullable: false,
    default: '',
  })
  @IsString({ message: 'The name of the city must be a string' })
  @IsNotEmpty({ message: 'The name of the city must be provided' })
  @IsAlpha('EN', {
    message: 'The name of the city must be alphabetic',
  })
  @MinLength(5, {
    message: 'The name of the city must contain at least 5 characters',
  })
  city: string;

  @Column({
    name: 'governorate',
    type: String,
    nullable: false,
    default: '',
  })
  @IsString({ message: 'The name of the governorate must be a string' })
  @IsNotEmpty({ message: 'The name of the governorate must be provided' })
  @IsAlpha('EN', {
    message: 'The name of the governorate must be alphabetic',
  })
  @MinLength(5, {
    message: 'The name of the governorate must contain at least 5 characters',
  })
  governorate: string;

  @Column({
    name: 'country',
    type: String,
    nullable: false,
    default: '',
  })
  @IsString({ message: 'The name of the country must be a string' })
  @IsNotEmpty({ message: 'The name of the country must be provided' })
  @IsAlpha('EN', {
    message: 'The name of the ccountry must be alphabetic',
  })
  @MinLength(5, {
    message: 'The name of the country must contain at least 5 characters',
  })
  country: string;

  @Column({
    name: 'postal_code',
    type: String,
    nullable: false,
    default: '',
  })
  @IsString({ message: 'The Postal code must be a string' })
  @IsNotEmpty({ message: 'The postal code must be provided' })
  @IsPostalCode('any', { message: 'Invalid Postal Code' })
  PostalCode: string;
}
