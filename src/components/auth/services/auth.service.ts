import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auth } from '../../../drivers/mongoose/interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dtos/user.dto';
import * as mongoose from 'mongoose';
import { RabbitmqService } from './rabbitmq.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_MODEL") private readonly authModel: Model<Auth>,
        private rabbitmqService: RabbitmqService
    ) { }

    async createUser(data: UserDto) {

        try {
            //Encriptar contraseña con BCRYPT
            const BCRYPT_SALT_ROUNDS = 12;
            const hashPassword = await bcrypt.hash(
                data.pass,
                BCRYPT_SALT_ROUNDS,
            );
            data.pass = hashPassword;

            const idAuth = new mongoose.mongo.ObjectId();

            const dataAuth = {
                _id: idAuth,
                email: data.email,
                pass: data.pass
            }

            const sendData = {
                name: data.name,
                lastname: data.lastname,
                phone: data.phone,
                auth: idAuth
            }

            // enviar mensaje
            const resultMessage = await this.rabbitmqService.send('rabbit-mq-producer', sendData);

            if(resultMessage.statusCode === 201) {
                console.log("resultMessage", resultMessage);

                await new this.authModel(dataAuth).save();
                return resultMessage;
            } else {
                return { statusCode: HttpStatus.EXPECTATION_FAILED, message: 'Error while saving data'}
            }
        } catch (error) {
            throw error;
        }
    }
}
