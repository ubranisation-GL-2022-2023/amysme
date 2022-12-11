import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { TimestampEntity } from 'src/generics/object/timestamp.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HouseDataEntity } from './houseData.entity';

@Entity('customerDemand')
export class CustomerDemandEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @OneToOne((type) => HouseDataEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'house_id', referencedColumnName: 'id' })
  house: HouseDataEntity;

  @Column({
    nullable: false,
    type: Number,
    name: 'budget',
  })
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 3, allowInfinity: false })
  @IsPositive({ message: 'the budget is a positive number' })
  @IsNotEmpty({ message: 'the budget is required' })
  budget: number;
}
