import { HttpRepository } from "@/http/http.repository";
import * as CART_INTERFACE from "../interfaces/carts.interface";

class CartsHttpRepository extends HttpRepository {
    private static readonly RESOURCE = 'carts';

    /**
     * Permite agregar el producto al carrito del cliente que está actualmente en línea
     * @param data objeto que contiene todos los datos necesarios para agregar el producto al carrito
     */
    addProductToCart(data: CART_INTERFACE.ProductCart) {
        return this.post(this.createUri([`${CartsHttpRepository.RESOURCE}`, 'products']), data);
    }

    /**
     * Permite agregar el servicio al carrito del cliente que está actualmente en línea
     * @param data objeto que contiene todos los datos necesarios para agregar el producto al carrito
     */
    addServiceToCart(data: CART_INTERFACE.ServiceCart) {
        return this.post(this.createUri([`${CartsHttpRepository.RESOURCE}`, 'services']), data);
    }
}

export default new CartsHttpRepository();