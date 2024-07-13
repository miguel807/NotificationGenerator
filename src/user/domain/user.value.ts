import * as bcrypt from "bcrypt";
import { UserInterface } from "./user.entity";

export class UserValue{
    public username:string;
    public email:string;
    public password:string;
    public role:string;

    constructor(user:UserInterface){
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    public async encodePassword():Promise<void>{
        const salt  = await bcrypt.genSalt();
        const hashpassword = await  bcrypt.hash(this.password,salt)
        this.password = hashpassword;        
    }

}