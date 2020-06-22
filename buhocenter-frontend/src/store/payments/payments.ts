import { Module } from 'vuex';
import PaymentsTypes from './methods/payments.methods';
import paymentsRepository from '../../modules/client/payments/repositories/payments.repository';
import { Payment } from '@/modules/client/payments/interfaces/payments.interface';

const payments: Module<any, any> = {
    namespaced: true,
    getters: {},
    mutations: {},
    actions: {
        async [PaymentsTypes.actions.CREATE_ORDER]({ commit }, orderItems): Promise<string | boolean> {
            try {
                const paymentResponse: Payment = await paymentsRepository.createOrder(orderItems);
                return paymentResponse.redirectUrl;
            } catch (e) {
                return false;
            }
        },
    },
};

export default payments;
