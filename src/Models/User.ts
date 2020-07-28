import {

  Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate,

} from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
@Entity()

export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')

    id: string;

    @Column({ unique: true })
    Email: string;

    @Column()

    Password: string;

    @Column({ default: null })

    Username?: string;

    @BeforeUpdate()
    @BeforeInsert()
    async beforeInsert() {
      this.Password = await bcrypt.hash(this.Password, 10);
    }

    public async GenerateToken() {
      return jwt.sign({ id: this.id }, process.env.APP_KEY, { expiresIn: process.env.TOKEN_LIFE });
    }
}
