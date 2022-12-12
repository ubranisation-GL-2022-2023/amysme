import {
  IsAlpha,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { TimestampEntity } from 'src/generics/object/timestamp.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supplyoffer } from './supply-offer';

@Entity('raw-material')
export class RawMaterial extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('3', { message: 'the id must be on uuid v.3 form' })
  @IsOptional()
  id?: string;
  @Column({
    name: 'name',
    type: String,
    nullable: false,
  })
  @IsString({ message: 'the name of the raw material must be a string' })
  @IsNotEmpty({ message: 'the name of the raw material must not be empty' })
  @IsAlpha()
  @MinLength(5, {
    message: 'the name of the raw material must be longer than 5 characters',
  })
  name?: string;
  @Column({
    name: 'price',
    type: Number,
    nullable: false,
  })
  @IsNotEmpty({ message: 'the price of the raw material must be specified' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 3 },
    { message: 'the price of the raw material must be a floating number' },
  )
  @IsPositive({ message: 'the price of the raw material is positive' })
  price?: number;
  @Column({
    name: 'quantity',
    type: Number,
    nullable: false,
  })
  @IsNotEmpty({ message: 'the qualtity of the raw material must be specified' })
  @IsInt({ message: 'the quantity of the raw material must be an integer' })
  @IsPositive({ message: 'the quantity of the raw material is positive' })
  quantity?: string;

  @ManyToOne(() => Supplyoffer, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'supply_offer_id', referencedColumnName: 'id' })
  supplyOffer: string;
}
