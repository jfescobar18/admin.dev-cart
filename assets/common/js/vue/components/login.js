const login = Vue.component('login', {
    props: {
        Admin_Login_Username: {
            default: ''
        },
        Admin_Login_Password: {
            default: ''
        }
    },
    methods: {
        requestlogin: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminCredentials/Login', {
                Admin_Login_Username: this.Admin_Login_Username,
                Admin_Login_Password: this.Admin_Login_Password
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    if (response.body.message > 0) {
                        this.$session.start();
                        this.$session.set('jwt', response.body.message);
                        Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.message;
                        this.$router.push('/');
                    } else {
                        warning_swal('¡Epa!', 'Error al iniciar sesión, por favor verifica tus crendenciales');
                    }
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        }
    },
    template: `
        <div class="grid">
            <div class="login">
                <h2><span class="fontawesome-lock"></span>Iniciar sesión</h2>
                <form v-on:submit.prevent="requestlogin">
                    <div class="row form-group">
                        <label class="col-md-12 control-label">Email
                            <input type="email" class="form-control" placeholder="Email" required autocomplete="on" v-model="Admin_Login_Username">
                        </label>
                    </div>
                    <div class="row form-group">
                        <label class="col-md-12 control-label">Password
                            <input type="password" class="form-control" placeholder="Password" required autocomplete="on" v-model="Admin_Login_Password">
                        </label>
                    </div>
                    <div class="row form-group text-center">
                        <input type="submit" class="btn btn-success" value="Iniciar">
                    </div>
                </form>
            </div>
        </div>
    `,
    beforeCreate: function () {
        if (this.$session.exists()) {
            this.$router.push('/');
        }
    },
    beforeUpdate: function () {
        if (this.$session.exists()) {
            this.$router.push('/');
        }
    }
});

export default login;