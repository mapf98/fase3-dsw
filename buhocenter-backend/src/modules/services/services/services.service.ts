import { Injectable, Inject } from '@nestjs/common';
import { Service } from '../entities/service.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRating } from '../entities/service-rating.entity';
import { STATUS } from '../../../config/constants';


@Injectable()
export class ServicesService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Service)
        private readonly servicesRepository: Repository<Service>,
        @InjectRepository(ServiceRating)
        private readonly serviceRatingsRepository: Repository<ServiceRating>,
    ) {}

    /**
     * Obtiene las valoraciones emitidas sobre un arreglo de servicios
     * @param services arreglo de servicios de los cuales se obtendrán las valoraciones
     * @returns Promise<void>
     */
    private async getServiceAverageRating(services: Service[]): Promise<void> {
        this.logger.debug(`getServiceAverageRating: obtiene el promedio de ratings de los servicios`,
            { context: ServicesService.name });

        for await (const service of services) {
            service.serviceRatings = await this.serviceRatingsRepository.query(`
                SELECT ROUND(AVG(CS.calificacion)) as rating, COUNT(*) as total
                FROM calificacion_servicio CS
                WHERE CS.servicio_id = ${service.id}
            `.trim())

            this.logger.debug(`getServiceAverageRating [id=${service.id}|serviceRatings=${
                JSON.stringify(service.serviceRatings)}]`, { context: ServicesService.name });
        }
    }

    /**
     * Obtiene el servicio y todos sus componentes dado su id
     * @param id id del servicio
     * @returns Promise<Service>
     */
    public async getServiceById(id: number): Promise<Service> {
        this.logger.debug(`getServiceById: obteniendo el servicio por id [id=${id}]`, { context: ServicesService.name });

        const service: Service = await this.servicesRepository.findOne({
            where: { id },
            relations: [
                'photos',
                'questions',
                'offers',
                'offers.offer',
                'offers.offer.status',
                'serviceProvider',
                'serviceProvider.provider',
            ],
        });

        await this.getServiceAverageRating([service]);

        return service;
    }

  
    async findService( ServiceId: number ): Promise<Service>{
        return await this.servicesRepository.findOne(ServiceId);
    }
}
