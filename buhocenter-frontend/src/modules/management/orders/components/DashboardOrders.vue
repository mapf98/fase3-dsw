<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center">
                <h2>{{ $t('ORDERS') }}</h2>
            </v-col>
        </v-row>
        <v-divider v-if="!showPagination"></v-divider>
        <v-row v-if="!showPagination">
            <v-col>
                <v-alert
                    type="info"
                    elevation="1"
                    class="my-3 mx-12"
                    color="primary"
                    dense
                    transition="slide-x-transition"
                >
                    {{ $t('NO_ADMIN_ORDERS') }}
                </v-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="dataOrders" sort-by="calories" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title class="primary--text">{{ $t('ORDERS') }}</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" persistent>
                                <v-card class="pa-3">
                                    <div class="d-flex justify-end">
                                        <v-btn @click="dialog = !dialog" color="error" icon>
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-card class="my-5 mx-12 pa-3" outlined>
                                        <v-row class="align-center">
                                            <v-col class="d-flex align-center">
                                                <p class="ma-0">
                                                    {{ $t('ORDER_TITLE') }} {{ itemTransaction }}
                                                </p>
                                                <v-chip color="primary" class="mx-3">{{ statusName }}</v-chip>
                                                <v-divider vertical class="mx-3"></v-divider>
                                                <div class="d-flex justify-center align-center mx-3">
                                                    <div class="ma-0">
                                                        <v-img
                                                            src="../../../../assets/logoRoute.png"
                                                            height="50"
                                                            width="50"
                                                            contain
                                                        ></v-img>
                                                    </div>
                                                    <a :href="trackingUrl" class="ma-0 mx-3"
                                                        >Track package in ShipThis</a
                                                    >
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                        <v-row>
                                            <v-col class="d-flex">
                                                <p class="my-0 mx-1 title primary--text">
                                                    {{ $t('ORDER_DETAIL') }}
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-row class="d-flex align-center">
                                            <v-col>
                                                <p class="my-0 mx-1">
                                                    <b>{{ $t('ORDER_CREATE') }}</b>
                                                    {{ createdAt }}
                                                </p>
                                                <p class="my-0 mx-1" v-if="getUserStatus()">
                                                    <b>{{ $t('ORDER_NAME') }}</b>
                                                    {{ userName }}
                                                    {{ userLastName }}
                                                </p>
                                                <p class="my-0 mx-1" v-if="getUserStatus()">
                                                    <b>{{ $t('ORDER_EMAIL') }}</b>
                                                    {{ userEmail }}
                                                </p>
                                                <p class="my-0 mx-1" v-if="getUserStatus()">
                                                    <b>{{ $t('ORDER_ADDRESS') }}</b>
                                                    {{ firstStreet }}
                                                    {{ secondStreet }} {{ city }}
                                                    {{ state }}
                                                    {{ zipcode }}
                                                </p>
                                            </v-col>
                                            <v-col cols="5">
                                                <p class="my-0 mx-1">
                                                    <b>{{ $t('ORDER_TOTAL') }}</b> ${{ total }}
                                                </p>
                                                <p class="my-0 mx-1">
                                                    <b>{{ $t('ORDER_TOTAL_CC') }}</b>
                                                    {{ totalCryptocurrency }}
                                                </p>
                                                <p class="my-0 mx-1">
                                                    <b>{{ $t('ORDER_SERVICE_FEE') }}</b> ${{ serviceFee }}
                                                </p>
                                                <p class="my-0 mx-1">
                                                    <b>{{ $t('ORDER_PROCESSOR_FEE') }}</b> ${{ processorFee }}
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="d-flex">
                                                <p class="my-0 mx-1 title primary--text">
                                                    {{ $t('ORDER_PRODUCTS') }} ({{ totalProducts }})
                                                </p>
                                            </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                        <v-row>
                                            <v-col>
                                                <v-card
                                                    class="my-1 pa-3"
                                                    v-for="product in products"
                                                    :key="product.id"
                                                    outlined
                                                >
                                                    <p class="ma-0">
                                                        <b>{{ $t('ORDER_PRODUCT') }}</b>
                                                        {{ product.product.name }}
                                                    </p>
                                                    <p class="ma-0">
                                                        <b>{{ $t('ORDER_BRAND') }}</b>
                                                        {{ product.product.brand.name }}
                                                    </p>
                                                    <p class="ma-0">
                                                        <b>{{ $t('ORDER_PROVIDER') }}</b>
                                                        {{ product.product.provider.name }}
                                                    </p>
                                                    <p class="ma-0">
                                                        <b>{{ $t('ORDER_PRODUCT_PRICE') }}</b> ${{
                                                            product.productPrice
                                                        }}
                                                    </p>
                                                    <p class="ma-0">
                                                        <b>{{ $t('ORDER_PRODUCT_QUANTITY') }}</b>
                                                        {{ product.quantity }}
                                                    </p>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="mr-2" @click="openDetail(item.data)">
                            mdi-layers-search-outline
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { orders } from '@/store/namespaces';
import { Order } from '@/modules/management/orders/interfaces/orders.interface';
import OrdersTypes from '@/store/orders/methods/orders.methods';
import { formatDate } from '@/utils/date-functions';
import { STATUS } from '@/config/constants';

@Component
export default class DashboardOrders extends Vue {
    page: number = 1;
    start: number = 1;
    limit: number = 5;
    desserts: any = [];
    dialog: boolean = false;

    headers: any = [
        {
            text: 'Order',
            align: 'start',
            sortable: false,
            value: 'id',
        },
        { text: 'Coingate', value: 'coingate', sortable: false },
        { text: 'Created at', value: 'date' },
        { text: 'User email', value: 'email', sortable: false },
        { text: 'Cryptocurrency', value: 'crypto' },
        { text: 'Total ($)', value: 'total' },
        { text: 'Total products', value: 'products', sortable: false },
        { text: 'Detail', value: 'actions', sortable: false },
    ];

    itemTransaction: number = 0;
    statusName: string = '';
    trackingUrl: string = '';
    createdAt: string = '';
    userName: string = '';
    userLastName: string = '';
    userEmail: string = '';
    firstStreet: string = '';
    secondStreet: string = '';
    city: string = '';
    state: string = '';
    zipcode: number = 0;
    total: number = 0;
    status: number = 0;
    totalCryptocurrency: string = '';
    serviceFee: number = 0;
    processorFee: number = 0;
    totalProducts: number = 0;
    products: any = [];

    get dataOrders(): any {
        const data: any = this.orders;
        const dataTable: any = [];
        data.forEach((order: any) => {
            dataTable.push({
                id: order.id,
                date: this.setDate(order.createdAt),
                email: order.address.user.status !== STATUS.BLOCKED ? order.address.user.email : 'N/D',
                coingate: order.transaction,
                crypto: `${order.totalCryptocurrency}`,
                total: `$${order.total}`,
                products: order.carts.length,
                data: order,
            });
        });
        return dataTable.reverse();
    }

    openDetail(item: any): void {
        this.dialog = true;
        this.itemTransaction = item.transaction;
        this.statusName = item.statusHistories[item.statusHistories.length - 1].status.name;
        this.trackingUrl = item.trackingUrl;
        this.createdAt = this.setDate(item.createdAt);
        this.userName = item.address.user.name;
        this.userLastName = item.address.user.lastName;
        this.userEmail = item.address.user.email;
        this.firstStreet = item.address.firstStreet;
        this.secondStreet = item.address.secondStreet;
        this.status = item.address.user.status;
        this.city = item.address.city;
        this.state = item.address.state;
        this.zipcode = item.address.zipcode;
        this.total = item.total;
        this.totalCryptocurrency = `${item.totalCryptocurrency} ${item.cryptocurrency.iso}`;
        this.serviceFee = item.commission.serviceFee;
        this.processorFee = item.commission.processorFee;
        this.totalProducts = item.carts.length;
        this.products = item.carts;
    }

    setDate(date: string): string {
        return formatDate(date);
    }

    mounted(): void {
        this.FETCH_ORDERS({ start: this.start, limit: this.QUANTITY });
    }

    @Watch('page')
    async setPagination(page: number): Promise<void> {
        this.start = this.page;
        await this.FETCH_ORDERS({ start: this.start, limit: this.limit });
    }

    get showPagination(): boolean {
        return this.QUANTITY > 0 ? true : false;
    }

    get totalPages(): number {
        if (this.QUANTITY / this.limit > Math.round(this.QUANTITY / this.limit)) {
            return Math.round(this.QUANTITY / this.limit) + 1;
        } else {
            return Math.round(this.QUANTITY / this.limit);
        }
    }

    getUserStatus(): boolean {
        if (this.status !== STATUS.BLOCKED) return true;
        else return false;
    }

    @orders.Action(OrdersTypes.actions.FETCH_ORDERS)
    private FETCH_ORDERS!: (payload: { start: number; limit: number }) => boolean;

    @orders.Getter(OrdersTypes.getters.GET_ORDERS)
    private orders!: Order[];

    @orders.Getter(OrdersTypes.getters.GET_ORDERS_QUANTITY)
    private QUANTITY!: number;
}
</script>
<style lang="scss" scoped>
.no-orders {
    text-align: center;
    color: rgb(133, 133, 133);
    font-size: 25px;
    font-style: unset;
    margin: 100px auto;
}
</style>
