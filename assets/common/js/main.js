import router from './vue/router/routes.js'
import VueSession from './vue/modules/vue-session.js'

Vue.use(VueSession);

const app = new Vue({
    el: '#app',
    router,
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/login');
        }
    },
    beforeUpdate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/login');
        }
    }
});