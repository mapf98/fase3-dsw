import {Customer} from './entities/customer.entity';
import {HttpModule, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import {LanguagesService} from './services/languages.service';
import {LanguagesController} from './controllers/languages.controller';
import {LanguageRepository} from './repositories/language.repository';

@Module({

  imports: [TypeOrmModule.forFeature([Customer]), HttpModule],
  controllers: [UsersController, LanguagesController],
  providers: [UsersService, LanguagesService, LanguageRepository],
  exports:[UsersService]

})
export class UsersModule {}
