import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { TimestampEntity } from 'src/generics/object/timestamp.entity';

@Entity('House')
export class HouseDataEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsString({ message: 'House id must be a string' })
  @IsUUID('3', { message: 'house id is a uuid v3' })
  @IsOptional()
  id?: string;
  @Column({
    name: 'numberOfRooms',
    nullable: false,
    type: Number,
  })
  @IsNumber({ allowNaN: false })
  @IsPositive({
    message: 'a positive number is required for the number of rooms',
  })
  @IsNotEmpty({ message: 'The number of rooms option is required' })
  numberOfRooms?: number;
  @Column({
    name: 'Suface',
    nullable: false,
    type: Number,
  })
  @IsNumber({ allowNaN: false })
  @IsPositive({
    message: 'a positive number is required for the surface',
  })
  @IsNotEmpty({ message: 'The surface option is required' })
  surface?: number;
  @Column({
    name: 'hasGarage',
    nullable: false,
    type: Boolean,
  })
  @IsBoolean({
    message: 'a boolean value is required for the has garage option',
  })
  @IsNotEmpty({ message: 'The has garage option is required' })
  hasGarage: boolean;
  @Column({
    name: 'housePlan',
    type: String,
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'the house plan must be a path to a file' })
  housePlan: string;
}
