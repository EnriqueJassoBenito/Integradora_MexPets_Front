<template>
  <b-container fluid>
    <b-row class="justify-content-center align-items-center h-100">
      <b-col cols="12" md="8" lg="6" xl="4">
        <div class="gridCard">
          <b-breadcrumb :items="items" class="breadCrumbContainer"></b-breadcrumb>
          <b-card bg-variant="light">
            <div class="contentCenter">
              <img src="../icons/BrownLogo.png" id="iconLogin" class="iconLogo my-2" width="20%">
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
                  <b-input-group>
                    <b-form-input v-model="password" :type="showPassword ? 'text' : 'password'"
                      placeholder="************" required></b-form-input>
                    <b-input-group-append>
                      <b-button @click="togglePassword" variant="outline-secondary">
                        <b-icon :icon="showPassword ? 'eye-slash' : 'eye'" aria-hidden="true"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-form>
              <div ref="container" class="frc-captcha" data-sitekey="FCMVRR8LOPON8OO3" data-lang="es"></div>
            </div>
            <div class="contentCenter">
              <b-button class="my-4 btnLogin" href="#" variant="success" @click="onSubmit">Iniciar
                Sesión</b-button>
            </div>
            <div class="contentCenter">
              <b-link :to="{ name: 'forgot-password' }">¿Olvidaste tu contraseña?</b-link>
            </div>
            <div class="slider-container">
              <div class="lineL my-4"></div>
              <div class="my-2">o</div>
              <div class="lineR my-4"></div>
            </div>
            <div class="contentCenter">
              <p>¿No tienes cuenta? <b-link :to="{ name: 'register' }">Crear una cuenta</b-link></p>
            </div>
          </b-card>
        </div>
      </b-col>


    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import CaptchaService from '../../service/CaptchaService'
import Swal from 'sweetalert2';
import { WidgetInstance } from "friendly-challenge";
import { ref } from "vue";
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
      ],
      showPassword: false,
      container: ref(),
      widget: ref(),
      formData: {
        name: ""
      },
    }
  },
  methods: {
    onSubmit() {
      if (!this.email || !this.password) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Debes llenar todos los campos antes de iniciar sesión',
          confirmButtonColor: '#0066C5',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
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
    },
    checkAuthentication() {
        const usuarioAlmacenado = localStorage.getItem("authUser");
        console.log(usuarioAlmacenado);
        if (usuarioAlmacenado) {
            console.log("Usuario almacenado en localStorage.");
            this.$router.push({ name: 'landing' });
        }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async verifyCaptcha(solution) {
      let response = await CaptchaService.verifyCaptcha(solution);
      this.captchaVerified = response.success;
    },
    doneCallback(solution) {
      this.verifyCaptcha(solution);
    },

    errorCallback: (err) => {
      console.log("There was an error when trying to solve the Captcha.");
      console.log(err);
    },
  },
  mounted() {
    this.checkAuthentication();
    if (this.$refs.container) {
      this.widget = new WidgetInstance(
        this.$refs.container, {
        startMode: "",
        doneCallback: this.doneCallback,
        errorCallback: this.errorCallback,
        
      }
      );
    }
  },
  beforeDestroy() {
    if (this.widget) {
      this.widget.destroy();
    }
  },
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