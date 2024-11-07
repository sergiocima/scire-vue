<template>
  <div>
    <h1>Articoli</h1>
    <div v-if="articoli">
      <div v-for="(articolo, index) in articoli" :key="index" class="articolo">
        <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
        <h2>{{ articolo.title }}</h2>
        <p>Autore: {{ articolo.di }}</p>
        <p>Data: {{ articolo.created }}</p>
      </div>
    </div>
    <div v-else>
      <p>Caricamento in corso...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaArticoli',  // Cambia il nome del componente qui
  data() {
    return {
      articoli: null
    };
  },
 async created() {
  try {
    const response = await fetch('/api/getJson');
    if (!response.ok) {
      throw new Error(`Errore nella risposta: ${response.status}`);
    }
    const json = await response.json();
    this.articoli = json.nodes.map(node => node.node);
  } catch (error) {
    console.error("Errore nel recupero dei dati JSON:", error);
  }
}
};
</script>

<style scoped>
.articolo {
  margin-bottom: 20px;
}
img {
  max-width: 100%;
}
</style>
