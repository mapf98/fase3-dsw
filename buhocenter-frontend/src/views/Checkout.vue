<template>
    <v-main>
        <v-snackbar v-model="addressCreated" top :timeout="timeout" color="success">
            {{ $t('SUCCESS_ADDRESS') }}
            <v-btn color="white" text @click="addressCreated = false">{{ $t('CLOSE') }}</v-btn>
        </v-snackbar>
        <v-snackbar v-model="addressCreatedError" top :timeout="timeout" color="error">
            {{ $t('ERROR_CREATE_ADDRESS') }}
            <v-btn color="white" text @click="addressCreatedError = false">{{ $t('CLOSE') }}</v-btn>
        </v-snackbar>

        <v-dialog v-model="dialog" max-width="500px" style="background: #ffffff;">
            <div style="background: #ffffff; padding: 40px 30px;">
                <h1 class="text-center overline">{{ $t('ADD_ADDRESS') }}</h1>
                <v-form ref="form" v-model="isFormValid">
                    <v-row class="mx-auto fill-width">
                        <v-col lg="12" xs="12">
                            <v-text-field
                                :label="$t('FIRST_STREET')"
                                @change="modifyFirstStreet"
                                :rules="[rules.required(), rules.fieldLength(65500)]"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="12" xs="12">
                            <v-text-field
                                :label="$t('SECOND_STREET')"
                                @change="modifySecondStreet"
                                :value="secondStreet"
                                :rules="[rules.fieldMaxLength(65500)]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mx-auto fill-width">
                        <v-col cols="12">
                            <v-text-field
                                :label="$t('CITY')"
                                :value="cityName"
                                :rules="[rules.required(), rules.fieldLength(65500)]"
                                @change="modifyCityName"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mx-auto fill-width">
                        <v-col cols="12">
                            <v-text-field
                                :label="$t('STATE')"
                                :value="state"
                                :rules="[rules.required(), rules.fieldLength(65500)]"
                                @change="modifyState"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mx-auto fill-width">
                        <v-col cols="12">
                            <v-text-field
                                :label="$t('ZIP_CODE')"
                                :value="zipCode"
                                :rules="[rules.fieldMaxLength(65500)]"
                                @change="modifyZipCode"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
                <v-row class="d-flex justify-center my-2" @click="saveChanges()">
                    <v-btn outlined color="primary">{{ $t('SAVE') }}</v-btn>
                </v-row>
            </div>
        </v-dialog>
        <v-container>
            <v-row class="logo-header justify-center d-flex">
                <img src="../assets/Logo-completo.png" class="logo-header__img" />
            </v-row>
            <h1 class="text-center">Checkout</h1>

            <v-stepper v-model="step" style="background: none; box-shadow: none;">
                <v-stepper-header style="background: none; box-shadow: none;">
                    <v-stepper-step :complete="step > 0" step="1">
                        {{ $t('SHIPPING_ADDRESS') }}
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 1" step="2">
                        Puntos y ofertas
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 2" step="3">
                        Pago
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-content step="1">
                    <v-container class="mb-4">
                        <v-row justify="center">
                            <h2>{{ $t('SHIPPING_ADDRESS') }}</h2>
                            <br />
                            <h5 style="width: 100%; text-align: center;">
                                {{ $t('SELECT_SHIPPING_ADDRESS') }}
                            </h5>
                        </v-row>
                        <v-row>
                            <v-row justify="center" v-if="GET_ADDRESSES.length">
                                <v-col
                                    cols="3"
                                    style="cursor: pointer;"
                                    class="fill-height"
                                    v-for="address in GET_ADDRESSES"
                                    :key="address.id"
                                    @click="setDefaultAddress(address.id)"
                                >
                                    <v-card
                                        class="mx-auto"
                                        max-width="344"
                                        height="310"
                                        fill-height
                                        :style="`border: ${
                                            address.setDefault ? '2px solid #907F46' : 'none'
                                        }`"
                                    >
                                        <v-card-text class="font-weight-bold">
                                            <i
                                                class="fas fa-map-marker-alt mb-4 d-flex justify-center"
                                                :style="`font-size: 40px; color: ${
                                                    address.setDefault ? '#907F46' : '#111'
                                                }`"
                                            ></i>
                                            <p class="ma-0 text-center subtitle text--primary">
                                                {{ address.firstStreet }}
                                            </p>
                                            <p
                                                v-if="address.secondStreet !== ''"
                                                class="text-center subtitle text--primary"
                                            >
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
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="3" class="fill-height">
                                    <v-card
                                        class="dashed-card fill-width d-flex align-center"
                                        max-height="310px"
                                        height="310"
                                        fill-width
                                        max-width="344"
                                        @click="createAddress()"
                                    >
                                        <v-card-text class="container">
                                            <v-row class="d-flex justify-center">
                                                <v-icon x-large>
                                                    mdi-plus
                                                </v-icon>
                                            </v-row>
                                            <v-row class="d-flex justify-center">
                                                <p class="overline text--primary">
                                                    {{ $t('ADD_ADDRESS') }}
                                                </p>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row justify="center" v-else>
                                <v-col cols="3" class="mx-auto">
                                    <v-card
                                        class="dashed-card fill-width d-flex align-center"
                                        max-height="310px"
                                        height="310"
                                        fill-width
                                        max-width="344"
                                        @click="createAddress()"
                                    >
                                        <v-card-text class="container">
                                            <v-row class="d-flex justify-center">
                                                <v-icon x-large>
                                                    mdi-plus
                                                </v-icon>
                                            </v-row>
                                            <v-row class="d-flex justify-center">
                                                <p class="overline text--primary">
                                                    {{ $t('ADD_ADDRESS') }}
                                                </p>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-container>
                    <div class="d-flex justify-center">
                        <v-alert type="error" v-if="firstStepError">
                            {{ $t('SELECT_SHIPPING_ADDRESS') }}
                        </v-alert>
                    </div>
                    <div class="d-flex justify-center">
                        <v-btn color="primary" @click="validateFirstStep()">Continue</v-btn>
                        <v-btn text>Cancel</v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <div class="d-flex justify-center">
                        <v-btn color="primary" @click="step = 3">Continue</v-btn>
                        <v-btn text>Cancel</v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper>
        </v-container>
    </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { addresses, authModule } from '@/store/namespaces';
import AddressTypes from '@/store/addresses/methods/address.methods';
import { Address } from '@/modules/client/addresses/interfaces/address.interface';
import AuthTypes from '@/store/auth/methods/auth.methods';
import rules from '@/utils/rules';
import { CustomerInterface } from '@/modules/client/auth/interfaces/customer.interface';
import { STATUS } from '@/config/constants';

@Component
export default class Checkout extends Vue {
    public step?: number = 1;
    public timeout?: number = 2000;
    public firstStepError?: boolean = false;
    public fetchingAddressesError?: boolean = false;
    public defaultAddressError?: boolean = false;
    public dialog?: boolean = false;
    public isFormValid?: boolean = true;
    public addressCreated?: boolean = false;
    public addressCreatedError?: boolean = false;
    public rules = rules;
    public firstStreet?: string = '';
    public secondStreet?: string = '';
    public cityName?: string = '';
    public state?: string = '';
    public zipCode?: string = '';
    $refs!: {
        form;
    };

    createAddress(): void {
        this.dialog = true;
    }

    createDefaultAddressObject(addressId: number): Address {
        const defaultAddress: Address = {
            id: addressId,
            user: {
                id: this.GET_CLIENT_DATA.id!,
            },
        };

        return defaultAddress;
    }

    async setDefaultAddress(addressId: number): Promise<void> {
        const updated: boolean = await this.SET_DEFAULT_ADDRESS(this.createDefaultAddressObject(addressId));

        if (!updated) {
            this.fetchingAddressesError = true;
        } else {
            await this.fetchAddresses();
            this.$router.go(0);
        }
    }

    async fetchAddresses(): Promise<void> {
        const fetched: boolean = await this.FETCH_ADDRESSES(this.GET_CLIENT_DATA.id!);

        if (!fetched) {
            this.defaultAddressError = true;
        }
    }

    modifyFirstStreet(value: string): void {
        this.firstStreet = value;
    }
    modifySecondStreet(value: string): void {
        this.secondStreet = value;
    }
    modifyCityName(value: string): void {
        this.cityName = value;
    }
    modifyState(value: string): void {
        this.state = value;
    }
    modifyZipCode(value: string): void {
        this.zipCode = value;
    }

    createAddressObject(): Address {
        const address: Address = {
            firstStreet: this.firstStreet,
            secondStreet: this.secondStreet,
            cityName: this.cityName,
            state: this.state,
            zipcode: this.zipCode,
            user: {
                id: this.GET_CLIENT_DATA.id!,
            },
            status: {
                id: STATUS.ACTIVE,
            },
        };
        return address;
    }

    async saveChanges(): Promise<void> {
        if (this.$refs.form.validate()) {
            const created: boolean = await this.CREATE_ADDRESS(this.createAddressObject());
            if (!created) {
                this.dialog = false;
                this.addressCreatedError = true;
            } else {
                this.addressCreated = true;
                await this.fetchAddresses();
                setTimeout(() => {
                    this.dialog = false;
                }, 1000);
            }
        }
    }

    validateFirstStep(): void {
        if (this.GET_ADDRESSES.length > 0) {
            this.step = 2;
            this.firstStepError = false;
        } else {
            this.firstStepError = true;
        }
    }

    @authModule.Getter(AuthTypes.getters.GET_CLIENT_DATA)
    private GET_CLIENT_DATA!: CustomerInterface;

    @addresses.Action(AddressTypes.actions.CREATE_ADDRESS)
    private CREATE_ADDRESS!: (address: Address) => boolean;

    @addresses.Action(AddressTypes.actions.SET_DEFAULT_ADDRESS)
    private SET_DEFAULT_ADDRESS!: (defaultAddress: Address) => boolean;

    @addresses.Getter(AddressTypes.getters.GET_ADDRESSES)
    private GET_ADDRESSES!: Address[];

    @addresses.Action(AddressTypes.actions.FETCH_ADDRESSES)
    private FETCH_ADDRESSES!: (customerId: number) => boolean;
}
</script>
