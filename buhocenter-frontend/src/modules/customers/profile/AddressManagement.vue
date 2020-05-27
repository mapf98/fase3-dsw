<template>
    <v-container>
        <h1>
            Your Addresses
        </h1>
        <v-row>
            <v-col cols="4" class="mx-auto">
                <v-card
                    class="dashed-card d-flex justify-center fill-width"
                    fill-height
                    fill-width
                    max-width="344"
                    @click="createAddress()"
                >
                    <v-card-text class="d-flex justify-center">
                        <p class="title text--primary">
                            Add Address
                        </p>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-icon x-large>
                            mdi-plus
                        </v-icon>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-row v-if="GET_ADDRESSES.length">
                <v-col cols="4"
                    class="fill-height"
                    v-for="address in GET_ADDRESSES"
                    :key="address.id"
                >
                    <v-card
                        class="mx-auto"
                        max-width="344"
                        fill-height
                    >
                        <v-card-text class="font-weight-bold">
                            <p class="ma-0 text-center subtitle text--primary">
                                {{ address.firstStreet }}
                            </p>
                            <p v-if="address.secondStreet !== ''" class="subtitle text--primary">
                                {{ address.secondStreet }}
                            </p>
                            <p class="text-center ma-0 subtitle text--primary">
                                {{ address.city }}
                            </p>
                            <p class="text-center ma-0 subtitle text--primary">
                                {{ address.state }}
                            </p>
                            <p class="text-center ma-0 subtitle text--primary">
                                {{ address.zipcode }}
                            </p>
                            <p v-if="address.setDefault" class="text-center ma-0 caption text--primary">
                                DEFAULT ADDRESS
                            </p>
                        </v-card-text>
                        <v-card-actions class="text-center d-flex justify-center">
                            <v-row class="d-flex justify-center">
                                <v-col v-if="!address.setDefault" lg="6" sm="12" :class="{ 'pa-0': $vuetify.breakpoint.mdAndDown }">
                                    <v-btn @click="setDefaultAddress(address.id)" :x-small="$vuetify.breakpoint.mdAndDown" text>Set as default</v-btn>
                                </v-col>
                                <v-col lg="6" sm="12">
                                    <v-btn @click="deletAddress(address.id)" :x-small="$vuetify.breakpoint.mdAndDown" text>Delete</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-row>
        <v-snackbar v-model="defaultAddressError" top :timeout="timeout" color="error">
            Ocurrió un error modificando la dirección
            <v-btn color="white" text @click="defaultAddressError = false">Cerrar</v-btn>
        </v-snackbar>
        <v-snackbar v-model="fetchingAddressesError" top :timeout="timeout" color="error">
            Ocurrió un error obteniendo las direcciones
            <v-btn color="white" text @click="fetchingAddressesError = false">Cerrar</v-btn>
        </v-snackbar>
        <v-snackbar v-model="deletingAddressError" top :timeout="timeout" color="error">
            Ocurrió un error eliminando las dirección
            <v-btn color="white" text @click="deletingAddressError = false">Cerrar</v-btn>
        </v-snackbar>
        <v-snackbar v-model="addressCreated" top :timeout="timeout" color="success">
            La dirección fue creada con éxito
            <v-btn color="white" text @click="addressCreated = false">Cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { addresses, authModule } from "../../../store/namespaces";
import AuthTypes from '../../../store/auth-module/methods/auth-methods';
import AddressTypes from '@/store/addresses/methods/address-methods';

@Component
export default class AddressManagement extends Vue {
    defaultAddressError: boolean = false;
    fetchingAddressesError: boolean = false;
    deletingAddressError: boolean = false;
    addressCreated: boolean = false;

    async createAddress() {
        
        this.$router.push({ name: 'create-address' });
    }

    createDefaultAddressObject(addressId: number) {
        const defaultAddress = {
            id: addressId,
            customer: {
                id: this.GET_CLIENT_DATA.id,
            }
        }

        return defaultAddress;
    }

    async deletAddress(addressId: number) {
        const deleted: boolean = await this.DELETE_ADDRESS(addressId);

        if (!deleted) {
            this.deletingAddressError = true;
        } else {
            await this.fetchAddresses();
            this.$router.go(0);
        }   
    }

    async setDefaultAddress(addressId: number) {
        const updated: boolean = await this.SET_DEFAULT_ADDRESS(this.createDefaultAddressObject(addressId));

        if (!updated) {
            this.fetchingAddressesError = true;
        } else {
            await this.fetchAddresses();
            this.$router.go(0);
        }
    }

    async fetchAddresses() {
        const fetched: boolean = await this.FETCH_ADDRESSES(this.GET_CLIENT_DATA.id);

        if (!fetched) {
            this.defaultAddressError = true;
        }
    }

    async mounted() {
        await this.fetchAddresses();
    }

    @addresses.Action(AddressTypes.actions.SHOW_CREATE_ADDRESS_DIALOG) private SHOW_CREATE_ADDRESS_DIALOG;
    @addresses.Action(AddressTypes.actions.SET_DEFAULT_ADDRESS) private SET_DEFAULT_ADDRESS;
    @addresses.Action(AddressTypes.actions.DELETE_ADDRESS) private DELETE_ADDRESS;
    @addresses.Action(AddressTypes.actions.FETCH_ADDRESSES) private FETCH_ADDRESSES;
    @addresses.Getter(AddressTypes.getters.GET_ADDRESSES) private GET_ADDRESSES;
    @authModule.Getter(AuthTypes.getters.GET_CLIENT_DATA) private GET_CLIENT_DATA;

}
</script>

<style scoped>
.dashed-card {
    width: 100%;
    height: 100%;
    border: 2px dashed #979797;
    background: #f5f5f5;
    border-radius: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>