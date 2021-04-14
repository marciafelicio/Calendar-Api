import { IsEmail, IsNumberString, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail(undefined, {message : "O email deve ter um formato válido."})
    email: string;
    
    @IsNumberString()
    @Length(11, 11, {message : "O telefone deve ter 11 caracteres."})
    phone: string;
}