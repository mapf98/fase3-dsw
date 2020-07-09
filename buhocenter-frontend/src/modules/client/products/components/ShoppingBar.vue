<template>
    <v-container class="ma-0">
        <v-container style="margin-top: 60px;">
            <v-form ref="form" class="d-flex justify-center">
                <v-select
                    v-model="quantity"
                    :rules="[rules.required()]"
                    :items="stock"
                    :x-small="$vuetify.breakpoint.mdAndDown"
                    :label="$t('QUANTITY')"
                    primary
                    dense
                    outlined
                ></v-select>
            </v-form>
        </v-container>
        <v-container v-if="isProduct()" class="overline d-flex justify-center">
            <v-btn
                @click="addToCart()"
                block
                outlined
                color="primary"
                :x-small="$vuetify.breakpoint.mdAndDown"
            >
                <v-icon left class="d-flex align-center">mdi-cart-outline</v-icon>
                <p class="ma-0 d-none d-lg-block">{{ $t('ADD_TO_CART') }}</p>
            </v-btn>
        </v-container>
        <v-divider></v-divider>
        <v-container class="overline mt-3 justify-center">
            <v-icon small color="black"> mdi-map-marker-outline </v-icon>
            {{ $t('DELIVER_TO') }}: Caracas, Venezuela
        </v-container>
        <v-divider></v-divider>
        <SocialIcons />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Emit, Component, Prop } from 'vue-property-decorator';
import { authModule } from '../../../../store/namespaces';
import AuthTypes from '../../../../store/auth/methods/auth.methods';
import SocialIcons from '@/modules/client/social/components/SocialIcons.vue';
import rules from '../../../../utils/rules';
import { CustomerInterface } from '@/modules/client/auth/interfaces/customer.interface';
import { Product } from '@/modules/client/products/interfaces/products.interface';

@Component({
    components: {
        SocialIcons,
    },
})
export default class ShoppingBar extends Vue {
    quantity = 0;

    @Prop({default: '', required:false}) stock!: string[];

    rules: any = rules;

    $refs!: {
        form: any;
    };

  

    isProduct(): boolean {
        if (this.$route.query.item === 'product') {
            return true;
        }

        return false;
    }

    @Emit('addToCart')
    async addToCart() {
        if (!this.GET_CLIENT_DATA.id) {
            this.$router.push({ name: 'Sign in' });
        } else if (this.$refs.form.validate()) {
            if (!this.quantity) {
                return;
            }
            this.$emit('addItemToCart', this.quantity);
        }
    }

    @authModule.Getter(AuthTypes.getters.GET_CLIENT_DATA)
    private GET_CLIENT_DATA!: CustomerInterface;
}
</script>
<style scoped>
.social {
    text-decoration: none !important;
}
</style>
