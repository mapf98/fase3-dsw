<template>
    <v-row
            align="center"
            justify="center"
    >
        <v-col
                cols="12"
                sm="8"
                md="4"
        >
            <v-card class="elevation-12">
                <v-card-title class="text-center">
                        INICIO DE SESIÓN
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                                label="Login"
                                name="login"
                                type="text"
                        />

                        <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="content-actions d-block text-center">
                    <v-btn class="btn-login mb-4" color="primary">Log in</v-btn>
                    <h5 class="mb-4">OR</h5>
                    <v-btn class="btn-login btn-gmail" @click="loginWithGoogle()">
                        <v-icon class="mr-2">mdi-gmail</v-icon>
                        Log in with Gmail
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { Action, Getter, State } from 'vuex-class';
    import AuthMethods from '../../../store/auth-module/methods/auth-methods';
    import { authModule } from "../../../store/namespaces";

    @Component
    export default class Login extends Vue {
        async loginWithGoogle(){
            await this.loginGoogle();
            const token: string = this.getTokenGoogle;
            if(token){
                this.$router.push("/home");
            }
        }

        @Watch('tokenGoogle')
        tokenGoogle(){
            const token: string = this.getTokenGoogle;
            if(token){
                this.$router.push("/home");
            }
            return ""
        }

        @authModule.Action(AuthMethods.actions.LOGIN_WITH_GOOGLE) loginGoogle;
        @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN_GOOGLE) getTokenGoogle;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content-actions{
        padding: 40px;
    }

    .btn-login{
        margin-left: 0px !important;
        font-size: 15px;
        line-height: 1.5;
        color: #fff;
        text-transform: uppercase;
        width: 100%;
        height: 50px !important;
        border-radius: 25px;
        background: #57b846;
    }

    .btn-gmail{
        background-color: #db5040 !important;
    }

</style>
