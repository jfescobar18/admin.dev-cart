var config = Vue.component('config', {
    props: {
        Configurations: {
            default: [{}]
        },
        Configuration_Key: {
            default: ''
        },
        Configuration_Value: {
            default: ''
        }
    },
    methods: {
        loadConfigurations: function () {
            showLoader();
            this.$http.get(APIUrl() + 'Configurations/GetConfigurations', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Configurations = response.body;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        addConfiguration: function () {
            showLoader();
            this.$http.post(APIUrl() + 'Configurations/AddConfiguration', {
                Configuration_Key: this.Configuration_Key,
                Configuration_Value: this.Configuration_Value
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección agregada correctamente');
                    $('#new-modal').modal('hide');
                    this.loadConfigurations();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        editConfiguration: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'Configurations/UpdateConfiguration', {
                Configuration_Id: this.Configurations[index].Configuration_Id,
                Configuration_Key: this.Configurations[index].Configuration_Key,
                Configuration_Value: this.Configurations[index].Configuration_Value
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección editada correctamente');
                    this.loadConfigurations();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        deleteConfiguration: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'Configurations/DeleteConfiguration', {
                Configuration_Id: this.Configurations[index].Configuration_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección eliminada correctamente');
                    this.loadConfigurations();
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
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Configuraciones</h1>
                </div>

                <div class="container" v-for="(configuration, index) in Configurations">
                    <div class="col-md-6 col-md-offset-3">
                        <form v-on:submit.prevent="editConfiguration(index)">
                            <div class="col-md-6 form-group">
                                <label class="col-md-12 control-label">Key
                                    <input type="text" class="form-control" v-model="configuration.Configuration_Key" placeholder="Header" readonly>
                                </label>
                            </div>
                            <div class="col-md-6 form-group">
                                <label class="col-md-12 control-label">Value
                                    <input type="text" class="form-control" v-model="configuration.Configuration_Value" placeholder="Value">
                                </label>
                            </div>
                            <div class="row form-group text-center">
                                <input type="submit" class="btn btn-info" value="Guardar">
                                <button type="button" class="btn btn-danger">Eliminar</button>
                            </div>
                            <hr>
                        </form>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group col-md-6 col-md-offset-3">
                        <button type="button" class="btn btn-success w100" data-toggle="modal" data-target="#new-modal">Nueva Configuración</button>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Agregar Configuración</h4>
                            </div>
                            <div class="modal-body">

                                <form v-on:submit.prevent="addConfiguration">
                                    <div class="col-md-6 form-group">
                                        <label class="col-md-12 control-label">Key
                                            <input type="text" class="form-control" placeholder="Key" v-model="Configuration_Key">
                                        </label>
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label class="col-md-12 control-label">Value
                                            <input type="text" class="form-control" placeholder="Value" v-model="Configuration_Value">
                                        </label>
                                    </div>
                                    <div class="row form-group text-center">
                                        <input type="submit" class="btn btn-info" value="Guardar">
                                    </div>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    created: function () {
        this.loadConfigurations();
    }
});

export default config;