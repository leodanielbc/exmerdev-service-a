import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('User')
@Controller('api/auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post()
    @ApiResponse({ status: 201, description: 'User created' })
    @ApiResponse({ status: 404, description: 'Error al registrar el usuario' })
    @ApiOperation({ summary: 'Este metodo almacena las credenciales del usuario y se comunica con el Servicio B' })
    async createUser(@Res() res, @Body() data: UserDto) {
        try {
            const dataUser = await this.authService.createUser(data);
            if (dataUser?._id) {
                const result = {
                    statusCode: HttpStatus.CREATED,
                    data: dataUser
                }
                return res.status(result.statusCode).json(result);
            } else {
                return res.status(dataUser.statusCode).json(dataUser);
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error});
        }
    }
}
