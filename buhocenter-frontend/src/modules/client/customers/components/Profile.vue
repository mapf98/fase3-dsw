<template>
    <v-container fluid class="mt-5" style="max-width: none !important;">
        <v-img src="../../../../assets/images/account.jpg" height="125" class="grey darken-4"></v-img>
        <v-container class="mt-5" style="max-width: none !important;">
            <div class="title-2 mb-8">
                {{ $t('MY_ACCOUNT') }}
                <div class="line"></div>
            </div>
            <v-row class="mx-auto my-2" fill-width>
                <v-col
                    class="d-flex align-content-center justify-center pa-0 flex-wrap"
                    v-if="getClient.role.id !== rol.ADMIN"
                >
                    <span v-for="item in items" :key="item.title">
                        <v-card
                            v-if="!item.admin"
                            color="white"
                            class="mb-5 mx-2 ma-0"
                            :to="item.link"
                            width="200"
                        >
                            <div class="container" style="height: 320px;">
                                <v-card-title class="row d-flex justify-center">
                                    <v-avatar class="ma-3" size="80" tile>
                                        <v-img :src="item.src"></v-img>
                                    </v-avatar>
                                </v-card-title>
                                <v-card-title class="row d-flex justify-center text-center">
                                    {{ $t(item.title) }}
                                </v-card-title>
                                <v-card-subtitle class="row d-flex justify-center text-center">{{
                                    $t(item.subtitle)
                                }}</v-card-subtitle>
                            </div>
                        </v-card>
                    </span>
                </v-col>
                <v-col
                    class="d-flex align-content-center justify-center pa-0 flex-wrap"
                    v-if="getClient.role.id === rol.ADMIN"
                >
                    <span v-for="item in items" :key="item.title">
                        <v-card
                            color="white"
                            class="mb-5 mx-2 ma-0"
                            style="cursor: pointer;"
                            width="200"
                            v-if="getClient.role.id === rol.ADMIN"
                        >
                            <div class="container" @click="redirect(item.link)" style="height: 320px;">
                                <v-card-title class="row d-flex justify-center">
                                    <v-avatar class="ma-3" size="80" tile>
                                        <v-img :src="item.src"></v-img>
                                    </v-avatar>
                                </v-card-title>
                                <v-card-title
                                    class="row d-flex justify-center text-center mb-2"
                                    style="width: auto; word-break: break-word;"
                                    >{{ $t(item.title) }}</v-card-title
                                >
                                <v-card-subtitle class="row d-flex justify-center text-center">{{
                                    $t(item.subtitle)
                                }}</v-card-subtitle>
                            </div>
                        </v-card>
                    </span>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="modal" scrollable max-width="450px">
            <v-card class="pa-4" height="max-content">
                <v-img class="ma-auto mt-6 mb-6" src="../../../../assets/petromiles.png" width="50" />
                <div class="petromiles-container">
                    <div class="title-2">{{ $t('TYPE_PETROMILES_ACCOUNT') }}!</div>
                    <input
                        class="input-petromiles input-petromiles__account"
                        :placeholder="$t('YOUR_PETROMILES_ACCOUNT') + '...'"
                        type="email"
                    />
                    <button class="button-petromiles button-petromiles__big mt-6 mb-6">
                        {{ $t('CONTINUE') }}
                    </button>
                    <div class="title-2">{{ $t('PETROMILES_VERIFICATION_CODE') }}</div>
                    <div class="code-container mt-6 mb-6">
                        <input
                            class="input-petromiles input-petromiles__code"
                            :placeholder="$t('TYPE_CODE')"
                            type="number"
                        />
                        <button class="button-petromiles button-petromiles__small">{{ $t('READY') }}!</button>
                    </div>
                    <p class="mt-6">{{ $t('NO_PETROMILES_ACCOUNT') }}</p>
                    <a
                        href="https://petromiles-frontend.herokuapp.com/sign-up"
                        target="_blank"
                        class="link-petromiles"
                        >{{ $t('CREATE_PETROMILES_ACCOUNT') }}!</a
                    >
                </div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { authModule } from '@/store/namespaces';
import AuthMethods from '@/store/auth/methods/auth.methods';
import { ROL } from '@/config/constants';
import { CustomerInterface } from '@/modules/client/auth/interfaces/customer.interface';

@Component
export default class Profile extends Vue {
    modal: boolean = false;
    items = [
        {
            src: require('../../../../assets/orders.png'),
            title: 'MY_ORDERS',
            subtitle: 'YOUR_ORDERS_INFO',
            admin: false,
            link: '/your-orders',
        },
        {
            src: require('../../../../assets/login.png'),
            title: 'MY_PROFILE',
            subtitle: 'YOUR_PROFILE_INFO',
            admin: false,
            link: '/your-account',
        },
        {
            src: require('../../../../assets/address.png'),
            title: 'MY_ADDRESSES',
            subtitle: 'YOUR_ADDRESSES_INFO',
            admin: false,
            link: '/address-management',
        },
        {
            src: require('../../../../assets/petromiles.png'),
            title: 'Petromiles',
            subtitle: 'PARTNER_PETROMILES',
            admin: false,
            link: '/petromiles',
        },
        {
            src: require('../../../../assets/platform.png'),
            title: 'PLATFORM_ADMINISTRATE',
            subtitle: 'PLATFORM_ADMINISTRATE_INFO',
            admin: true,
            link: '/dashboard',
        },
    ];
    rol = ROL;

    redirect(link: any): void {
        if (link === '/petromiles') this.modal = true;
        else this.$router.push(link);
    }

    @authModule.Getter(AuthMethods.getters.GET_CLIENT_DATA)
    getClient!: CustomerInterface;
}
</script>

<style scoped lang="scss">
.input-petromiles {
    border: 2px solid #113a6e;
    height: 50px;
    outline: none;
    border-radius: 3px;
    transition: all 0.3s;
    padding: 10px;
    // box-shadow: 0 0 1.5px #907f46;
    &:focus {
        border: 2px solid #fcb522;
    }
    &__account {
        margin: 10px auto;
        align-self: center;
        width: 70%;
    }
    &__code {
        width: 40%;
    }
}
.code-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20px;
}
.petromiles-container {
    text-align: center;
}
.button-petromiles {
    border: 2px solid #fcb522;
    background-color: #fcb522;
    border-radius: 10px;
    color: #113a6e;
    height: 50px;
    outline: none;
    transition: all 0.3s;
    &:hover {
        border: 2px solid #e49800;
        background-color: #e49800;
    }

    &__big {
        margin: 10px auto;
        width: 50%;
    }

    &__small {
        width: 40%;
    }
}
.link-petromiles {
    color: #113a6e;
}
@media only screen and (max-width: 400px) {
    .code-container {
        display: column;
        padding: 0;
    }
    .button-petromiles {
        width: 100%;
    }
    .input-petromiles__account {
        width: 100%;
    }
    .input-petromiles__code {
        width: 70%;
        margin: 10px auto 15px auto;
    }
}
</style>
