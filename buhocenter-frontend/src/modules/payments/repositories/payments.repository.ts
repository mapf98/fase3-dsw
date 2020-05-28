import { HttpRepository } from "@/http/http.repository";
import { AxiosResponse } from 'axios';

class PaymentsRepository extends HttpRepository {
    private static readonly RESOURCE = 'payments';

    /**
     * Permite crear una orden iniciando el proceso de checkout con la pasarela de pago
     * @param order objeto que incluye los items de la orden y el cliente que desea adquirir los productos o servicios 
     */
    async createOrder(order): Promise<AxiosResponse['data']> {
        console.log('order payment', order);
        return await this.post(this.createUri([`${PaymentsRepository.RESOURCE}`]), order);
    }
}

export default new PaymentsRepository();