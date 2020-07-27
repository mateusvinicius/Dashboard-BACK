import {

  Entity, PrimaryGeneratedColumn, Column, BaseEntity,

} from 'typeorm';

@Entity()

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()

    id: number;

    @Column({ unique: true })

    Email: string;

    @Column()

    Password: string;

    @Column()

    Username: string;
}
