import { IsEmail, IsNumberString, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    name: string;
    
    @IsNumberString()
    @Length(11, 11, {message : "O telefone deve ter 11 caracteres."})
    phone: string;
}