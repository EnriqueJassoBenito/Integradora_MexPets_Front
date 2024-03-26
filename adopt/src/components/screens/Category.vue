<template>
    <div class="animal-cards">
        <div class="card">
            <h2>Perros</h2>
            <p>¡Encuentra tu compañero canino perfecto!</p>
            <img src="/src/assets/dog.jpg" alt="Perros">
            <router-link :to="{ name: 'dogs' }">Ver más</router-link>
        </div>
        <div class="card">
            <h2>Gatos</h2>
            <p>Descubre gatos adorables en busca de un hogar.</p>
            <img src="/src/assets/cat.webp" alt="Gatos">
            <router-link :to="{ name: 'cats' }">Ver más</router-link>
        </div>
        <div class="card">
            <h2>Conejos</h2>
            <p>Encuentra tu compañero conejito ideal.</p>
            <img src="/src/assets/cats.webp" alt="Gatos">
            <router-link :to="{ name: 'bunny' }">Ver más</router-link>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.animal-cards {
    display: flex;
    justify-content: space-around;
}

.card {
    margin-top: 20px;
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
}

.card img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.card h2 {
    margin-top: 0;
}

.card p {
    margin-bottom: 10px;
}
</style>
