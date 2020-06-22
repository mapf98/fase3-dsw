import { HttpRepository } from '@/http/http.repository';
import { AxiosResponse } from 'axios';
import { Payment } from '../interfaces/payments.interface';

class PaymentsRepository extends HttpRepository {
    private static readonly RESOURCE = 'payments';

    /**
     * Permite crear una orden iniciando el proceso de checkout con la pasarela de pago
     * @param order objeto que incluye los items de la orden y el client que desea adquirir los products o services
     */
    async createOrder(order): Promise<Payment> {
        return await this.post(this.createUri([`${PaymentsRepository.RESOURCE}`]), order);
    }
}

export default new PaymentsRepository();
