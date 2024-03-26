<template>
    <div class="cats-cards">
        <div class="card">
            <img src="/src/assets/cat.webp" alt="Gatos">
            <h2>Gatos</h2>
            <p>Descubre gatos adorables en busca de un hogar.</p>
            <router-link :to="{ name: 'cats' }">Ver más</router-link>
        </div>
        <div class="card">
            <img src="/src/assets/cat2.jpg" alt="Gatos">
            <h2>Gatos</h2>
            <p>Descubre gatos adorables en busca de un hogar.</p>
            <router-link :to="{ name: 'cats' }">Ver más</router-link>
        </div>
        <div class="card">
            <img src="/src/assets/cat3.jpg" alt="Gatos">
            <h2>Gatos</h2>
            <p>Descubre gatos adorables en busca de un hogar.</p>
            <router-link :to="{ name: 'cats' }">Ver más</router-link>
        </div>
        <div class="card">
            <img src="/src/assets/cat4.jpg" alt="Gatos">
            <h2>Gatos</h2>
            <p>Descubre gatos adorables en busca de un hogar.</p>
            <router-link :to="{ name: 'cats' }">Ver más</router-link>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.cats-cards {
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
