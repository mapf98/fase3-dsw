<template>
    <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
    >
        <v-list-item class="px-2" v-if="!mini">
            <v-list-item-title class="overline ml-3" v-if="getCategory !== '' && getCategory !== ''">
                <RouterLink :to="`/catalogues?category_id=${getCategoryId}`"> {{ getCategory }} </RouterLink>> {{ getCatalogue }}
            </v-list-item-title >
            <!--<v-btn
                    icon
                    @click.stop="mini = !mini"
            >
                <v-icon >mdi-chevron-left</v-icon>
            </v-btn>-->

        </v-list-item>
        <!--<v-list-item class="px-2" v-else>
            <v-btn
                    icon
                    @click.stop="mini = !mini"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>

        </v-list-item>-->

        <v-divider></v-divider>
        <v-list dense>
            <v-list-item class="mb-4">
                <v-list-item-icon style="margin-right: 10px">
                    <v-icon class="iconos-aside mr-2" v-if="mini" style="color:#907F46;font-weight: bold;">fas fa-dollar-sign</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="title-aside mb-4" style="color:#907F46;font-weight: bold;">
                        <v-icon class="iconos-aside-litle mr-2" style="color:#907F46;font-weight: bold;">fas fa-dollar-sign</v-icon>
                        Precio
                    </v-list-item-title>
                    <p class="body-2 my-1 text-price">Hasta <b style="color:#907F46">$25</b></p>
                    <p class="body-2 my-1 text-price"><b style="color:#907F46">$25</b> a <b style="color:#907F46">$50</b></p>
                    <p class="body-2 my-1 text-price"><b style="color:#907F46">$50</b> a <b style="color:#907F46">$100</b></p>
                    <p class="body-2 my-1 text-price"><b style="color:#907F46">$100</b> a <b style="color:#907F46">$150</b></p>
                    <p class="body-2 my-1 text-price">Más de <b style="color:#907F46">$150</b></p>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-icon style="margin-right: 10px">
                    <v-icon class="iconos-aside mr-2" v-if="mini" style="color:#907F46;font-weight: bold;">fas fa-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="title-aside mb-4" style="color:#907F46;font-weight: bold;">
                        <v-list-item-title class="title-aside" style="color:#907F46;font-weight: bold;">
                            <v-icon class="iconos-aside-litle mr-2" style="color:#907F46;font-weight: bold;">fas fa-star</v-icon>
                            Rating
                        </v-list-item-title>
                    </v-list-item-title>
                    <v-row style="padding: 0px 10px">
                        <v-col cols="12" style="padding: 0px">
                            <v-rating
                                size="15"
                                :value="1"
                                background-color="lighten-3"
                                color="primary"
                            ></v-rating>
                        </v-col>
                    </v-row>
                    <v-row style="padding: 0px 10px">
                        <v-col cols="12" style="padding: 0px">
                            <v-rating
                                    size="15"
                                    :value="2"
                                    background-color="lighten-3"
                                    color="primary"
                            ></v-rating>
                        </v-col>
                    </v-row>
                    <v-row style="padding: 0px 10px">
                        <v-col cols="12" style="padding: 0px">
                            <v-rating
                                    size="15"
                                    :value="3"
                                    background-color="lighten-3"
                                    color="primary"
                            ></v-rating>
                        </v-col>
                    </v-row>
                    <v-row style="padding: 0px 10px">
                        <v-col cols="12" style="padding: 0px">
                            <v-rating
                                    size="15"
                                    :value="4"
                                    background-color="lighten-3"
                                    color="primary"
                            ></v-rating>
                        </v-col>
                    </v-row>
                    <v-row style="padding: 0px 10px">
                        <v-col cols="12" style="padding: 0px">
                            <v-rating
                                    size="15"
                                    :value="5"
                                    background-color="lighten-3"
                                    color="primary"
                            ></v-rating>
                        </v-col>
                    </v-row>

                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import { layout } from "../../../store/namespaces";
import {
    GET_CATEGORY,
    GET_CATALOGUE,
    GET_CATEGORY_ID,
} from '../../../store/layout/methods/layout.getters';

@Component({
})
export default class Aside extends Vue {
    ratings: number[] = [4, 3, 2, 1];
    valor!: string;
    drawer:boolean = true;
    items = [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
    ]
    mini:boolean = false;

    get getCategory(): string {
        return this.GET_CATEGORY;
    }

    get getCategoryId(): number {
        return  this.GET_CATEGORY_ID;
    }

    get getCatalogue(): string {
        return this.GET_CATALOGUE;
    }

    @layout.Getter(GET_CATEGORY) private GET_CATEGORY;
    @layout.Getter(GET_CATEGORY_ID) private GET_CATEGORY_ID;
    @layout.Getter(GET_CATALOGUE) private GET_CATALOGUE;
}
</script>

<style scoped>
    .iconos-aside{
        font-size: 20px!important;
    }
    .iconos-aside-litle{
        font-size: 12px !important;
    }

    .title-aside{
        font-size: 18px !important;
    }

    .text-price{
        cursor: pointer !important;
    }

    .text-price:hover, .text-price:hover b{
        color: #F1CABB !important;
    }
</style>
