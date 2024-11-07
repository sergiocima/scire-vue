<template>
  <div v-if="articolo">
    <h1>{{ articolo.title }}</h1>
    <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
    <p class="autore">di {{ articolo['di '] }}</p>
    <p class="data">{{ articolo.created }}</p>
    <!-- Aggiungi altri dettagli dell'articolo qui -->
  </div>
  <div v-else>
    <p>Caricamento in corso...</p>
  </div>
</template>

<script>
export default {
  name: 'DettaglioArticolo',
  props: ['id'],
  data() {
    return {
      articolo: null
    };
  },
  async created() {
    try {
      const response = await fetch(`/api/nodo-dettagli/${this.id}?_format=json`);
      this.articolo = await response.json();
    } catch (error) {
      console.error("Errore nel caricamento dei dettagli JSON:", error);
    }
  }
};
</script>

<style scoped>
/* Stili per il dettaglio */
.autore {
  color: #007acc;
}

.data {
  color: #ff6347;
}
</style>
