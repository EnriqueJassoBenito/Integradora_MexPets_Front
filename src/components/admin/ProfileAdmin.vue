<template>
  <div class="background">
    <div class="admin-profile">
        <div class="status">
  <div
    class="status-indicator"
    :class="{
      active: currentUser && currentUser.user && currentUser.user.status,
            inactive: currentUser && currentUser.user && !currentUser.user.status,
    }"
  ></div>
  <span>{{ currentUser && currentUser.user && currentUser.user.status ? "Activo" : "Inactivo" }}</span>
</div>
      <div class="avatar-and-title">
        <div class="row">
          <b-avatar size="120px" style="margin-left: 15px;"></b-avatar>
          <h2 style="margin: 15px; margin-top:40px">Administrador</h2>
        </div>

      </div>
      <div class="centered-content">
        <h5>Información personal</h5>
        </div>
        <hr>
      <div v-if="currentUser" class="profile-details">
        <b-row>
          <b-col cols="4">
            <div class="form-group">
              <label for="nameUser">Nombre de usuario:</label>
              <input
                type="text"
                class="form-control"
                id="nameUser"
                v-model="currentUser.user.nameUser"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="currentUser.user.name"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="lastname">Apellido:</label>
              <input
                type="text"
                class="form-control"
                id="lastname"
                v-model="currentUser.user.lastname"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
            <div class="form-group">
              <label for="lastnameMatern">Apellido materno:</label>
              <input
                type="text"
                class="form-control"
                id="lastnameMatern"
                v-model="currentUser.user.lastnameMatern"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="email">Correo electrónico:</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="currentUser.user.email"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="phoneNumber">Teléfono:</label>
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                v-model="currentUser.user.phoneNumber"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
            <div class="form-group">
              <label for="localitation">Localización:</label>
              <input
                type="text"
                class="form-control"
                id="localitation"
                v-model="currentUser.user.localitation"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="password">Contraseña:</label>
              <input
                type="text"
                class="form-control"
                id="password"
                placeholder="***********"
                v-model="currentUser.user.password"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group">
              <label for="password">Confrirmar Contraseña:</label>
              <input
                type="text"
                class="form-control"
                id="password"
                placeholder="***********"
                :disabled="!isEditing"
              />
            </div>
          </b-col>
      <hr>
        </b-row>
        <b-button v-if="!isEditing" variant="warning" @click="startEditing">Editar</b-button>
        <b-button v-else variant="primary" @click="saveChanges">Guardar</b-button>
      </div>
      <div v-else>
        <p>No se encontró información del usuario.</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import service from '../../service/UsersService';
  import Swal from 'sweetalert2';
  import rol from '../../service/RolService';

export default {
  data() {
    return {
      currentUser: null,
      isEditing: false,
      isEditing: false
    };
  },
  mounted() {
    this.fetchCurrentUser();
    this.fetchCurrentUser();

  },
  methods: {
    async fetchCurrentUser() {
    const userData = localStorage.getItem("authUser");
    if (userData) {
      const currentUserData = JSON.parse(userData);
      if (currentUserData.user.rol && currentUserData.user.rol.nrol === "ADMIN") {
        this.currentUser = currentUserData;
      } else {
        console.error("El usuario no tiene permiso para acceder a esta página.");
        this.$router.push({ name: 'landing' });
      }
    }
  },
    startEditing() {
      this.isEditing = true;
    },
    async saveChanges() {
  try {    
    const roles = await rol.getAllRol();
    const adminRol = roles.find(rol => rol.nrol === "ADMIN");


    const updatedUser = { ...this.currentUser.user };
    updatedUser.rol = {
      idRol: adminRol.idRol,
      nrol: "ADMIN",
      status: true 
    };

    const response = await service.updateUser(this.currentUser.user.id, updatedUser);
    console.log(response);
    
    this.isEditing = false;

    Swal.fire({
      icon: 'success',
      title: '¡Actualizado correctamente!',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Error al guardar los cambios:', error);
    
    Swal.fire({
      icon: 'error',
      title: '¡Error al guardar los cambios!',
      text: 'Hubo un problema al intentar actualizar. Por favor, inténtalo de nuevo más tarde.',
      confirmButtonText: 'Aceptar'
    });

    this.$router.push({ name: 'landing' });
  }
}
  },
};
</script>
  
  <style scoped>
.background {
  background-color: #f5f5f5;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-profile {
  margin-top: 20px;
  width: 1200px !important;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.avatar-and-title {
  display: flex;
  align-items: center;
}

.avatar-and-title b-avatar {
  margin-right: 20px;
}

.centered-content {
  text-align: center;
}
.status {
  position: absolute;
  right: 100px;
}
.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.active {
  background-color: green;
}

.inactive {
  background-color: gray;
}
</style>
  