<template>
  <b-container fluid>
    <b-row>
      <div class="gridCard">
        <b-breadcrumb :items="items"></b-breadcrumb>
        <b-card bg-variant="light">
          <div class="contentCenter">
            <img src="../components/icons/BrownLogo.png" id="iconLogin" class="iconLogo my-2" width="20%">
          </div>
          <div class="contentCenter">
            <h4>¡Bienvenido a Mexpet!</h4>
            <p class="my-2">Utiliza tu cuenta para iniciar sesión</p>
          </div>
          <div>
            <b-form @submit="onSubmit">
              <b-form-group>
                <h6 class="mt-4">Correo electrónico</h6>
                <b-form-input id="inputEmail" class="inputLogin" v-model="email" type="email"
                  placeholder="perritos@mexpet.com" required>
                </b-form-input>
              </b-form-group>
              <b-form-group>
                <h6 class="mt-4">Contraseña</h6>
                <b-form-input id="inputPassword" v-model="password" type="password" placeholder="************" required>
                </b-form-input>
              </b-form-group>
            </b-form>
          </div>
          <div class="contentCenter">
            <b-button class="my-4 btnLogin" href="#" variant="success" @click="onSubmit">Iniciar
              Sesión</b-button>
          </div>
          <!--
            <div
      ref="container"
      class="frc-captcha"
      data-sitekey="FCMVRR8LOPON8OO3"
      data-lang="es"
    ></div>
          -->
          <div class="contentCenter">
            <b-link href="#foo">¿Olvidaste tu contraseña?</b-link>
          </div>
          <div class="slider-container">
            <div class="lineL my-4"></div>
            <div class="my-4">o</div>
            <div class="lineR my-4"></div>
          </div>
          <div class="contentCenter">
            <p>¿No tienes cuenta? <b-link :to="{ name: 'register' }">Crear una cuenta</b-link></p>
          </div>
        </b-card>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
  this.$router.push({ name: 'landing' });
}

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      error_msg: "",
      items: [
        {
          text: 'Home',
          href: '',
          to: 'landing'
        },
        {
          text: 'Iniciar Sesión',
          href: '#',
          to: 'Login'
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      axios.post('auth/login', {
        "email": this.email,
        "password": this.password
      }).then(({ data: { data: { user, token } } }) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));

        const decodedToken = jwtDecode(token);
        const userRole = user && user.user ? user.user.rol.nrol : null;
        console.log(JSON.stringify(userRole));

        switch (userRole) {
          case 'ADMIN':
            this.$router.push('/admin');
            break;
          case 'CLIENTE':
            this.$router.push('/client');
            break;
          case 'MODERADOR':
            this.$router.push('/moderator');
            break;
          default:
            this.$router.push('/landing');
        }
      }).catch(e => {
        console.log(e);
        this.error = true;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Usuario y/o contraseña incorrectos'
        });
      });
    }
  }
}
</script>


<style>
@media (min-width: 1024px) {
  .gridCard {
    width: 30%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.contentCenter {
  text-align: center;
}

.btnLogin {
  width: 50%
}

.slider-container {
  display: flex;
  align-items: center;
}

.lineL {
  height: 1px;
  background-color: #000000;
  flex-grow: 1;
  margin-left: 10%;
  margin-right: 2%;
}

.lineR {
  height: 1px;
  background-color: #000000;
  flex-grow: 1;
  margin-right: 10%;
  margin-left: 2%;

}
</style>