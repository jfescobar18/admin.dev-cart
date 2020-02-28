var navbar = Vue.component('navbar', {
    methods: {
        logout: function () {
            this.$session.destroy();
            this.$router.push('/login');
        }
    },
    template: `
        <div id="nav" class="nav">
            <div class="icon">
                <ul>
                    <li><router-link to="/"><i class="fa fa-home"></i></router-link></li>
                    <li><router-link to="/slider"><i class="far fa-images"></i></router-link></li>
                    <li><router-link to="/aboutus"><i class="fas fa-users"></i></router-link></li>
                    <li><router-link to="/banner"><i class="fas fa-tag"></i></router-link></li>
                    <li><router-link to="/categories"><i class="fas fa-list-ul"></i></router-link></li>
                    <li><router-link to="/products"><i class="fas fa-shopping-cart"></i></router-link></li>
                    <li><router-link to="/orders"><i class="fas fa-boxes"></i></router-link></li>
                    <li><router-link to="/config"><i class="fas fa-cog"></i></router-link></li>
                    <li><a href="#" v-on:click="logout"><i class="fas fa-power-off"></i></a></li>
            
                </ul>
            </div>
            <div class="text">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/slider">Slider</router-link></li>
                    <li><router-link to="/aboutus">About Us</router-link></li>
                    <li><router-link to="/banner">Banner Ofertas</router-link></li>
                    <li><router-link to="/categories">Categorías</router-link></li>
                    <li><router-link to="/products">Productos</router-link></li>
                    <li><router-link to="/orders">Órdenes</router-link></li>
                    <li><router-link to="/config">Configuración</router-link></li>
                    <li><a href="#" v-on:click="logout">Salir</a></li>
                </ul>
            </div>
        </div>
    `
});

export default navbar;