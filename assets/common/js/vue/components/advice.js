var advice = Vue.component('advice', {
    props: {
        Notice_Privacy_Id: {
            default: 0
        },
        Notice_Privacy_Title: {
            default: ''
        },
        Notice_Privacy_Content: {
            default: ''
        }
    },
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            editor: ClassicEditor
        };
    },
    methods: {
        loadNoticePrivacy: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminContent/GetNoticePrivacy', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Notice_Privacy_Id = response.body[0].Notice_Privacy_Id;
                    this.Notice_Privacy_Title = response.body[0].Notice_Privacy_Title;
                    this.Notice_Privacy_Content = response.body[0].Notice_Privacy_Content;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        editNoticePrivacy: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/UpdateNoticePrivacy', {
                Notice_Privacy_Id: this.Notice_Privacy_Id,
                Notice_Privacy_Title: this.Notice_Privacy_Title,
                Notice_Privacy_Content: this.Notice_Privacy_Content
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Sección editada correctamente');
                    this.loadNoticePrivacy();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
    },
    template: `
        <div>
            <navbar></navbar>

            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Aviso de Privacidad</h1>
                </div>

                <div class="container">
                    <div class="col-md-6 col-md-offset-3">
                        <form v-on:submit.prevent="editNoticePrivacy">
                            <div class="row form-group">
                                <label class="col-md-12 control-label">Título
                                    <input type="text" class="form-control" v-model="Notice_Privacy_Title" placeholder="Título">
                                </label>
                            </div>
                            <div class="row form-group">
                                <label class="col-md-12 control-label">Contenido</label>
                                <div class="col-md-12">
                                    <ckeditor :editor="editor" v-model="Notice_Privacy_Content"></ckeditor>
                                </div>
                            </div>
                            <div class="row form-group text-center">
                                <input type="submit" class="btn btn-info" value="Guardar">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    created: function () {
        this.loadNoticePrivacy();
    }
});

export default advice;