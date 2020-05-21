import { HttpService , HttpException , HttpStatus,Inject} from '@nestjs/common'
import { map } from 'rxjs/operators';
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

export class AddressHttpRepository  {

    constructor(
        private http: HttpService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
     ) {}

    private static readonly RESOURCE = `${process.env.DIRECTION_VERIFICATION_URL}`;

    private createUri(
        path: string[],
        queryString?: Object | any
    ): string {
    let uri: string = '';

        if (path) {
            uri +=  path.join('/');
        }

        if (queryString) {
            uri += '?';
            const query: string[] = [];

                for (const [key, value] of Object.entries(queryString)) {
                    query.push(`${key}=${value}`);
                }

            uri += query.join('&');
        }

        return uri;
    }

         
    /**
    *  forma el url para la peticion y se envia junto con los detalles de la direccion 
    * @param addressDetail un objeto con la ciudad, calles , codigo zip, 
    * y otros detalles de la direccion, el formato esta en addesssVerificationDto
    * @param serviceKey , es un objeto con el apik_key y a el auth_token para hacer
    * la peticion a smartyStreets.
    * @returns promise<AddressVerificationRO>
    */
    async postAddressUri(addressDetail, serviceKey: any): Promise<any> {          
        let route= this.createUri([`${AddressHttpRepository.RESOURCE}`],
                serviceKey)
        return await this.http.post(route,[addressDetail]).pipe(map(response => response.data)).toPromise();       
    }
}
