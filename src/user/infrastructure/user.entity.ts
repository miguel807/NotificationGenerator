import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface } from "../domain/user.entity";

@Entity()
export class User implements UserInterface{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;

    @Column()
    role:string;
}
