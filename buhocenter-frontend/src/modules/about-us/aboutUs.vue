<template>
    <div style="background: #f3f3f3;">
        <v-container class="mt-8" >
            <h3 class="text-center">ABOUT US</h3>
            <v-row dense>
                <v-col
                        cols="12"
                        lg="4"
                        md="4"
                        sm="12"
                        xs="12"
                        class="mb-2"
                        style="padding: 30px;"
                >
                    <v-card
                            class="mx-auto"
                            style="padding: 30px;"
                            max-width="344"

                    >
                        <v-card-title class="justify-center">
                            <v-icon style="font-size: 40px;" color="secondary">fab fa-bitcoin</v-icon>
                        </v-card-title>

                        <v-card-title class="justify-center ">
                            Pay with cryptocurrencies
                        </v-card-title>

                        <v-card-subtitle class="justify-center text-center ">
                            pay with the cryptocurrency of your choice thanks to utrust.
                            <br>
                            Product prices in traditional currencies and payment in cryptocurrencies
                        </v-card-subtitle>

                        <v-card-actions class="justify-center">
                            <RouterLink to="/sign-in" style="text-decoration: none;"><v-btn  color="primary">{{$t('SIGN-IN')}}</v-btn></RouterLink>
                        </v-card-actions>


                        <v-expand-transition>
                            <div v-show="show">
                                <v-divider></v-divider>

                                <v-card-text>
                                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
                <v-col
                        cols="12"
                        lg="4"
                        md="4"
                        sm="12"
                        xs="12"
                        class="mb-2"
                        style="padding: 30px;"
                >
                    <v-card
                            class="mx-auto"
                            style="padding: 30px;"
                            max-width="344"

                    >
                        <v-card-title class="justify-center">
                            <v-icon style="font-size: 40px;" color="secondary">fas fa-shopping-cart</v-icon>
                        </v-card-title>

                        <v-card-title class="justify-center ">
                            Big ecommerce
                        </v-card-title>

                        <v-card-subtitle class="justify-center text-center ">
                            Our e-commerce contains multiple categories and catalogs to obtain any type of product.
                            <br>
                            Our services are available to everyone
                        </v-card-subtitle>

                        <v-card-actions class="justify-center">

                            <RouterLink to="/sign-in" style="text-decoration: none;">
                                <v-btn  color="primary">Go shopping</v-btn>
                            </RouterLink>
                        </v-card-actions>


                        <v-expand-transition>
                            <div v-show="show">
                                <v-divider></v-divider>

                                <v-card-text>
                                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
                <v-col
                        cols="12"
                        lg="4"
                        md="4"
                        sm="12"
                        xs="12"
                        class="mb-2"
                        style="padding: 30px;"
                >
                    <v-card
                            class="mx-auto"
                            style="padding: 30px;"
                            max-width="344"

                    >
                        <v-card-title class="justify-center">
                            <v-icon style="font-size: 40px;" color="secondary">fas fa-globe</v-icon>
                        </v-card-title>

                        <v-card-title class="justify-center ">
                            Multi-language site
                        </v-card-title>

                        <v-card-subtitle class="justify-center text-center ">
                            Our site is not only limited to one language.
                            <br>
                            Our goal is to be able to communicate with any client anywhere in the world
                        </v-card-subtitle>

                        <v-card-actions class="justify-center">

                            <v-btn  color="primary">{{$t('SIGN-IN')}}</v-btn>
                        </v-card-actions>


                        <v-expand-transition>
                            <div v-show="show">
                                <v-divider></v-divider>

                                <v-card-text>
                                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";

    @Component
    export default class AboutUs extends Vue {
        show:boolean = true;

    }
</script>
