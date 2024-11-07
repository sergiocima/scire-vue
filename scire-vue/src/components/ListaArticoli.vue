<template>
  <div>
    <h1>Articoli Scire</h1>
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
/* Griglia responsiva e compatta */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* 250px di larghezza minima per colonna */
  gap: 20px;
}

.articolo-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.articolo {
  padding: 15px;
  border-radius: 8px;
  background: #f5f5f5;
  transition: box-shadow 0.2s ease-in-out;
}

.articolo-link:hover .articolo {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Ombra al passaggio del mouse */
}
</style>
