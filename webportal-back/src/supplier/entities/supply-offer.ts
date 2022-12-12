import { ArrayMinSize, IsArray, IsOptional, IsUUID } from 'class-validator';
import { StatusEnum } from 'src/generics/enums/status.enum';
import { TimestampEntity } from 'src/generics/object/timestamp.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RawMaterial } from './raw-material';

@Entity('supplyOffer')
export class Supplyoffer extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('3', { message: 'the id must be on uuid v.3 form' })
  @IsOptional()
  id?: string;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.idle,
  })
  @IsOptional()
  status: StatusEnum;

  @OneToMany(
    () => RawMaterial,
    (rawMaterial: RawMaterial) => {
      rawMaterial.id;
    },
  )
  @IsArray({ message: 'An array of raw materials is required' })
  @ArrayMinSize(1, {
    message: 'the array of raw materials must contain at least one',
  })
  rawMaterials: RawMaterial[];

  @Column({
    name: 'comment',
    nullable: true,
    type: String,
  })
  comment: string;
}
