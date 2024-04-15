<template>
    <div class="container mt-4">
        <b-card title="Perfil de Usuario">
            <b-list-group flush>
                <b-list-group-item>
                    <strong>Nombre de Usuario:</strong> {{ user.nameUser }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Nombre:</strong> {{ user.name }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Apellido Paterno:</strong> {{ user.lastname }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Apellido Materno:</strong> {{ user.lastnameMatern }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Correo:</strong> {{ user.email }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Teléfono:</strong> {{ user.phoneNumber }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Ubicación:</strong> {{ user.location }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Rol:</strong> {{ user.rol }}
                </b-list-group-item>
                <b-list-group-item>
                    <strong>Estado:</strong> {{ user.status ? 'Activo' : 'Inactivo' }}
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                nameUser: "username123",
                name: "John",
                lastname: "Doe",
                lastnameMatern: "Smith",
                email: "johndoe@gmail.com",
                phoneNumber: "123-456-7890",
                location: "Ciudad, País",
                rol: "Usuario",
                status: true,
            }
        };
    }
};
</script>

<style>
</style>