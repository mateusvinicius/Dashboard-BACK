import {

  Entity, PrimaryGeneratedColumn, Column, BaseEntity,

} from 'typeorm';

import bcrypt from 'bcryptjs';

@Entity()

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()

    id: number;

    @Column({ unique: true })

    Email: string;

    @Column()

    Password: string;

    @Column()

    Username?: string;

    public async CheckPassword(password:string) {
      return bcrypt.compare(password, this.Password);
    }
}
