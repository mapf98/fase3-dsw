<template>
    <div class="container-page" style="position: relative">
        <v-row style="min-height: 400px;">
            <v-col cols="3">
                <v-navigation-drawer
                        v-model="drawer"
                        :clipped="$vuetify.breakpoint.lgAndUp"
                        app
                >
                    <v-list dense>
                        <template v-for="item in items">
                            <v-row
                                    v-if="item.heading"
                                    :key="item.heading"
                                    align="center"
                            >
                                <v-col cols="6">
                                    <v-subheader v-if="item.heading">
                                        {{ item.heading }}
                                    </v-subheader>
                                </v-col>
                                <v-col
                                        cols="6"
                                        class="text-center"
                                >
                                    <a
                                            href="#!"
                                            class="body-2 black--text"
                                    >EDIT</a>
                                </v-col>
                            </v-row>
                            <v-list-group
                                    v-else-if="item.children"
                                    :key="item.text"
                                    v-model="item.model"
                                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                                    append-icon=""
                            >
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ item.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item
                                        v-for="(child, i) in item.children"
                                        :key="i"
                                        link
                                        :to="child.url"
                                >
                                    <v-list-item-action v-if="child.icon">
                                        <v-icon style="font-size: 18px;">{{ child.icon }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ child.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                            <v-list-item
                                    v-else
                                    :key="item.text"
                                    link
                                    :to="item.url"
                            >
                                <v-list-item-action>
                                    <v-icon style="font-size: 18px;">{{ item.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title >
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-navigation-drawer>
            </v-col>
            <v-col cols="8">
                <router-view></router-view>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {authModule} from "@/store/namespaces";
    import AuthMethods from "@/store/auth-module/methods/auth-methods";
    import {ROL} from "@/config/constants";
    @Component
    export default class Dashboard extends Vue {
        drawer = null;
        items = [
            { icon: 'mdi-contacts', text: 'Clients', url:'/dashboard/clients' },
            { icon: 'fas fa-boxes', text: 'Orders', url:'/dashboard/orders' },
            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                text: 'Categories',
                model: false,
                children: [
                    { icon: 'mdi-bookshelf', text: 'Categories', url:'/dashboard/categories' },
                    { icon: 'mdi-bookmark-outline', text: 'Catalogue', url:'/dashboard/catalogues' },
                ],
            },
            {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                text: 'Items',
                model: false,
                children: [
                    { icon: 'fas fa-box',text: 'Products', url:'/dashboard/products' },
                    { icon: 'mdi-room-service',text: 'Services', url:'/dashboard/services' },
                ],
            },
            { icon: 'fas fa-percent', text: 'Promotions', url:'/dashboard/promotions' },
            { icon: 'mdi-message', text: 'Emails', url:'/dashboard/emails' },
            { icon: 'fas fa-cogs', text: 'Platform settings', url:'/dashboard/platform' },
        ];

        mounted(){
            if(this.getClient.rol.id !== ROL.ADMIN){
                this.$router.push('/home');
            }
        }

        @authModule.Getter(AuthMethods.getters.GET_CLIENT_DATA) getClient;
    }
</script>
<style>

    .container-page{
        position: relative;
        width: 100%;
        padding: 0;
    }
    .v-image__image--contain {
        background-position-y: 38% !important;
    }

    @media only screen and (max-width: 600px) {
        .v-window__prev, .v-window__next {
            top: calc(40% - 20px) !important;
        }
    }



</style>
