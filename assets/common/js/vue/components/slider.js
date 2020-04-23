var slider = Vue.component('slider', {
    props: {
        Slider: {
            default: [{}]
        },
        fileUploadFormData: {
            default: new FormData()
        },
        newSlider: {
            default: ''
        }
    },
    methods: {
        loadSlider: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminContent/GetSliderImages', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Slider = response.body.map(function (x) {
                        x.Slider_Image_Img = APIUrl() + x.Slider_Image_Img;
                        return x
                    });
                    
                    setTimeout(() => {
                        animInputs();
                        hideLoader();
                    }, 500);
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        onFileChange: function (e, index) {
            if (e.target.files.length === 0) {
                this.clearUI();
                this.loadSlider();
            }
            else {
                const file = e.target.files[0];
                this.fileUploadFormData.append('file', file);
                if (index !== undefined) {
                    this.Slider[index].Slider_Image_Img = URL.createObjectURL(file);
                }
                else {
                    this.newSlider = URL.createObjectURL(file);
                }
            }
        },
        addSlide: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/AddSliderImage', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Imagen agregada correctamente');
                    this.loadSlider();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
            this.clearUI();
        },
        editSlide: function (Slider_Image_Id) {
            showLoader();

            this.fileUploadFormData.append('cat_Slider_Images', JSON.stringify({
                Slider_Image_Id: Slider_Image_Id
            }));

            this.$http.post(APIUrl() + 'AdminContent/UpdateSliderImage', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Imagen actualizada correctamente');
                    this.loadSlider();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
            this.clearUI();
        },
        deleteSlide: function (Slider_Image_Id) {
            showLoader();
            this.$http.post(APIUrl() + 'AdminContent/DeleteSliderImage', {
                Slider_Image_Id: Slider_Image_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    if (response.status === 200) {
                        succes_swal('¡Éxito!', 'Imagen eliminada correctamente');
                        this.loadSlider();
                        hideLoader();
                    }
                    else {
                        warning_swal('¡Ups!', 'Algo ha ido mal, intenta más tarde');
                        hideLoader();
                    }
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                }
            );
            this.clearUI();
        },
        clearUI: function () {
            this.fileUploadFormData = new FormData();
            this.newSlider = '';
            this.Slider = [{}];

            var labelFileElements = document.getElementsByClassName('js-labelFile');
            for (let labelFile of labelFileElements) {
                labelFile.className = labelFile.className.replace(/\bhas-file\b/g, "");
                labelFile.innerHTML = '<i class="icon fa fa-check"></i> <span class="js-fileName">Selecciona un archivo</span>';
            }
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Slider</h1>
                </div>

                <div class="col-md-4" v-for="(slide, index) in Slider">
                    <form v-on:submit.prevent="editSlide(slide.Slider_Image_Id)">
                        <div>
                            <div class="form-group col-md-12 text-center">
                                <img class="w100" v-bind:src="slide.Slider_Image_Img" alt="" />
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3">
                                <input required v-on:change="onFileChange(event, index)" type="file" v-bind:id="'file' + index" class="input-file" accept="image/x-png,image/jpeg">
                                <label v-bind:for="'file' + index" class="btn btn-tertiary js-labelFile">
                                    <i class="icon fa fa-check"></i>
                                    <span class="js-fileName">Selecciona un archivo</span>
                                </label>
                            </div>
                            <div class="form-group col-md-6 col-md-offset-3 text-center">
                                <input type="submit" class="btn btn-info" value="Guardar">
                                <button v-on:click="deleteSlide(slide.Slider_Image_Id)" class="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="col-md-12">
                    <div class="col-md-6 col-md-offset-3">
                        <form v-on:submit.prevent="addSlide">
                            <div>
                                <div class="form-group text-center">
                                    <h3>Nuevo Slide</h3>
                                </div>
                                <div class="form-group col-md-6 col-md-offset-3 text-center">
                                    <img class="w100" v-bind:src="newSlider" alt="">
                                </div>
                                <div class="form-group col-md-6 col-md-offset-3">
                                    <input required v-on:change="onFileChange(event)" type="file" id="newFile" class="input-file" accept="image/x-png,image/jpeg">
                                    <label for="newFile" class="btn btn-tertiary js-labelFile w100">
                                        <i class="icon fa fa-check"></i>
                                        <span class="js-fileName">Selecciona un archivo</span>
                                    </label>
                                </div>
                                <div class="form-group col-md-6 col-md-offset-3">
                                    <input type="submit" class="btn btn-success w100" value="Guardar">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        this.loadSlider();
    }
});

export default slider;