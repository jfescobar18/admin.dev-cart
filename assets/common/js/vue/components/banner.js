var banner = Vue.component('banner', {
    props: {
        Banner: {
            default: [{}]
        },
        fileUploadFormData: {
            default: new FormData()
        }
    },
    methods: {
        loadBanner: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminContent/GetOffersImage', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    if (response.body.length > 0) {
                        this.Banner = response.body.map(function (x) {
                            x.Offers_Banner_Img = APIUrl() + x.Offers_Banner_Img;
                            return x
                        });
                    }
                    animInputs();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        onFileChange: function (e) {
            if (e.target.files.length === 0) {
                this.defaultState();
                this.loadBanner();
            }
            else {
                const file = e.target.files[0];
                this.fileUploadFormData.append('file', file);
                this.Banner[0].Offers_Banner_Img = URL.createObjectURL(file);
            }
        },
        editBanner: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/UpdateOffersImage', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Banner actualizado correctamente');
                    this.loadBanner();
                    this.defaultState();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    this.defaultState();
                    hideLoader();
                }
            );
        },
        defaultState: function () {
            this.fileUploadFormData = new FormData();

            var labelFile = document.querySelector('.js-labelFile');
            labelFile.className = labelFile.className.replace(/\bhas-file\b/g, "");
            labelFile.innerHTML = '<i class="icon fa fa-check"></i> <span class="js-fileName">Selecciona un archivo</span>';
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Banner</h1>
                </div>

                <div class="col-md-6 col-md-offset-3">
                    <form v-on:submit.prevent="editBanner">
                        <div>
                            <div class="form-group col-md-12 text-center">
                                <img class="w100" v-bind:src="Banner[0].Offers_Banner_Img" alt="">
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3">
                                <input required v-on:change="onFileChange(event)" type="file" name="file" id="file" class="input-file" accept="image/x-png,image/jpeg">
                                <label for="file" class="btn btn-tertiary js-labelFile">
                                    <i class="icon fa fa-check"></i>
                                    <span class="js-fileName">Selecciona un archivo</span>
                                </label>
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3 text-center">
                                <input type="submit" class="btn btn-info" value="Guardar">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        this.loadBanner();
    }
});

export default banner;