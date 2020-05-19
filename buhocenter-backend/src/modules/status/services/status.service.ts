import { Injectable, HttpService,Inject ,forwardRef } from '@nestjs/common'
import { createQueryBuilder, Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Status } from '../entities/status.entity'

@Injectable() 
export class StatusService {
	constructor(
		@InjectRepository(Status)
	    private readonly statusRepository: Repository<Status>
	){}

	async getStatus(id:number): Promise<Status>{ 
		return await this.statusRepository.findOne(id);
	}
}
