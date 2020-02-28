const orders = Vue.component('orders', {
    props: {
        Orders: {
            default: [{}]
        },
        'Order_Id': {
            default: ''
        },
        'ClientEmail': {
            default: ''
        },
        'TrackingId': {
            default: ''
        },
        'ShippingService': {
            default: ''
        },
    },
    methods: {
        loadOrders: function () {
            showLoader();
            this.$http.get(APIUrl() + 'AdminProduct/GetOders', {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    console.log(response.body);
                    
                    this.Orders = response.body;

                    for (let i = 0; i < this.Orders.length; i++) {
                        this.Orders[i].Order_Description = this.formatCart(this.Orders[i].Cart_Json_Config);
                    }

                    hideLoader();
                },
                err => {
                    console.log(err);
                    hideLoader();
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                }
            );
        },
        formatCart: function (Cart_Json_Config) {
            Cart_Json_Config = JSON.parse(Cart_Json_Config);

            var formatedCart = '';
            for (let i = 0; i < Cart_Json_Config.length; i++) {
                formatedCart += 'Artículo: ' + Cart_Json_Config[i].Product_Name + '<br />';
                formatedCart += Cart_Json_Config[i].Color.length > 0 ? `Color: <i style="border: solid #bababa 1px; color: #${Cart_Json_Config[i].Color}" class="fa fa-square"></i><br />` : '';
                formatedCart += Cart_Json_Config[i].Size.length > 0 ? 'Tamaño/Talla: ' + Cart_Json_Config[i].Size + '<br />' : '';
                formatedCart += '<hr />'
            }
            return formatedCart;
        },
        sendTrackingIdModal: function (Email, OrderId) {
            this.Order_Id = OrderId;
            this.ClientEmail = Email;
            $('#new-modal').modal('show');
        },
        sendTrackingId: function () {
            showLoader();
            this.$http.post(APIUrl() + 'AdminProduct/SendTrackingId', {
                Order_Id: this.Order_Id,
                ClientEmail: this.ClientEmail,
                TrackingId: this.TrackingId,
                ShippingService: this.ShippingService
            }, {
                headers: {
                    APIKey: window.config.APIKey
                }
            }).then(
                response => {
                    this.loadOrders();
                    succes_swal('¡Éxito!', 'Número de guía enviado correctamente');
                    hideLoader();
                    this.CloseModal();
                },
                err => {
                    console.log(err);
                    hideLoader();
                    this.CloseModal();
                    error_swal('Error...', 'Error interno estamos trabajando para solucionarlo');
                }
            );
        },
        CloseModal: function () {
            $('#new-modal').modal('hide');
            this.Order_Id = '';
            this.ClientEmail = '';
            this.TrackingId = '';
            this.ShippingService = '';
        }
    },
    template: `
        <div>
            <navbar></navbar>
            
            <div class="scrollcontent">
                <div class="title text-center">
                    <h1>Órdenes</h1>
                </div>

                <div class="container">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Pedido</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>Dirección 2</th>
                                    <th>Estado</th>
                                    <th>Municipio</th>
                                    <th>Código Postal</th>
                                    <th class="comments">Comentarios</th>
                                    <th>Fecha de órden</th>
                                    <th>OpenpayId</th>
                                    <th>Status de Pago</th>
                                    <th>Número de Guía</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in Orders">
                                    <td v-html="order.Order_Description"></td>
                                    <td>{{ order.Order_Client_Name }}</td>
                                    <td>{{ order.Order_Client_Email }}</td>
                                    <td>{{ order.Order_Client_Phone }}</td>
                                    <td>{{ order.Order_Client_Address1 }}</td>
                                    <td>{{ order.Order_Client_Address2 }}</td>
                                    <td>{{ order.Order_Client_Province }}</td>
                                    <td>{{ order.Order_Client_City }}</td>
                                    <td>{{ order.Order_Client_Zip }}</td>
                                    <td class="comments">{{ order.Order_Client_Comments }}</td>
                                    <td>{{ order.Order_Creation_Date }}</td>
                                    <td>{{ order.Order_Openpay_ChargeId }}</td>
                                    <td>{{ order.Order_Payment_Status }}</td>
                                    <td>
                                        <button v-if="order.Order_Payment_Status === 'completed' && order.Order_Tracking_Id.length === 0" type="button" class="btn btn-success" v-on:click="sendTrackingIdModal(order.Order_Client_Email, order.Order_Id)">Enviar</button>
                                        <span v-else>{{ order.Order_Tracking_Id }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="new-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" v-on:click="CloseModal">&times;</button>
                                <h4 class="modal-title">Enviar número de guía</h4>
                            </div>
                            <div class="modal-body">

                                <form v-on:submit.prevent="sendTrackingId">
                                    <div class="row form-group">
                                        <label for="trackingId" class="col-md-12 control-label">Número de guía
                                                <input required type="text" class="form-control" id="trackingId" 
                                                    placeholder="Número de guía" v-model="TrackingId">
                                            </label>
                                    </div>
                                    <div class="row form-group">
                                        <label for="shippingService" class="col-md-12 control-label">Servicio de paquetería
                                                <input required type="text" class="form-control" id="shippingService" 
                                                    placeholder="Servicio de paquetería" v-model="ShippingService" list="services">
                                                <datalist id="services">
                                                    <option value="FedEx">
                                                    <option value="Estafeta">
                                                </datalist>
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
            </div>
        </div>
    `,
    mounted: function () {
        this.loadOrders();
    }
});

export default orders;