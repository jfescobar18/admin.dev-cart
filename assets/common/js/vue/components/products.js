const products = Vue.component('products', {
    props: {
        Categories: {
            default: [{}]
        },
        Products: {
            default: [{}]
        },
        Product_Galery_Images: {
            default: [{}]
        },
        Product_Id: {
            default: 0
        },
        Product_Name: {
            default: ''
        },
        Product_Price: {
            default: ''
        },
        Product_Disscount: {
            default: ''
        },
        Category_Id: {
            default: 0
        },
        Product_Img: {
            default: ''
        },
        Product_Description: {
            default: ''
        },
        Product_Configurations: {
            default: {}
        },
        Product_Creation_Date: {
            default: ''
        },
        Product_Stock: {
            default: 0
        },
        Product_Released: {
            default: false
        },
        Image_Url: {
            default: ''
        },
        fileUploadFormData: {
            default: new FormData()
        },
        includeColor: {
            default: false
        },
        includeSize: {
            default: false
        },
        Product_Galery_Images_Product_Id: {
            default: 0
        },
        Product_Galery_Image_Order: {
            default: ''
        },
        newGalery: {
            default: ''
        }
    },
    methods: {
        initUI: function () {
            animInputs();
            this.loadCategories();
            this.loadProducts();
            this.initJsonConfig();
        },
        loadCategories: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminProduct/GetCategories', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Categories = response.body;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        loadProducts: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminProduct/GetProducts', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    if (response.body.length > 0) {
                        this.Products = response.body.map(function (x) {
                            x.Product_Price = formatMoney(x.Product_Price);
                            x.Product_Disscount += '%';
                            x.Product_Img = APIUrl() + x.Product_Img;
                            return x
                        });
                    }
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        addProduct: function () {
            showLoader();
            if (!this.includeColor) {
                this.Product_Configurations.color = [];
            }

            if (!this.includeSize) {
                this.Product_Configurations.size = [];
            }

            this.fileUploadFormData.append('cat_Products', JSON.stringify({
                Product_Name: this.Product_Name,
                Product_Price: this.Product_Price.replace('$', '').replace(',', ''),
                Product_Disscount: this.Product_Disscount.replace('%', ''),
                Category_Id: this.Category_Id,
                Product_Description: this.Product_Description,
                Product_Configurations: JSON.stringify(this.Product_Configurations),
                Product_Stock: this.Product_Stock,
                Product_Released: this.Product_Released
            }));

            this.$http.post(APIUrl() + 'AdminProduct/AddProduct', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Producto agregado correctamente');
                    this.loadProducts();
                    this.CloseModal();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    this.CloseModal();
                    hideLoader();
                }
            );
        },
        editProduct: function () {
            showLoader();
            if (!this.includeColor) {
                this.Product_Configurations.color = [];
            }

            if (!this.includeSize) {
                this.Product_Configurations.size = [];
            }

            this.fileUploadFormData.append('cat_Products', JSON.stringify({
                Product_Id: this.Product_Id,
                Product_Name: this.Product_Name,
                Product_Price: this.Product_Price.replace('$', '').replace(',', ''),
                Product_Disscount: this.Product_Disscount.replace('%', ''),
                Category_Id: this.Category_Id,
                Product_Description: this.Product_Description,
                Product_Configurations: JSON.stringify(this.Product_Configurations),
                Product_Released: this.Product_Released,
                Product_Stock: this.Product_Stock
            }));

            this.$http.post(APIUrl() + 'AdminProduct/UpdateProduct', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Producto editado correctamente');
                    this.loadProducts();
                    this.CloseModal();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    this.CloseModal();
                    hideLoader();
                }
            );
        },
        addEditProduct: function () {
            if (this.Product_Id === '0') {
                this.addProduct();
            }
            else {
                this.editProduct();
            }
        },
        editModalProduct: function (index) {
            this.Product_Id = this.Products[index].Product_Id;
            this.Product_Name = this.Products[index].Product_Name;
            this.Product_Price = this.Products[index].Product_Price;
            this.Product_Disscount = this.Products[index].Product_Disscount;
            this.Category_Id = this.Products[index].Category_Id;
            this.Product_Description = this.Products[index].Product_Description;
            this.Product_Configurations = JSON.parse(this.Products[index].Product_Configurations);
            this.Product_Released = this.Products[index].Product_Released;
            this.Product_Stock = this.Products[index].Product_Stock;
            this.Image_Url = this.Products[index].Product_Img;

            this.includeColor = this.Product_Configurations.color.length > 0 ? true : false;
            this.includeSize = this.Product_Configurations.size.length > 0 ? true : false;

            setTimeout(() => {
                jscolor.installByClassName("jscolor");
            }, 100);

            $('#new-modal').modal('show');
        },
        deleteProduct: function (Product_Id) {
            showLoader();
            this.$http.post(APIUrl() + 'AdminProduct/DeleteProduct', {
                Product_Id: Product_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Producto eliminado correctamente');
                    this.loadProducts();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        editModalProductGalery: function (Product_Id) {
            showLoader();
            this.$http.get(APIUrl() + `AdminProduct/GetProductGaleryImages/${Product_Id}`, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Product_Galery_Images = response.body.map(function (x) {
                        x.Product_Galery_Image_Img = APIUrl() + x.Product_Galery_Image_Img;
                        return x
                    });

                    this.Product_Galery_Images_Product_Id = Product_Id;
                    hideLoader();
                    $('#galery-modal').modal('show');
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        addGaleryImage: function () {
            showLoader();
            this.fileUploadFormData.append('cat_Product_Galery_Images', JSON.stringify({
                Product_Id: this.Product_Galery_Images_Product_Id,
                Product_Galery_Image_Order: this.Product_Galery_Image_Order
            }));

            this.$http.post(APIUrl() + 'AdminProduct/AddProductGaleryImage', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Imagen agregada correctamente');
                    this.editModalProductGalery(this.Product_Galery_Images_Product_Id);
                    this.clearGaleryModalUI();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    this.CloseGaleryModal();
                    hideLoader();
                }
            );
        },
        editGaleryImage: function (index) {
            showLoader();
            this.fileUploadFormData.append('cat_Product_Galery_Images', JSON.stringify({
                Product_Galery_Image_Id: this.Product_Galery_Images[index].Product_Galery_Image_Id,
                Product_Galery_Image_Order: this.Product_Galery_Images[index].Product_Galery_Image_Order
            }));

            this.$http.post(APIUrl() + 'AdminProduct/UpdateProductGaleryImage', this.fileUploadFormData, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Imagen editada correctamente');
                    this.editModalProductGalery(this.Product_Galery_Images_Product_Id);
                    this.clearGaleryModalUI();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    this.CloseGaleryModal();
                    hideLoader();
                }
            );

        },
        deleteGaleryImage: function (Product_Galery_Image_Id) {
            showLoader();
            this.$http.post(APIUrl() + 'AdminProduct/DeleteProductGaleryImage', {
                Product_Galery_Image_Id: Product_Galery_Image_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Imagen eliminada correctamente');
                    this.editModalProductGalery(this.Product_Galery_Images_Product_Id);
                    this.clearGaleryModalUI();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    this.CloseGaleryModal();
                    hideLoader();
                }
            );
        },
        onFileChange: function (e) {
            this.fileUploadFormData = new FormData();
            const file = e.target.files[0];
            this.fileUploadFormData.append('file', file);
            this.Image_Url = URL.createObjectURL(file);
        },
        onGaleryFileChange: function (e, index) {
            this.fileUploadFormData = new FormData();
            const file = e.target.files[0];
            this.fileUploadFormData.append('file', file);

            if (index !== undefined) {
                this.Product_Galery_Images[index].Product_Galery_Image_Img = URL.createObjectURL(file);
            }
            else {
                this.newGalery = URL.createObjectURL(file);
            }
        },
        onlyNumbers: function ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                $event.preventDefault();
            }
        },
        FormatPrice: function () {
            var price = this.Product_Price.replace('$', '').replace(',', '');
            this.Product_Price = formatMoney(price);
        },
        FormatDisscount: function () {
            this.Product_Disscount = this.Product_Disscount.replace('%', '');
            this.Product_Disscount += '%'
        },
        addColor: function () {
            this.Product_Configurations.color.push('FFFFFF');

            setTimeout(() => {
                jscolor.installByClassName("jscolor");
            }, 100);
        },
        deleteColor: function (index) {
            this.Product_Configurations.color = arrayRemove(this.Product_Configurations.color, this.Product_Configurations.color[index]);
            setTimeout(() => {
                jscolor.installByClassName("jscolor");
            }, 100);
        },
        setColor: function (e) {
            var index = e.target.id.replace('color', '');
            this.Product_Configurations.color[index] = e.target.value;
            setTimeout(() => {
                jscolor.installByClassName("jscolor");
            }, 100);
        },
        addSize: function () {
            if (this.Product_Configurations.size === undefined) {
                this.Product_Configurations = {
                    'size': []
                }
            }

            this.Product_Configurations.size.push('');
        },
        deleteSize: function (index) {
            this.Product_Configurations.size = arrayRemove(this.Product_Configurations.size, this.Product_Configurations.size[index]);
        },
        initJsonConfig: function () {
            this.Product_Configurations = {
                'color': [],
                'size': []
            };
        },
        CloseModal: function () {
            $('#new-modal').modal('hide');
            this.Product_Id = '0';
            this.Product_Name = '';
            this.Product_Price = ''
            this.Product_Disscount = '';
            this.Category_Id = '0'
            fileUploadFormData = new FormData();
            this.Product_Description = '';
            this.Product_Configurations = {
                'color': [],
                'size': []
            };
            this.Product_Released = false;
            this.Product_Stock = '0';
            this.Image_Url = '';
        },
        CloseGaleryModal: function () {
            $('#galery-modal').modal('hide');
            this.clearGaleryModalUI();
        },
        clearGaleryModalUI: function () {
            this.Product_Galery_Image_Order = '';
            this.newGalery = '';
            this.fileUploadFormData = new FormData();
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Productos</h1>
                </div>

                <div class="container">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Categoría</th>
                                    <th>Imagen</th>
                                    <th class="comments">Descripción</th>
                                    <th>Disponible</th>
                                    <th>Stock</th>
                                    <th>Editar Galería</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in Products">
                                    <td>{{ product.Product_Id }}</td>
                                    <td>{{ product.Product_Name }}</td>
                                    <td>{{ product.Product_Price }}</td>
                                    <td>{{ product.Product_Disscount }}</td>
                                    <td>{{ product.Category_Name }}</td>
                                    <td><img v-bind:src="product.Product_Img" alt=""></td>
                                    <td class="comments">{{ product.Product_Description }}</td>
                                    <td>{{ product.Product_Released }}</td>
                                    <td>{{ product.Product_Stock }}</td>
                                    <td class="text-center"><button type="button" class="btn btn-info" v-on:click="editModalProductGalery(product.Product_Id)">Editar</button></td>
                                    <td>
                                        <button type="button" class="btn btn-primary" v-on:click="editModalProduct(index)">Editar</button>
                                        <button type="button" class="btn btn-danger" v-on:click="deleteProduct(product.Product_Id)">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group col-md-6 col-md-offset-3">
                        <button type="button" class="btn btn-success w100" data-toggle="modal" data-target="#new-modal">Nuevo Producto</button>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" v-on:click="CloseModal">&times;</button>
                                <h4 class="modal-title">Agregar/Editar Producto</h4>
                            </div>
                            <div class="modal-body">

                                <form v-on:submit.prevent="addEditProduct">
                                    <input type="number" hidden v-model="Product_Id">
                                    <div class="row form-group">
                                        <label for="name" class="col-md-12 control-label">Nombre
                                            <input type="text" class="form-control" id="name" 
                                                placeholder="Nombre" v-model="Product_Name">
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label for="price" class="col-md-12 control-label">Precio
                                            <input type="text" class="form-control" id="price" 
                                                placeholder="Precio" v-model="Product_Price" v-on:change="FormatPrice" v-on:keypress="onlyNumbers">
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label for="disscount" class="col-md-12 control-label">Descuento
                                            <input type="text" class="form-control" id="disscount" 
                                                placeholder="Descuento" v-model="Product_Disscount" v-on:change="FormatDisscount" v-on:keypress="onlyNumbers">
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label for="category" class="col-md-12 control-label">Categoría
                                            <select class="form-control" id="category" v-model="Category_Id">
                                                <option value="0" selected disabled>Selecciona una categoría</option>
                                                <option v-for="category in Categories" v-bind:value="category.Category_Id">{{ category.Category_Name }}</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label class="col-md-12 control-label">
                                            Imagen
                                        </label>
                                        <div class="form-group col-md-12 text-center">
                                            <img class="w100" v-bind:src="Image_Url" alt="">
                                        </div>
                                        <div class="form-group col-md-6 col-md-offset-3">
                                            <input v-on:change="onFileChange(event)" type="file" id="newFile" class="input-file" accept="image/x-png,image/jpeg">
                                            <label for="newFile" class="btn btn-tertiary js-labelFile w100">
                                                <i class="icon fa fa-check"></i>
                                                <span class="js-fileName">Selecciona un archivo</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <label for="description" class="col-md-12 control-label">Descripción
                                            <textarea id="description" v-model="Product_Description" class="form-control" cols="30" rows="10" placeholder="Descripción"></textarea>
                                            <small>*Puedes usar etiquetas html básicas</small>
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label class="col-md-12 control-label">
                                            Configuraciones 
                                        </label>

                                        <div class="form-group col-md-12">
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="color" v-model="includeColor">
                                                <label class="form-check-label" for="color">Color</label>
                                                <div class="config-collection">
                                                    <div class="config-item" v-for="(color, index) in Product_Configurations.color" v-bind:checked="includeColor ? 'checked' : ''">
                                                        <input v-bind:id="'color' + index" class="jscolor form-control" v-bind:value="color" v-on:change="setColor">
                                                        <button type="button" class="btn btn-danger btn-xs" v-on:click="deleteColor(index)"><i class="fa fa-trash"></i></button>
                                                    </div>
                                                    <div class="add-item">
                                                        <button type="button" class="btn btn-success btn-xs" v-on:click="addColor"><i class="fa fa-plus"></i> Agregar</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="size" v-model="includeSize" v-bind:checked="includeSize ? 'checked' : ''">
                                                <label class="form-check-label" for="size">Tamaño/Talla</label>
                                                <div class="config-collection">
                                                    <div class="config-item" v-for="(size, index) in Product_Configurations.size">
                                                        <input type="text" class="form-control" v-bind:value="size" v-model="Product_Configurations.size[index]">
                                                        <button type="button" class="btn btn-danger btn-xs" v-on:click="deleteSize(index)"><i class="fa fa-trash"></i></button>
                                                    </div>
                                                    <div class="add-item">
                                                        <button type="button" class="btn btn-success btn-xs" v-on:click="addSize"><i class="fa fa-plus"></i> Agregar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <label for="released" class="col-md-12 control-label">Disponible
                                            <input type="checkbox" class="form-control" id="released" 
                                                placeholder="Stock" v-model="Product_Released">
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label for="stock" class="col-md-12 control-label">Stock
                                            <input type="text" class="form-control" id="stock" 
                                                placeholder="Stock" v-model="Product_Stock">
                                        </label>
                                    </div>
                                    <div class="row form-group text-center">
                                        <input type="submit" class="btn btn-info" value="Guardar">
                                    </div>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" v-on:click="CloseModal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="galery-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" v-on:click="CloseGaleryModal">&times;</button>
                                <h4 class="modal-title">Editar Galería</h4>
                            </div>
                            <div class="modal-body">

                                <div class="contentcontainer" v-for="(GaleryImage, index) in Product_Galery_Images">
                                    <form class="editForm w100" v-on:submit.prevent="editGaleryImage(index)">
                                        <div>
                                            <div class="form-group col-md-12 text-center">
                                                <img v-bind:src="GaleryImage.Product_Galery_Image_Img" alt="">
                                            </div>
                                            <div class="form-group col-md-6 col-md-offset-3">
                                                <input v-on:change="onGaleryFileChange(event, index)" type="file" v-bind:id="'GaleryImage' + index" class="input-file" accept="image/x-png,image/jpeg">
                                                <label v-bind:for="'GaleryImage' + index" class="btn btn-tertiary js-labelFile">
                                                    <i class="icon fa fa-check"></i>
                                                    <span class="js-fileName">Selecciona un archivo</span>
                                                </label>
                                            </div>
                                            <div class="row form-group">
                                                <label for="order" class="col-md-12 control-label">Orden
                                                    <input required type="number" class="form-control" id="order" 
                                                        placeholder="Orden" v-model="GaleryImage.Product_Galery_Image_Order">
                                                </label>
                                            </div>
                                            <div class="form-group col-md-6 col-md-offset-3 text-center">
                                                <input type="submit" class="btn btn-info" value="Guardar">
                                                <button class="btn btn-danger" v-on:click="deleteGaleryImage(GaleryImage.Product_Galery_Image_Id)">Eliminar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <hr />

                                <div class="contentcontainer">
                                    <form class="editForm w100" v-on:submit.prevent="addGaleryImage">
                                        <div>
                                            <div class="form-group text-center">
                                                <h3>Nueva imagen</h3>
                                            </div>
                                            <div class="form-group col-md-6 col-md-offset-3 text-center">
                                                <img v-bind:src="newGalery" alt="">
                                            </div>
                                            <div class="form-group col-md-6 col-md-offset-3">
                                                <input required v-on:change="onGaleryFileChange(event)" type="file" id="newGalery" class="input-file" accept="image/x-png,image/jpeg">
                                                <label for="newGalery" class="btn btn-tertiary js-labelFile w100">
                                                    <i class="icon fa fa-check"></i>
                                                    <span class="js-fileName">Selecciona un archivo</span>
                                                </label>
                                            </div>
                                            <div class="row form-group">
                                                <label for="ordernew" class="col-md-12 control-label">Orden
                                                    <input required type="number" class="form-control" id="ordernew" 
                                                        placeholder="Orden" v-model="Product_Galery_Image_Order">
                                                </label>
                                            </div>
                                            <div class="form-group col-md-6 col-md-offset-3">
                                                <input type="submit" class="btn btn-success w100" value="Guardar">
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" v-on:click="CloseGaleryModal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        this.initUI();
    }
});

export default products;