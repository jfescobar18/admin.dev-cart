var social = Vue.component('social', {
    data() {
        return {
            SocialMedias: [{}],
            Social_Media_Name: '',
            Social_Media_Awesome_Font: '',
            Social_Media_Url: '',
            Social_Media_Tab: ''
        };
    },
    methods: {
        loadSocialMedias: function () {
            showLoader();
            this.$http.get(APIUrl() + 'SocialMedia/GetSocialMedias', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.SocialMedias = response.body;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        addSocialMedia: function () {
            showLoader();
            this.$http.post(APIUrl() + 'SocialMedia/AddSocialMedia', {
                Social_Media_Name: this.Social_Media_Name,
                Social_Media_Awesome_Font: this.Social_Media_Awesome_Font,
                Social_Media_Url: this.Social_Media_Url,
                Social_Media_Tab: this.Social_Media_Tab
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Red Social agregada correctamente');
                    $('#new-modal').modal('hide');
                    this.ClearProps();
                    this.loadSocialMedias();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        editSocialMedia: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'SocialMedia/UpdateSocialMedia', {
                Social_Media_Id: this.SocialMedias[index].Social_Media_Id,
                Social_Media_Name: this.SocialMedias[index].Social_Media_Name,
                Social_Media_Awesome_Font: this.SocialMedias[index].Social_Media_Awesome_Font,
                Social_Media_Url: this.SocialMedias[index].Social_Media_Url,
                Social_Media_Tab: this.SocialMedias[index].Social_Media_Tab
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Red Social editada correctamente');
                    this.loadSocialMedias();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        deleteSocialMedia: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'SocialMedia/DeleteSocialMedia', {
                Social_Media_Id: this.SocialMedias[index].Social_Media_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Red Social eliminada correctamente');
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
        ClearProps: function () {
            this.Social_Media_Name = '';
            this.Social_Media_Awesome_Font = '';
            this.Social_Media_Url = '';
            this.Social_Media_Tab = '';
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Redes Sociales</h1>
                </div>

                <div class="container" v-for="(socialMedia, index) in SocialMedias">
                    <div class="col-md-12">
                        <form v-on:submit.prevent="editSocialMedia(index)">
                            <div class="col-md-4 form-group">
                                <label class="col-md-12 control-label">Nombre
                                    <input type="text" class="form-control" v-model="socialMedia.Social_Media_Name">
                                </label>
                            </div>
                            <div class="col-md-4 form-group">
                                <label class="col-md-12 control-label">Awesome Font HTML
                                    <input type="text" class="form-control" v-model="socialMedia.Social_Media_Awesome_Font">
                                </label>
                            </div>
                            <div class="col-md-4 form-group">
                                <label class="col-md-12 control-label">Url
                                    <input type="text" class="form-control" v-model="socialMedia.Social_Media_Url">
                                </label>
                            </div>
                            <div class="col-md-4 form-group">
                                <label class="col-md-12 control-label">Tab
                                    <select class="form-control" v-model="socialMedia.Social_Media_Tab">
                                        <option value="_self">Default</option>
                                        <option value="_blank">Nueva Pestaña</option>
                                    </select>
                                </label>
                            </div>
                            <div class="col-md-12 form-group">
                                <label class="col-md-4 control-label">
                                    <br />
                                    <div class="col-md-6">
                                        <input type="submit" class="btn btn-info form-control" value="Guardar">
                                    </div>
                                    <div class="col-md-6">
                                        <button type="button" class="btn btn-danger form-control">Eliminar</button>
                                    </div>
                                </label>
                            </div>
                        </form>
                        <div class="col-md-12">
                            <hr />
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group col-md-6 col-md-offset-3">
                        <button type="button" class="btn btn-success w100" data-toggle="modal" data-target="#new-modal">Nueva Red Social</button>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Nueva Red Social</h4>
                            </div>
                            <div class="modal-body">

                                <form class="d-inline-table" v-on:submit.prevent="addSocialMedia">
                                    <div class="col-md-6 form-group">
                                        <label class="col-md-12 control-label">Nombre
                                            <input type="text" class="form-control" v-model="Social_Media_Name" />
                                        </label>
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label class="col-md-12 control-label">Awesome Font HTML
                                            <input type="text" class="form-control" v-model="Social_Media_Awesome_Font" />
                                        </label>
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label class="col-md-12 control-label">Url
                                            <input type="text" class="form-control" v-model="Social_Media_Url" />
                                        </label>
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label class="col-md-12 control-label">Tab
                                            <select class="form-control" v-model="Social_Media_Tab" >
                                                <option value="_self">Default</option>
                                                <option value="_blank">Nueva Pestaña</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="col-md-12 form-group">
                                        <label class="col-md-12 control-label">
                                            <br />
                                            <div class="col-md-6 col-md-offset-3">
                                                <input type="submit" class="btn btn-info form-control" value="Guardar" />
                                            </div>
                                        </label>
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
        this.loadSocialMedias();
    }
});

export default social;