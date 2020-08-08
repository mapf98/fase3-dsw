import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { LanguagesService } from './services/languages.service';
import { LanguagesController } from './controllers/languages.controller';
import { LanguageRepository } from './repositories/language.repository';
import { AuthModule } from '../auth/auth.module';
import { entities } from './entities/index';
import { NotificationsModule } from '../notifications/notifications.module';
import { UserSubscriber } from './services/user-subscriber.service' 
import { EncriptionsModule } from '../encriptions/encriptions.module'

@Module({
    imports: [
    	TypeOrmModule.forFeature(entities), 
    	HttpModule, 
    	AuthModule, 
    	NotificationsModule, 
        EncriptionsModule    	
    ],
    controllers: [
    	UsersController, 
    	LanguagesController
    ],
    providers: [
        UsersService, 
        LanguagesService, 
        LanguageRepository,
        UserSubscriber
    ],
    exports: [UsersService],
})
export class UsersModule {}
