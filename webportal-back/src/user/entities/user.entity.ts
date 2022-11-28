import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEnum } from '../enums/department.enum';
import { PaymentMethodEnum } from '../enums/paymentmethod.enum';
import { RoleEnum } from '../enums/role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    type: String,
    nullable: false,
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    name: 'password',
    type: String,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'Date_Of_Birth',
    type: Date,
    nullable: true,
  })
  dateOfBirth?: Date;

  @Column({
    name: 'Email',
    type: String,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phone',
    type: String,
    nullable: true,
  })
  phoneNumber: string;

  @Column()
  adress_id: string;

  @Column({
    name: 'Bank_Account',
    type: String,
    nullable: true,
  })
  bankAccount: string;

  @Column({
    name: 'Payment_Methods',
    nullable: true,
    type: 'enum',
    enum: PaymentMethodEnum,
    array: true,
  })
  paymentMethod: PaymentMethodEnum[];

  @Column({
    name: 'role',
    nullable: false,
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.client,
  })
  role: RoleEnum;

  @Column({
    name: 'department',
    type: 'enum',
    enum: DepartmentEnum,
    nullable: true,
  })
  department: DepartmentEnum;

  @Column({
    name: 'company',
    nullable: true,
    type: String,
  })
  company: string;
}
