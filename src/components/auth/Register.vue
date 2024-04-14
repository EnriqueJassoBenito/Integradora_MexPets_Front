<template>
  <b-container fluid>
    <div class="content">
      <div class="contentCard">
        <b-breadcrumb :items="items"></b-breadcrumb>
        <b-card bg-variant="light">
          <div class="contentCenter">
            <h4>¡Crea una nueva cuenta!</h4>
            <p class="my-2">
              Los datos marcados con (<span class="obligationText">*</span>) son
              obligatorios.
            </p>
          </div>
          <div>
            <b-form @submit.prevent="onSubmit">
              <div>
                <b-row>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Nombre <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="name"
                        type="text"
                        placeholder="Nombre(s)"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Apellido Paterno <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="lastName"
                        type="text"
                        placeholder="Apellido Paterno"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Apellido Materno <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="lastnameMatern"
                        type="text"
                        placeholder="Apellido Materno"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Teléfono <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="phone"
                        type="tel"
                        placeholder="7771234567"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Estado <span class="obligationText">*</span>
                      </h6>
                      <b-form-select
                        v-model="selected"
                        :options="options"
                        required
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Nombre de usuario <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="userName"
                        type="text"
                        placeholder="Nombre de usuario"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Correo Electrónico <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="email"
                        type="email"
                        placeholder="correo@example.com"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Contraseña <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="password"
                        type="password"
                        placeholder="***********"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Confirmar contraseña
                        <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="confirmPassword"
                        type="password"
                        placeholder="***********"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </div>
          <div class="contentCenter">
            <b-button
              class="mt-4 btnLogin"
              href="#"
              variant="success"
              @click="onSubmit"
              >Registrarse</b-button
            >
          </div>
          <div class="slider-container">
            <div class="lineL my-4"></div>
            <div class="my-4">o</div>
            <div class="lineR my-4"></div>
          </div>
          <div class="contentCenter">
            <p>
              ¿Ya tienes una cuenta?
              <b-link :to="{ name: 'login' }">Iniciar Sesión</b-link>
            </p>
          </div>
          <div>
            <b-alert show variant="danger" v-if="error">{{
              error_msg
            }}</b-alert>
          </div>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import service from '../../service/UsersService';
import rol from '../../service/RolService';

export default {
  data() {
    return {
    service: service,
      error: false,
      error_msg: "",
      name: "",
      lastName: "",
      phone: "",
      selected: null,
      userName: "",
      password: "",
      confirmPassword: "",
      lastnameMatern: "",
      email:"",
      options: [
        { value: null, text: "Selecciona un Estado" },
        { value: "Aguascalientes", text: "Aguascalientes" },
        { value: "Baja California", text: "Baja California" },
        { value: "Baja California Sur", text: "Baja California Sur" },
        { value: "Campeche", text: "Campeche" },
        { value: "Chiapas", text: "Chiapas" },
        { value: "Chihuahua", text: "Chihuahua" },
        { value: "Ciudad de México", text: "Ciudad de México" },
        { value: "Coahuila", text: "Coahuila" },
        { value: "Colima", text: "Colima" },
        { value: "Durango", text: "Durango" },
        { value: "Estado de México", text: "Estado de México" },
        { value: "Guanajuato", text: "Guanajuato" },
        { value: "Guerrero", text: "Guerrero" },
        { value: "Hidalgo", text: "Hidalgo" },
        { value: "Jalisco", text: "Jalisco" },
        { value: "Michoacán", text: "Michoacán" },
        { value: "Morelos", text: "Morelos" },
        { value: "Nayarit", text: "Nayarit" },
        { value: "Nuevo León", text: "Nuevo León" },
        { value: "Oaxaca", text: "Oaxaca" },
        { value: "Puebla", text: "Puebla" },
        { value: "Querétaro", text: "Querétaro" },
        { value: "Quintana Roo", text: "Quintana Roo" },
        { value: "San Luis Potosí", text: "San Luis Potosí" },
        { value: "Sinaloa", text: "Sinaloa" },
        { value: "Sonora", text: "Sonora" },
        { value: "Tabasco", text: "Tabasco" },
        { value: "Tamaulipas", text: "Tamaulipas" },
        { value: "Tlaxcala", text: "Tlaxcala" },
        { value: "Veracruz", text: "Veracruz" },
        { value: "Yucatán", text: "Yucatán" },
        { value: "Zacatecas", text: "Zacatecas" },
      ],
      items: [
        {
          text: "Home",
          href: "",
          to: "landing",
        },
        { text: "Registrarse", href: "#", to: "register" },
      ],
    };
  },
  methods: {
    async onSubmit() {
  if (!this.validateForm()) {
    this.error = true;
    this.error_msg = "¡Debes completar todos los campos correctamente!";
    return;
  }
  
  try {
    const roles = await rol.getAllRol();
    console.log("Roles obtenidos:", roles);

    const clienteRol = roles.find(rol => rol.nrol === "CLIENTE");

    if (!clienteRol) {
      throw new Error("No se encontró el rol de cliente.");
    }

    const formData = {
      nameUser: this.userName,
      name: this.name,
      lastname: this.lastName,
      lastnameMatern: this.lastnameMatern,
      email: this.email,
      phoneNumber: this.phone,
      localitation: this.selected,
      password: this.password,
      rol: {
        id: clienteRol.idRol,
        nrol: clienteRol.nrol,
      },
      status: true,
    };

    const response = await this.service.insertUser(formData);
    console.log("Respuesta del servidor:", response);
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    this.error = true;
    this.error_msg = "¡Hubo un error al registrar el usuario!";
  }
},
    validateForm() {
      return (
        this.name.trim() !== "" &&
        this.lastName.trim() !== "" &&
        this.phone.trim() !== "" &&
        this.selected !== null &&
        this.userName.trim() !== "" &&
        this.password.trim() !== "" &&
        this.confirmPassword.trim() !== "" &&
        this.password === this.confirmPassword
      );
    },
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.contentCenter {
  text-align: center;
}
.btnLogin {
  width: 50%;
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
.obligationText {
  color: #ff0000;
  font-weight: bold;
}
</style>