<template>
    <v-row align="center" justify="center">
        <v-col class="container-login" cols="12" lg="8" md="8" sm="8">
            <v-snackbar v-model="snackbar" top :timeout="timeout" color="error">
                Error occurred while getting the languages
                <v-btn color="white" text @click="snackbar = false">Cerrar</v-btn>
            </v-snackbar>
            <v-alert v-if="getErrRegister" prominent type="error">
                <v-row align="center">
                    <v-col class="grow">{{ getErrMessage }}</v-col>
                </v-row>
            </v-alert>
            <v-form
                @submit.prevent="submitRegister"
                class="login100-form validate-form flex-sb flex-w"
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-row class="logo-header mb-10">
                    <img src="../../../../assets/Logo-completo.png" class="logo-header__img" />
                    <span class="login100-form-title p-b-53 mb-4">
                        Register into Buhocenter
                    </span>
                </v-row>

                <v-row>
                    <v-col cols="12" lg="6" md="6" sm="12">
                        <span class="login100-form-subtitle p-b-53 mb-4">
                            Personal information
                        </span>
                        <div class="divider"></div>
                        <div class="validate-input mb-4" data-validate="Name is required">
                            <v-text-field
                                :label="$t('FIRST-NAME')"
                                v-model="name"
                                :rules="[() => !!name || 'This field is required']"
                            ></v-text-field>
                        </div>
                        <div class="validate-input mb-4" data-validate="Name is required">
                            <v-text-field
                                :label="$t('LAST-NAME')"
                                v-model="lastName"
                                :rules="[() => !!lastName || 'This field is required']"
                            ></v-text-field>
                        </div>
                        <v-col cols="12" lg="12" md="12">
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="birthdate"
                                persistent
                                primary
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <div class="p-t-31 mb-4">
                                        <span class="txt1">
                                            {{ $t('BIRTHDATE') }}
                                        </span>
                                    </div>
                                    <div class="validate-input mb-4" data-validate="birthdate is required">
                                        <v-btn primary class="input100 btn-date" v-on="on">
                                            {{ birthdate }}
                                        </v-btn>
                                        <span class="focus-input100"></span>
                                    </div>
                                </template>
                                <v-date-picker v-model="birthdate" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" dark @click="modal = false">Cancel</v-btn>
                                    <v-btn text color="primary" dark @click="$refs.dialog.save(birthdate)"
                                        >Save</v-btn
                                    >
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col lg="12" md="12">
                            <div class="p-t-31 mb-4">
                                <span class="txt1">
                                    {{ $t('LANGUAGE-OF-PLATFORM') }}
                                </span>
                            </div>
                            <v-select
                                :items="getLanguages"
                                name="category"
                                v-model="language"
                                item-text="name"
                                item-value="code"
                            ></v-select>
                        </v-col>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="12">
                        <span class="login100-form-subtitle p-b-53 mb-4">
                            User Account
                        </span>
                        <div class="divider"></div>
                        <div class="validate-input mb-4" data-validate="Email is required">
                            <v-text-field
                                :label="$t('EMAIL')"
                                v-model="email"
                                :rules="[() => !!email || 'This field is required']"
                            ></v-text-field>
                        </div>
                        <div class="validate-input mb-4" data-validate="Password is required">
                            <v-text-field
                                :label="$t('PASSWORD')"
                                v-model="password"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPass ? 'text' : 'password'"
                                @click:append="showPass = !showPass"
                                :rules="[() => !!password || 'This field is required']"
                            ></v-text-field>
                        </div>
                        <div class="validate-input mb-4" data-validate="Password is required">
                            <v-text-field
                                :label="$t('CONFIRM-PASSWORD')"
                                v-model="confirmPassword"
                                :append-icon="showRepeatPass ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showRepeatPass ? 'text' : 'password'"
                                @click:append="showRepeatPass = !showRepeatPass"
                                :rules="[() => !!confirmPassword || 'This field is required']"
                            ></v-text-field>
                        </div>
                        <v-alert type="error" v-if="errorInputs.passwordEquals">
                            Passwords must match
                        </v-alert>
                    </v-col>
                </v-row>
                <div class="center">
                    <div class="container-login100-form-btn mb-4">
                        <button class="login100-form-btn" v-if="isLoading">
                            <v-progress-circular :size="40" color="white" indeterminate></v-progress-circular>
                        </button>

                        <button type="submit" v-else class="login100-form-btn primary">
                            {{ $t('REGISTER') }}
                        </button>
                    </div>

                    <div class="w-full text-center p-t-55">
                        <span class="txt2">
                            {{ $t('YOU-HAVE-ACCOUNT?') }}
                        </span>

                        <RouterLink to="/sign-in" class="txt2 bo1">
                            {{ $t('SIGN-IN') }}
                        </RouterLink>
                    </div>
                </div>
            </v-form>
        </v-col>
        <v-snackbar v-model="snackbarError" color="error" class="mb-5 my-5" top>
            <ul>
                <li class="body-1" v-for="error in errors" :key="error.id">
                    {{ error }}
                </li>
            </ul>
            <v-btn color="white" text @click="snackbarError = false" small>
                Close
            </v-btn>
        </v-snackbar>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthMethods from '@/store/auth/methods/auth.methods';
import LanguageMethods from '@/store/languages/methods/language.methods';
import { authModule, languageModule } from '@/store/namespaces';
import Rules from '@/utils/rules';
import { CustomerInterface } from '@/modules/client/auth/interfaces/customer.interface';

@Component
export default class Login extends Vue {
    timeout = 5000;
    snackbar = false;
    showPass = false;
    showRepeatPass = false;
    name = '';
    lastName = '';
    birthdate: string = new Date().toISOString().substr(0, 10);
    languages: string[] = [];
    language = 'en';
    snackbarError = false;
    errors: Array<string> = [];
    valid = true;

    email = '';
    password = '';
    confirmPassword = '';
    modal = false;
    isLoading = false;
    errorInputs: any = {
        name: false,
        lastName: false,
        birthdate: false,
        language: false,
        email: false,
        passwordEquals: false,
        password: false,
    };

    async mounted() {
        if (this.getLanguages.length) {
            await this.apiGetLanguages();
            this.snackbar = this.getErrLanguages;
        }
    }

    showErrors(errorInputs: any): void {
        if (errorInputs.birthdate) {
            this.errors.push('You must be of legal age');
        }
        if (errorInputs.email) {
            this.errors.push('Valid email is required.');
        }
        if (errorInputs.passwordEquals) {
            this.errors.push('passwords must match.');
        }
        if (errorInputs.password) {
            this.errors.push('Password must be at least 6 characters.');
        }
        (this.$refs.form as Vue & { validate: () => boolean }).validate();
        this.snackbarError = true;
    }

    async submitRegister() {
        this.isLoading = true;
        const { errorInputs } = this;
        errorInputs.name = !Rules.onlyLetters(this.name);
        errorInputs.lastName = !Rules.onlyLetters(this.lastName);
        errorInputs.birthdate = !Rules.isAdult(this.birthdate);
        errorInputs.language = !this.language;
        errorInputs.email = !Rules.validateEmail(this.email);
        errorInputs.passwordEquals = this.password !== this.confirmPassword;
        errorInputs.password = this.password.length < 6;
        if (
            !errorInputs.name &&
            !errorInputs.lastName &&
            !errorInputs.birthdate &&
            !errorInputs.language &&
            !errorInputs.email &&
            !errorInputs.passwordEquals &&
            !errorInputs.password
        ) {
            const newClient: CustomerInterface = {
                name: this.name,
                lastName: this.lastName,
                birthDate: this.birthdate,
                email: this.email,
                password: this.password,
                language: this.language!,
            };
            const result = await this.registerCustomer(newClient);
            if (result) {
                await this.$router.push('/sign-in');
            }
        } else {
            this.errors.splice(0);
            this.showErrors(this.errorInputs);
        }
        this.isLoading = false;
    }

    @authModule.Action(AuthMethods.actions.REGISTER_CUSTOMER) registerCustomer!: (
        customer: CustomerInterface,
    ) => boolean;
    @authModule.Getter(AuthMethods.getters.GET_AUTH_TOKEN) getToken!: string;
    @authModule.Getter(AuthMethods.getters.GET_ERR_REGISTER_MESSAGES)
    getErrMessage!: string;
    @authModule.Getter(AuthMethods.getters.GET_ERR_REGISTER)
    getErrRegister!: boolean;

    @languageModule.Action(LanguageMethods.actions.API_GET_LANGUAGES)
    apiGetLanguages!: () => boolean;
    @languageModule.Getter(LanguageMethods.getters.GET_LANGUAGES) getLanguages;
    @languageModule.Getter(LanguageMethods.getters.GET_LANGUAGE_ERR)
    getErrLanguages!: boolean;
}
</script>

<style scoped lang="scss">
.divider {
    margin: 0 auto;
    background-color: var(--v-primary-base);
    height: 3px;
    width: 40%;
    border-radius: 50%;
}

.logo-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__img {
        height: 110px;
        width: auto;
    }
}
.container-login {
    background: #fff;
    border-radius: 10px;
    padding: 50px;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}

.txt1 {
    font-size: 16px;
    color: #555555;
    line-height: 1.5;
}

.txt2 {
    font-size: 14px;
    color: #999999;
    line-height: 1.5;
    text-decoration: none;
}

.bo1 {
    border-bottom: 1px solid #999999;
}

.login100-form {
    width: 100%;
}

.btn-date {
    background: none !important;
    border-bottom: 1px solid;
    border-radius: 0px;
    box-shadow: none !important;
    height: 50px !important;
}

.login100-form-title {
    display: flex;
    align-items: center;
    font-size: 25px;
    color: #555555;
    line-height: 1.2;
    text-align: center;
}
.login100-form-subtitle {
    width: 100%;
    display: block;
    font-size: 18px;
    color: #555555;
    line-height: 1.2;
    text-align: center;
}
/*------------------------------------------------------------------
    [ Button sign in with ]*/
.btn-face,
.btn-google {
    font-size: 18px;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 100%;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
    position: relative;
    z-index: 1;
}

.btn-google:hover {
    background-color: #db4437;
}
.btn-face {
    background-color: #3b5998;
    color: #ffffff;
}
.btn-face::after {
    display: block;

    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 0.4s;
}

.btn-face i {
    font-size: 30px;
    margin-right: 17px;
}

.btn-google img {
    width: 30px;
    margin-right: 15px;
    padding-bottom: 3px;
}

.wrap-input100 {
    width: 100%;
    position: relative;
    background-color: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
}

.input100 {
    color: #333333;
    line-height: 1.2;
    font-size: 18px;
    display: block;
    width: 100%;
    background: transparent;
    height: 60px;
    padding: 0 20px;
}

.focus-input100 {
    position: absolute;
    display: block;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    top: -1px;
    left: -1px;
    pointer-events: none;
    border: 1px solid #f1cabb;
    border-radius: 10px;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;
    transform: scaleX(1.1) scaleY(1.3);
}

.input100:focus + .focus-input100 {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
}

.container-login100-form-btn {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
}

.login100-form-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    background-color: #f1cabb;
    border-radius: 10px;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    transition: all 0.4s;
    position: relative;
    z-index: 1;
}

.login100-form-btn::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    top: 0;
    left: 0;
    background: #f1cabb;
    opacity: 0;
    transition: all 0.4s;
}

.login100-form-btn:hover:before {
    opacity: 1;
}
</style>
