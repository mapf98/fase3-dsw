<template>
  <div>
    <v-navigation-drawer
        app
        fixed
        clipped
        color="#f7f7f7"
        bottom
        dark
        permanent
        mobile-break-point="0"
        ref="navigationDrawer"
        class="pa-2"
        :width="$vuetify.breakpoint.mdAndUp ? '256px' : '120px'"
    >
        <v-container class="overline">
            <p class="font-weight-light caption" style="word-break: break-word;">
                {{ getCategory }} > {{ getCatalogue }}
            </p>
        </v-container>
        <v-container>
            <h3 class="font-weight-bold mb-1">Precio</h3>
            <div class="overline pointer">
                <p class="caption my-1">Hasta $25</p>
                <p class="caption my-1">$25 a $50</p>
                <p class="caption my-1">$50 a $100</p>
                <p class="caption my-1">$100 a $150</p>
                <p class="caption my-1">Más de $150</p>
            </div>
        </v-container>
        <v-container>
            <h3
                :class="{ 'mb-1': true, 'font-weight-bold': $vuetify.breakpoint.mdAndUp, 'font-weight-bold subtitle-2': $vuetify.breakpoint.mdAndDown }"
            >Valoraciones de Clientes</h3>
            <div class="overline pointer" v-for="item in ratings" :key="item">
                <v-row class="mx-auto" align='center'>
                    <p :class="{'pr-2 ma-0': true}">
                        Mayor a
                    </p>
                    <v-rating
                        :value="item"
                        background-color="orange lighten-3"
                        color="orange"
                        :small="$vuetify.breakpoint.mdAndUp"
                        :x-small="$vuetify.breakpoint.mdAndDown"
                        readonly
                        size="30"
                        half-increments
                        dense
                    ></v-rating>
                </v-row>
            </div>
        </v-container>
    </v-navigation-drawer>
    <v-content class="pa-0 ma-0">
        <div class='mt-2' :style="$vuetify.breakpoint.mdAndUp ? 'margin-left: 256px;' : 'margin-left: 120px;'">
            <slot></slot>
        </div>
    </v-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ProductCard from './ProductCard.vue';
import Component from "vue-class-component";
import { layout } from "../../../store/namespaces";
import {
    GET_CATEGORY,
    GET_CATALOGUE,
} from '../../../store/layout/methods/layout.getters';

@Component({
})
export default class Aside extends Vue {
    ratings: number[] = [4, 3, 2, 1];

    valor!: string;

    get getCategory(): string {
        return this.GET_CATEGORY;
    }

    get getCatalogue(): string {
        return this.GET_CATALOGUE;
    }

    @layout.Getter(GET_CATEGORY) private GET_CATEGORY;
    @layout.Getter(GET_CATALOGUE) private GET_CATALOGUE;
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}
</style>
