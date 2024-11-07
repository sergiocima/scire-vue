<template>
  <div>
    <h1>Articoli</h1>
    <div v-if="articoli" class="masonry-grid">
      <a v-for="(articolo, index) in articoli" 
         :key="index" 
         :href="articolo.Nid" 
         target="_blank" 
         class="articolo-link">
        <div class="articolo">
          <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
          <h2>{{ articolo.title }}</h2>
          <p v-if="articolo['di ']" class="autore">di {{ articolo['di '] }}</p>
          <p class="data">{{ articolo.created }}</p>
        </div>
      </a>
    </div>
    <div v-else>
      <p>Caricamento in corso...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaArticoli',
  data() {
    return {
      articoli: null
    };
  },
  async created() {
    try {
      const response = await fetch('/api/getJson'); // Modifica questo percorso se necessario
      const data = await response.json();
      this.articoli = data.nodes.map(node => node.node);
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  }
};
</script>

<style scoped>
/* Rendere l'intero riquadro un link */
.articolo-link {
  display: flex;
  text-decoration: none;
  color: inherit;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;
}

.articolo {
  padding: 10px;
  border-radius: 8px;
  background: #f5f5f5;
}

.articolo-link:hover .articolo {
  transform: scale(1.02); /* Leggero effetto zoom */
}
</style>
