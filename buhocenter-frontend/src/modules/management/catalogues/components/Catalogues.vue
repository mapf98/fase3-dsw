<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center">
                <h2>{{ $t('CATALOGUES') }}</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-select
                            style="width: 50%;"
                            justify="center"
                            v-model="currentCategory"
                            append-icon="mdi-chevron-down"
                            label="Select a category"
                            :placeholder="allCategories[0].name"
                            single-line
                            hide-details
                            :items="allCategories"
                            item-text="name"
                            item-value="id"
                            item-color="primary"
                        ></v-select>
                        <v-spacer></v-spacer>
                    </v-card-title>
                </v-card>
                <div style="margin-top: 30px;">
                    <div
                        v-for="catalogue in allCategories[currentCategory - 1].catalogues"
                        :key="catalogue.id"
                    >
                        <v-card class="primary--text" style="padding: 10px; margin: 10px;">
                            <v-row class="d-flex align-start justify-center my-n6">
                                <v-col class="align-start">
                                    <p>Name</p>
                                    <p class="black--text mt-n2">{{ catalogue.name }}</p>
                                </v-col>
                                <v-col>
                                    <p>Description</p>
                                    <p class="black--text mt-n2">
                                        {{ catalogue.description }}
                                    </p>
                                </v-col>
                                <v-col>
                                    <p>Term</p>
                                    <p class="black--text mt-n2">
                                        {{ catalogue.term }}
                                    </p>
                                </v-col>
                                <v-col>
                                    <p>Delete</p>
                                    <p class="black--text mt-n2">
                                        <v-btn small outlined color="primary" class="primary--text overline">
                                            <v-icon small class="mr-2"> mdi-delete-outline</v-icon>
                                            Delete
                                        </v-btn>
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                        <!--<v-expansion-panel-content>
                                <div class="d-flex justify-end">
                                    por si se hara modificar
                                </div>
                            </v-expansion-panel-content>-->
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { catalogueModule, categoryModule } from '@/store/namespaces';
import CatalogueMethods from '@/store/catalogue/methods/catalogue.methods';
import CategoriesMethods from '@/store/categories/methods/categories.methods';
import { Catalogues as CataloguesInterface } from '@/modules/client/catalogues/interfaces/catalogues.interface';
import { Catalogue } from '@/modules/client/catalogues/interfaces/catalogues.interface';
import { Category } from '@/modules/client/categories/interfaces/categories.interface';

@Component
export default class DashboardCatalogues extends Vue {
    currentCategory = 1;

    get getCatalogues(): any {
        return this.allCategories[this.currentCategory].catalogues;
    }

    async mounted() {
        await this.FETCH_CATEGORIES();
    }

    get allCategories(): Category[] {
        let categories: Category[] = this.GET_CATEGORIES!;
        return categories;
    }

    @categoryModule.Getter(CategoriesMethods.getters.GET_CATEGORIES)
    private GET_CATEGORIES?: Category[];
    @categoryModule.Action(CategoriesMethods.actions.FETCH_CATEGORIES)
    private FETCH_CATEGORIES!: () => boolean;

    @catalogueModule.Action(CatalogueMethods.actions.DELETE_CATALOGUE)
    private DELETE_CATALOGUE!: () => boolean;
}
</script>
<style>
.container-page {
    position: relative;
    width: 100%;
    padding: 0;
}
.v-image__image--contain {
    background-position-y: 38% !important;
}

@media only screen and (max-width: 600px) {
    .v-window__prev,
    .v-window__next {
        top: calc(40% - 20px) !important;
    }
}
</style>
