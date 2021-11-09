var coupons = Vue.component('coupons', {
    data: function () {
        return {
            Coupons: [],
            Rules: [],
            Coupon_Code: '',
            Coupon_Amount: '',
            Coupon_Discount: '',
            Coupon_Creation_Date: '',
            Coupon_Expiration_Date: '',
            Coupon_Use_Date: '',
            Specific_Rule_Json_Config: {
                useSpecificRules: false,
                useServiceRule: true,
                useBankRule: false,
                Specific_Rule_Id: 0,
                Options: {
                    Minimum_Amount: null,
                    Product_Id: null,
                    Payment_Type: 1,
                    Payment_Service_Type: null,
                    Bank_Id: null
                }
            },
            Products: [],
            Banks: [],
            disableAmount: false,
            disableDiscount: false
        }
    },
    methods: {
        loadCoupons: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminCoupon/GetCoupons', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Coupons = response.body;
                    this.loadRules();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        addCoupon: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminCoupon/AddCoupon', {
                Coupon_Code: this.Coupon_Code,
                Coupon_Amount: this.Coupon_Amount,
                Coupon_Discount: this.Coupon_Discount,
                Coupon_Creation_Date: this.Coupon_Creation_Date,
                Coupon_Expiration_Date: this.Coupon_Expiration_Date,
                Specific_Rule_Json_Config: JSON.stringify(this.Specific_Rule_Json_Config)
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    succes_swal('¡Éxito!', 'Cupón guardado correctamente');
                    this.loadCoupons();
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        loadRules: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminCoupon/GetCouponRules', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Rules = response.body;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        getRandomCode: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminCoupon/GetRandomCoupon', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.Coupon_Code = response.body.CouponCode;
                    hideLoader();
                },
                err => {
                    console.log(err);
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                    hideLoader();
                }
            );
        },
        checkSpecificRuleData: function () {
            switch (this.Specific_Rule_Json_Config.Specific_Rule_Id) {
                case 1:
                    break;
                case 2:
                    this.loadProducts();
                    break;
                case 3:
                    break;
            }
        },
        loadProducts: function () {
            if (this.Products.length === 0) {
                showLoader();
                this.$http.get(APIUrl() + 'AdminProduct/GetProducts', {
                    headers: {
                        APIKey: window.config.APIKey
                    }
                }).then(
                    response => {
                        if (response.body.length > 0) {
                            this.Products = response.body.map(function (x) {
                                return { id: x.Product_Price, name: x.Product_Name }
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
            }
        },
        loadBanks: function () {
            if (this.Banks.length === 0) {
                showLoader();
                this.$http.get(APIUrl() + 'AdminCoupon/GetBanks', {
                    headers: {
                        APIKey: window.config.APIKey
                    }
                }).then(
                    response => {
                        if (response.body.length > 0) {
                            this.Banks = response.body.map(function (x) {
                                return { id: x.Bank_Id, name: x.Bank_Name }
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
            }
        },
        selectProduct: function () {
            this.Specific_Rule_Json_Config.Options.Product_Id = e.id;
        },
        selectBank: function (e) {
            this.Specific_Rule_Json_Config.Options.Bank_Id = e.id;
        },
        onlyNumbers: function ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot

                $event.preventDefault();
            }
        },
        formatPrice: function ($event) {
            var price = $event.target.value.replace('$', '').replace(',', '');
            switch ($event.target.id) {
                case 'amount':
                    this.Coupon_Amount = formatMoney(price);
                    this.switchAmountDiscount();
                    break;
                case 'rule-amount':
                    this.Specific_Rule_Json_Config.Options.Minimum_Amount = formatMoney(price);
                    break;
            }
        },
        switchAmountDiscount: function () {
            if (this.Coupon_Amount !== '$0.00') {
                this.disableDiscount = true;
            }
            else {
                this.disableDiscount = false;
            }
        },
        formatDiscount: function () {
            this.Coupon_Discount = this.Coupon_Discount.replace('%', '');
            this.Coupon_Discount += '%';

            if (this.Coupon_Discount.length > 1) {
                this.disableAmount = true;
            }
            else {
                this.disableAmount = false;
            }
        },
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Cupones</h1>
                </div>

                <div class="container">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Código</th>
                                    <th>Monto</th>
                                    <th>Descuento</th>
                                    <th>Fecha de Creación</th>
                                    <th>Expiración</th>
                                    <th>Estatus</th>
                                    <th>Fecha de Uso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(coupon, index) in Coupons">
                                    <td>{{ coupon.Coupon_Id }}</td>
                                    <td>{{ coupon.Coupon_Code }}</td>
                                    <td>{{ coupon.Coupon_Amount }}</td>
                                    <td>{{ coupon.Coupon_Discount }}</td>
                                    <td>{{ coupon.Coupon_Creation_Date }}</td>
                                    <td>{{ coupon.Coupon_Expiration_Date }}</td>
                                    <td>{{ coupon.Coupon_Status }}</td>
                                    <td>{{ coupon.Coupon_Use_Date }}</td>
                                    <td class="text-center w180p">
                                        <button type="button" class="btn btn-primary">Editar</button>
                                        <button type="button" class="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group col-md-6 col-md-offset-3">
                        <button type="button" class="btn btn-success w100" data-toggle="modal" data-target="#new-modal">Nuevo Cupón</button>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close">&times;</button>
                                <h4 class="modal-title">Agregar/Editar Cupón</h4>
                            </div>
                            <div class="modal-body">

                                <form v-on:submit.prevent="addCoupon">
                                    <input type="number" hidden>
                                    <div class="row form-group">
                                        <label for="code" class="col-md-10 control-label">Código
                                            <input required type="text" class="form-control" id="code" placeholder="Código" v-model="Coupon_Code" maxlength="8" />
                                        </label>
                                        <div class="col-md-2">
                                            <br />
                                            <button type="button" class="btn btn-sm btn-success form-control" v-on:click="getRandomCode"><i class="fas fa-random"></i></button>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <label for="amount" class="col-md-6 control-label">Monto
                                            <input type="text" class="form-control" id="amount" placeholder="$" v-model="Coupon_Amount" v-on:change="formatPrice" v-on:keypress="onlyNumbers" v-bind:disabled="disableAmount" />
                                        </label>
                                        <label for="discount" class="col-md-6 control-label">Descuento
                                            <input type="text" class="form-control" id="discount" placeholder="%" v-model="Coupon_Discount" v-on:change="formatDiscount" v-on:keypress="onlyNumbers" v-bind:disabled="disableDiscount" />
                                        </label>
                                    </div>
                                    <div class="row form-group">
                                        <label for="expiration" class="col-md-6 control-label">Fecha de Expiración
                                            <input required type="date" class="form-control" id="expiration" v-model="Coupon_Expiration_Date" />
                                        </label>
                                    </div>
                                    <hr />
                                    <div class="row form-group">
                                        <label for="rules" class="col-md-4 control-label">Reglas específicas
                                            <div class="checkbox checkbox-slider">
                                                <label>
                                                    <input id="rules" type="checkbox" v-model="Specific_Rule_Json_Config.useSpecificRules" /><span></span>
                                                </label>
                                            </div>
                                        </label>
                                    </div>
                                    <div v-if="Specific_Rule_Json_Config.useSpecificRules">
                                        <div class="row form-group">
                                            <label for="rule" class="col-md-6 control-label">Regla
                                                <select id="rule" class="form-control" v-model="Specific_Rule_Json_Config.Specific_Rule_Id" v-on:change="checkSpecificRuleData">
                                                    <option value="0" selected disabled>Elige una opción</option>
                                                    <option v-for="rule in Rules" v-bind:value="rule.Specific_Rule_Id">{{ rule.Specific_Rule_Name }}</option>
                                                </select>
                                            </label>
                                        </div>

                                        <div class="row form-group" v-if="Specific_Rule_Json_Config.Specific_Rule_Id === 1">
                                            <label for="rule-amount" class="col-md-6 control-label">Monto mínimo
                                                <input type="text" class="form-control" id="rule-amount" placeholder="$" v-model="Specific_Rule_Json_Config.Options.Minimum_Amount" v-on:change="formatPrice" v-on:keypress="onlyNumbers" />
                                            </label>
                                        </div>

                                        <div class="row form-group" v-else-if="Specific_Rule_Json_Config.Specific_Rule_Id === 2">
                                            <label for="rule-product" class="col-md-6 control-label">Producto
                                                <Dropdown
                                                    :options="Products"
                                                    v-on:selected="selectProduct"
                                                    :maxItem="5"
                                                    placeholder="Elige una opción">
                                                </Dropdown>
                                            </label>
                                        </div>

                                        <div class="row form-group" v-else-if="Specific_Rule_Json_Config.Specific_Rule_Id === 3">
                                            <div class="col-md-3">
                                                <div class="checkbox checkbox-slider checkbox-slider-sm">
                                                    <label>
                                                        <input type="checkbox" v-model="Specific_Rule_Json_Config.useServiceRule" /><span>Servicio</span>
                                                    </label>
                                                </div>
                                                <div class="checkbox checkbox-slider checkbox-slider-sm">
                                                    <label>
                                                        <input type="checkbox" v-model="Specific_Rule_Json_Config.useBankRule" /><span>Banco</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-md-offset-3" v-if="Specific_Rule_Json_Config.Options.Payment_Type === 1">
                                                <label for="bank-service" class="col-md-12 control-label">Servicio
                                                    <select id="bank-service" class="form-control">
                                                        <option selected disabled>Elige una opción</option>
                                                        <option value="1">Visa</option>
                                                        <option value="2">Mastercard</option>
                                                        <option value="3">American Express</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <div class="col-md-6 col-md-offset-3" v-else>
                                                <label for="bank-service" class="col-md-12 control-label">Banco
                                                    <Dropdown
                                                        :options="Banks"
                                                        v-on:selected="selectBank"
                                                        :maxItem="5"
                                                        placeholder="Elige una opción">
                                                    </Dropdown>
                                                </label>
                                            </div>
                                        </div>
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
    created: function () {
        this.loadCoupons();
    },
    watch: {
        'Specific_Rule_Json_Config.useServiceRule': function (val) {
            this.Specific_Rule_Json_Config.useBankRule = !val;
            this.Specific_Rule_Json_Config.Options.Payment_Type = val ? 1 : 2;
        },
        'Specific_Rule_Json_Config.useBankRule': function (val) {
            this.Specific_Rule_Json_Config.useServiceRule = !val;
            if (val) {
                this.loadBanks();
                this.Specific_Rule_Json_Config.Options.Payment_Type = 2;
            }
            else {
                this.Specific_Rule_Json_Config.Options.Payment_Type = 1;
            }
        }
    }
})

export default coupons;