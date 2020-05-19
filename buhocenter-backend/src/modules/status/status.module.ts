import { Module ,HttpModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity'
import { StatusService } from './services/status.service'  


@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusService],
  exports: [StatusService]

})
export class StatussModule {}
