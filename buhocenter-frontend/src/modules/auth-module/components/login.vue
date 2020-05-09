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
                    <v-alert
                        v-if="getErrAuth"
                        prominent
                        type="error"
                    >
                        <v-row align="center">
                            <v-col class="grow">{{getErrMessage}}</v-col>
                        </v-row>
                    </v-alert>
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
                    <v-btn class="btn-login btn-gmail mb-4" @click="loginWithSocial('google')">
                        <v-icon class="mr-2">mdi-gmail</v-icon>
                        Log in with Gmail
                    </v-btn>
                    <v-btn class="btn-login btn-facebook" @click="loginWithSocial('facebook')">
                        <v-icon class="mr-2">mdi-facebook</v-icon>
                        Log in with Facebook
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AuthMethods from '@/store/auth-module/methods/auth-methods'
    import { authModule } from "@/store/namespaces";

    @Component
    export default class Login extends Vue {
        async loginWithSocial(social: string){
            await this.loginSocial(social);
            const token: string = this.getToken;
            if(token){
                this.$router.push("/home");
            } else {
                console.log(token);
            }
        }


        @authModule.Action(AuthMethods.actions.LOGIN_SOCIAL) loginSocial;
        @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN) getToken;
        @authModule.Getter(AuthMethods.getters.GET_ERR_MESSAGES) getErrMessage;
        @authModule.Getter(AuthMethods.getters.GET_ERR_AUTH)  getErrAuth;
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
    .btn-facebook{
        background-color: #3b5998 !important;
    }

</style>
