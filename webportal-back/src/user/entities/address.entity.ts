import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'street',
    type: String,
    nullable: false,
    default: '',
  })
  street: string;

  @Column({
    name: 'city',
    type: String,
    nullable: false,
    default: '',
  })
  city: string;

  @Column({
    name: 'governorate',
    type: String,
    nullable: false,
    default: '',
  })
  governorate: string;

  @Column({
    name: 'country',
    type: String,
    nullable: false,
    default: '',
  })
  country: string;

  @Column({
    name: 'postal_code',
    type: String,
    nullable: false,
    default: '',
  })
  PostalCode: string;
}
