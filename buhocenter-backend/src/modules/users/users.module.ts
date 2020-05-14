import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import {Customer} from './entities/customer.entity';
import {LanguagesService} from './services/languages.service';
import {LanguagesController} from './controllers/languages.controller';
import {Language} from './entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Language])],
  controllers: [UsersController, LanguagesController],
  providers: [UsersService, LanguagesService],

})
export class UsersModule {}
