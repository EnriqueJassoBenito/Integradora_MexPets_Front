<script>
new Vue({
  el: '#app',
  data: {
    username: '',
    password: '',
    isLoggedIn: false
  },
  methods: {
    login() {
      // Aquí podrías realizar una llamada a una API para autenticar al usuario
      // Simularemos una autenticación exitosa si el nombre de usuario y la contraseña no están vacíos
      if (this.username !== '' && this.password !== '') {
        this.isLoggedIn = true;
      } else {
        alert('Por favor ingresa un nombre de usuario y contraseña válidos');
      }
    },
    logout() {
      this.username = '';
      this.password = '';
      this.isLoggedIn = false;
    }
  }
});
</script>