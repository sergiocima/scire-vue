<template>
  <div v-if="articolo">
    <h1>{{ articolo.title }}</h1>
    <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt" />
    <p class="autore">di {{ articolo['di '] }}</p>
    <p class="data">{{ articolo.created }}</p>
    <p>{{ articolo.content }}</p> <!-- Aggiungi altri dettagli -->
  </div>
  <div v-else>
    <p>Caricamento in corso...</p>
  </div>
</template>

<script>
export default {
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
      console.error("Errore nel caricamento dei dati JSON:", error);
    }
  }
};
</script>
