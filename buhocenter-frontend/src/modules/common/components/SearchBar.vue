<template>
    <div class="searchbar">
        <input :class="'input '" :placeholder="$t('SEARCH')" @keyup.enter="searchByName()" v-model="query" />
        <div class="icon" @click="searchByName()">
            <i class="fas fa-search"></i>
        </div>
        <div class="popover" v-show="matches.length > 0">
            <div class="popover__options">
                <ul>
                    <li class="popover__option" v-for="(item, i) in matches" :key="i" @click="itemClicked(i)">
                        {{ getName(item.name) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { products, brands } from '@/store/namespaces';
import ProductsTypes from '@/store/products/methods/products.methods';
import BrandsTypes from '@/store/brands/methods/brands.methods';
import { Product } from '@/modules/client/products/interfaces/products.interface';
import { ProductFilters } from '../../client/products/interfaces/products.interface';
import { BrandInterface } from '@/modules/client/brand/interfaces/brand.interface';
import { getShortName } from '../../../utils/global-functions';

@Component({})
export default class SearchBar extends Vue {
    @Prop() size!: string;
    filter: ProductFilters = new ProductFilters();
    query = '';
    filterBy = 'name';
    errorLoadingContent = false;
    ejemplo;

    get getSize(): string {
        return this.size;
    }

    itemClicked(i: number): void {
        this.filter.name = this.matches[i].name;
        this.searchProducts(this.filter);
    }

    searchByName(): void {
        this.filter.name = this.query;
        if (this.query !== '') this.searchProducts(this.filter);
    }

    async searchProducts(data: ProductFilters): Promise<void> {
        if (this.$router.currentRoute.fullPath !== `/products?name=${this.query}`)
            this.$router.push(`/products?name=${this.query}`);
        this.SET_PRODUCT_PHOTOS_NOT_LOADED(false);

        const fetched: boolean = await this.FETCH_PRODUCTS(data);
        if (!fetched) {
            this.errorLoadingContent = true;
        } else {
            await this.FETCH_PRODUCT_PHOTO_BY_NAME(this.GET_PRODUCTS);
        }
        this.query = '';
    }

    get matches(): any {
        if (this.query === '') return [];
        return this.GET_PRODUCTS.filter((item) =>
            item[this.filterBy].toLowerCase().includes(this.query.toLowerCase()),
        );
    }

    getName(name) {
        return getShortName(name, 30);
    }

    @Watch('$route', { immediate: true, deep: true })
    async onUrlChange(newVal: any) {
        if (this.$router.currentRoute.path !== '/products') await this.FETCH_PRODUCTS({});
    }

    @products.Action(ProductsTypes.actions.FETCH_PRODUCTS) private FETCH_PRODUCTS;
    @products.Getter(ProductsTypes.getters.GET_PRODUCTS) private GET_PRODUCTS!: Product[];

    @products.Action(ProductsTypes.actions.FETCH_PRODUCT_PHOTO_BY_NAME)
    private FETCH_PRODUCT_PHOTO_BY_NAME!: (products: Product[]) => boolean;
    @products.Action(ProductsTypes.actions.SET_PRODUCT_PHOTOS_NOT_LOADED)
    private SET_PRODUCT_PHOTOS_NOT_LOADED!: (loaded: boolean) => boolean;
}
</script>

<style scoped lang="scss">
.searchbar {
    position: relative;
    margin-left: 10px;
}

.popover {
    position: absolute;
    z-index: 2;
    top: 35px;
    left: 0;
    background-color: white;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 5px #987746;
    width: 100%;
    transition: all 0.2s;

    ul {
        padding: 0;
    }

    &__options {
        max-height: 200px;
        overflow-y: scroll;
    }

    &__option {
        //  border-radius: 5px;
        list-style: none;
        font-size: 16px;
        padding: 10px;
        transition: all 0.2s;
        cursor: pointer;
        &:hover {
            background-color: #9877465d;
            color: white;
        }
    }
}

.searchbar .icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 100%;
    background: #907f46;
    border-radius: 0px 3px 3px 0;
    color: #fff;
    cursor: pointer;
    &:hover {
        background: #987746;
    }
}

.searchbar .icon i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
}

.input {
    border: 1px solid #907f46;
    padding: 10px;
    height: 35px;
    outline: none;
    border-radius: 3px;
    margin-right: 0;
    box-shadow: 0 0 5px #907f46;
    width: 250px;
    transition: all 0.2s ease;

    &:focus {
        width: 300px;
    }
}
</style>
