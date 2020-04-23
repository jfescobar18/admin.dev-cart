var aboutus = Vue.component('aboutus', {
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            AboutUsSections: [{}],
            About_Us_Section_Title: '',
            About_Us_Section_Content: '',
            editor: ClassicEditor
        };
    },
    methods: {
        loadAboutUsSections: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminContent/GetAboutUsSections', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.AboutUsSections = response.body;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        addAboutUsSection: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/AddAboutUsSection', {
                About_Us_Section_Title: this.About_Us_Section_Title,
                About_Us_Section_Content: this.About_Us_Section_Content
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección agregada correctamente');
                    $('#new-modal').modal('hide');
                    this.loadAboutUsSections();
                    this.clearState();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        editAboutUsSection: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/UpdateAboutUsSection', {
                About_Us_Section_Id: this.AboutUsSections[index].About_Us_Section_Id,
                About_Us_Section_Title: this.AboutUsSections[index].About_Us_Section_Title,
                About_Us_Section_Content: this.AboutUsSections[index].About_Us_Section_Content
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección editada correctamente');
                    this.loadAboutUsSections();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        deleteAboutUsSection: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/DeleteAboutUsSection', {
                About_Us_Section_Id: this.AboutUsSections[index].About_Us_Section_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección eliminada correctamente');
                    this.loadAboutUsSections();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        clearState: function () {
            this.About_Us_Section_Title = '';
            this.About_Us_Section_Content = '';
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>About Us</h1>
                </div>

                <div class="container" v-for="(section, index) in AboutUsSections">
                    <div class="col-md-6 col-md-offset-3">
                        <form v-on:submit.prevent="editAboutUsSection(index)">
                            <div class="row form-group">
                                <label class="col-md-12 control-label">Header
                                    <input type="text" class="form-control" v-model="section.About_Us_Section_Title" placeholder="Header">
                                </label>
                            </div>
                            <div class="row form-group">
                                <label class="col-md-12 control-label">Párrafo</label>
                                <div class="col-md-12">
                                    <ckeditor :editor="editor" v-model="section.About_Us_Section_Content"></ckeditor>
                                </div>
                            </div>
                            <div class="row form-group text-center">
                                <input type="submit" class="btn btn-info" value="Guardar">
                                <button type="button" class="btn btn-danger" v-on:click="deleteAboutUsSection(index)">Eliminar</button>
                            </div>
                            <hr>
                        </form>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group col-md-6 col-md-offset-3">
                        <button type="button" class="btn btn-success w100" data-toggle="modal" data-target="#new-modal">Nueva Sección</button>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Agregar Sección</h4>
                            </div>
                            <div class="modal-body">

                                <form v-on:submit.prevent="addAboutUsSection">
                                    <div class="row form-group">
                                        <label class="col-md-12 control-label">Header
                                            <input type="text" class="form-control" placeholder="Header" v-model="About_Us_Section_Title">
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label class="col-md-12 control-label">Párrafo</label>
                                        <div class="col-md-12">
                                            <ckeditor :editor="editor" v-model="About_Us_Section_Content"></ckeditor>
                                        </div>
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
        this.loadAboutUsSections();
    }
});

export default aboutus;