var categories = Vue.component('categories', {
    props: {
        Categories: {
            default: [{}]
        },
        Category_Id: {
            default: 0
        },
        Category_Name: {
            default: ''
        }
    },
    methods: {
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
        editCategory: function (index) {
            $('#new-modal').modal('show');
            this.Category_Id = this.Categories[index].Category_Id;
            this.Category_Name = this.Categories[index].Category_Name;
        },
        addCategory: function () {
            console.log(this.Category_Id);
            
            showLoader();
            var Method = this.Category_Id === 0 ? 'AddCategory' : 'UpdateCategory';

            this.$http.post(APIUrl() + `AdminProduct/${Method}`, {
                Category_Id: this.Category_Id,
                Category_Name: this.Category_Name
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Categoría modificada correctamente');
                    this.CloseModal();
                    this.loadCategories();
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
        deleteCategory: function (index) {
            showLoader();
            this.$http.post(APIUrl() + 'AdminProduct/DeleteCategory', {
                Category_Id: this.Categories[index].Category_Id
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Categoría eliminada correctamente');
                    this.CloseModal();
                    this.loadCategories();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        CloseModal: function () {
            this.Category_Id = 0;
            this.Category_Name = '';
            $('#new-modal').modal('hide');
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Gategorías</h1>
                </div>

                <div class="container">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(category, index) in Categories">
                                    <td>{{ category.Category_Id }}</td>
                                    <td>{{ category.Category_Name }}</td>
                                    <td class="text-center w180p">
                                        <button type="button" class="btn btn-primary" v-on:click="editCategory(index)">Editar</button>
                                        <button type="button" class="btn btn-danger" v-on:click="deleteCategory(index)">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group col-md-6 col-md-offset-3">
                        <button type="button" class="btn btn-success w100" data-toggle="modal" data-target="#new-modal">Nueva Categoría</button>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close">&times;</button>
                                <h4 class="modal-title">Agregar/Editar Categoría</h4>
                            </div>
                            <div class="modal-body">

                                <form v-on:submit.prevent="addCategory">
                                    <input type="number" hidden v-model="Category_Id">
                                    <div class="row form-group">
                                        <label for="name" class="col-md-12 control-label">Nombre
                                            <input type="text" class="form-control" id="name" v-model="Category_Name" placeholder="Nombre">
                                        </label>
                                    </div>
                                    <div class="row form-group text-center">
                                        <input type="submit" class="btn btn-info" value="Guardar">
                                    </div>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        this.loadCategories();
    }
});

export default categories;