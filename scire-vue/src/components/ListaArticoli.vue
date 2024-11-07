<template>
  <div>
    <h1>Articoli Scire</h1>
    <div v-if="articoli" class="masonry-grid">
      <a v-for="(articolo, index) in articoli" 
         :key="index" 
         :href="articolo.Nid" 
         target="_blank" 
         class="articolo">
        <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
        <h2>{{ articolo.title }}</h2>
        <p v-if="articolo['di ']" class="autore">di {{ articolo['di '] }}</p>
        <p class="data">{{ articolo.created }}</p>
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
      const response = await fetch('/api/getJson');
      const data = await response.json();
      this.articoli = data.nodes.map(node => ({
        ...node.node,
        Nid: node.node.Nid // Assicurati che il link JSON sia presente
      }));
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  }
};
</script>

<style scoped>
/* CSS aggiornato per la griglia */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
}

.articolo {
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.articolo:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.articolo img {
  width: 100%;
  height: auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.articolo h2 {
  font-size: 1.2rem;
  color: #333;
  margin: 10px 15px 5px;
}

.articolo p {
  font-size: 0.9rem;
  color: #666;
  margin: 5px 15px;
}

.articolo p.autore {
  color: #007acc;
}

.articolo p.data {
  color: #ff6347;
  font-size: 0.8rem;
}
</style>
