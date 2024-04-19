<template>
  <div class="d-flex justify-content-center mt-4">
    <div class="puppy-care">
    <h2>Cuidados para tu Cachorro</h2>
    <div >
      <li v-for="(care, index) in puppyCareList" :key="index">
        <span class="care-title">{{ care.title }}</span>
        <p>{{ care.description }}</p>
      </li>
    </div>
  </div>
  <div class="dog-care">
    <h2>Cuidados para tu Perro Adulto Joven en Adelante</h2>
    <div>
      <li v-for="(care, index) in dogCareList" :key="index">
        <span class="care-title">{{ care.title }}</span>
        <p>{{ care.description }}</p>
      </li>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      puppyCareList: [
        {
          title: "Collar ligero de lona sín ganchos",
          description: "Cambiar conforme va creciendo con plaquita de identificación: nombre, dirección y teléfono, y/o chip-tatuaje.",
        },
        {
          title: "Desparasitar",
          description: "Hacerlo recién llegado y cada 6 meses aproximadamente.",
        },
        {
          title: "Tener agua limpia disponible siempre",
          description: "24 horas al día.",
        },
        {
          title: "Vacunarlo",
          description: "No pasearlo en áreas públicas hasta terminar con todas las vacunas. Después del año, la séxtuple cada siguiente.",
        },
        {
          title: "Esterilización",
          description: "Fundamental por seguridad y responsabilidad. No hacerlo hasta pasar 15 días después de su última vacuna. Después de los 6 meses de edad.",
        },
        {
          title: "Comer",
          description: "Cuatro veces al día o más.",
        },
        {
          title: "Baño",
          description: "Como máximo 1 vez cada 2 semanas (a no ser que sea necesario). Sugerencia: jabón de avena 'grisi' o shampoo Epi Sooth.",
        },
        {
          title: "Juguetes",
          description: "Destinar en un lugar especial, limpiar, guardar y cambiar. (trapos, cuerdas, mordederas, pelotas rellenables 'Kongs', carnaza, etc).",
        },
        {
          title: "Separar áreas",
          description: "Comer, dormir y hacer.",
        },
        {
          title: "No golpes",
          description: "Aprenden asociando ideas y con palabras como '¡No!' o '¡Bien!' y cambio en nuestra actitud.",
        },
        {
          title: "Recompensas y cariños",
          description: "Como premios.",
        },
      ],
      dogCareList: [
        {
          title: "Collar ligero de lona sin ganchos",
          description: "Cambiar conforme va creciendo con plaquita de identificación: nombre, dirección y teléfono, y/o chip-tatuaje.",
        },
        {
          title: "Desparasitar",
          description: "Hacerlo recién llegado y cada 6 meses aproximadamente.",
        },
        {
          title: "Vacunar",
          description: "La séxtuple cada año y todas las siguientes.",
        },
        {
          title: "Esterilizar",
          description: "Es fundamental por salud y seguridad. En cuanto recupere peso y siempre después de 15 días o más de su última vacunación.",
        },
        {
          title: "Tener agua limpia disponible siempre",
          description: "24 horas al día.",
        },
        {
          title: "Comer",
          description: "2 veces al día alimento DE CORDERO seco y/o mezclado con caldo, arroz o lata (no más de 10%, retirar sobrante refrigerar).",
        },
        {
          title: "Salir a pasear",
          description: "Con correa y placa de identificación por lo menos 2 veces al día, por salud, limpieza y reconocimiento de su territorio (chip, tatuaje).",
        },
        {
          title: "Baño",
          description: "Como máximo 1 vez cada 2 semanas, en promedio sugerencia: jabón de avena “Grisi”, parasiticida tópico como Revolution, Advantage o Frontline.",
        },
        {
          title: "Juguetes",
          description: "Destinar en un lugar especial: limpiar, cambiar y guardar, carnaza, pelotas rellenables “Kongs”, trapos, cuerdas, mordederas etc.",
        },
        {
          title: "Separar áreas",
          description: "Comer, dormir (camita o cojín) y hacer.",
        },
        {
          title: "No golpes",
          description: "Aprenden asociando ideas y diciendo “¡No!” o “¡Bien!” (cambio tono de voz y actitud) Recompensas y cariños, como premios (pedacitos de salchicha, tocinetas, palmadas, etc.).",
        },
        {
          title: "Entrenamiento básico",
          description: "Fácil de aprender a cualquier edad y muy necesario en perros activos y jóvenes siempre con premio y estímulo.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.puppy-care {
  font-family: Arial, sans-serif;
}

.care-title {
  font-weight: bold;
  color: #333;
}
</style>
