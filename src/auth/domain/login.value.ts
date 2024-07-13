import * as bcrypt from "bcrypt";
import { LoginInterface } from "./login.entity";


export class LoginValue{
    public email:string;
    public password:string;

    constructor({email,password}:LoginInterface){
        this.email = email;
        this.password = password;
    }

    public async comparePassword(password:string,hash:string):Promise<boolean>{
        return await bcrypt.compare(password,hash)
    }

}