<template>
    <v-container class="mt-5" style="max-width: none !important;">
        <v-container class="mt-5" style="max-width: none !important;">
            <div class="display-1">
                Your Account
            </div>
            <v-row class="mx-auto my-2" fill-width>
                <v-col
                    sm="12"
                    lg="4"
                    class=" align-content-center justify-center pa-0"
                    v-for="item in items"
                    :key="item.title"
                >
                    <v-card color="white" class="mb-5 mx-2 ma-0" :to="item.link" v-if="!item.admin">
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                    v-text="item.title"
                                ></v-card-title>
                                <v-card-subtitle v-text="item.subtitle"></v-card-subtitle>
                            </div>
                            <v-avatar
                                class="ma-3"
                                size="125"
                                tile
                            >
                                <v-img :src="item.src"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                    <v-card color="white" class="mb-5 mx-2 ma-0"  style="cursor:pointer;" v-else-if="getClient.rol.id === rol.ADMIN">
                        <div class="d-flex flex-no-wrap justify-space-between" @click="redirectDashboard()">
                            <div>
                                <v-card-title
                                        v-text="item.title"
                                ></v-card-title>
                                <v-card-subtitle v-text="item.subtitle"></v-card-subtitle>
                            </div>
                            <v-avatar
                                    class="ma-3"
                                    size="125"
                                    tile
                            >
                                <v-img :src="item.src"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {authModule} from "@/store/namespaces";
import AuthMethods from "@/store/auth-module/methods/auth-methods";
import {ROL} from '@/config/constants';

@Component
export default class Profile extends Vue {

    items = [
        {
            src: require('../assets/orders.png'),
            title: "Your Orders",
            subtitle: "Track, return or buy things again",
            admin: false,
            link: "#",
        },
        {
            src: require('../assets/login.png'),
            title: "Your Profile",
            subtitle: "Edit login, name, language",
            admin: false,
            link: "/your-account",
        },
        {
            src: require('../assets/address.png'),
            title: "Your Addresses",
            subtitle: "Edit your addresses",
            link: "/address-management",
        },
        {
            src: require('../assets/invoice.jpg'),
            title: "Your Invoices",
            subtitle: "Get all your invoices",
            admin: false,
        },
        {
            src: require('../assets/platform.png'),
            title: "Platform administrate",
            subtitle: "Management all products, service and the platform",
            admin: true,
            link: "#",
        },
    ]
    rol = ROL;



    redirectDashboard(){
        this.$router.push('/dashboard');
    }

    @authModule.Getter(AuthMethods.getters.GET_CLIENT_DATA) getClient;
}
</script>