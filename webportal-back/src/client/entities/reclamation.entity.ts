import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { StatusEnum } from 'src/generics/enums/status.enum';
import { TimestampEntity } from 'src/generics/object/timestamp.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reclamation')
export class ReclamationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID('3', { message: 'Id must be a UUID v.3 typed' })
  @IsString({ message: 'The id must a string' })
  id?: string;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @IsOptional()
  user?: User;

  @Column({
    name: 'content',
    nullable: false,
    type: String,
  })
  @IsNotEmpty({ message: 'The reclamation must present a conetent' })
  @IsString({ message: 'The reclamation must be of a string form' })
  @MinLength(10, {
    message: 'The reclamtion must be longer than 10 characters',
  })
  @IsAlphanumeric()
  content?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.idle,
  })
  @IsOptional()
  status?: StatusEnum;
}
