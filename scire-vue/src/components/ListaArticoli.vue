<template>
  <div>
    <h1>Articoli Scire</h1>

    <!-- Pulsante Home per tornare alla lista degli articoli -->
    <button v-if="articoloSelezionato" @click="articoloSelezionato = null" class="home-button">
      Torna alla Home
    </button>

    <!-- Griglia degli articoli -->
    <div v-if="articoli && !articoloSelezionato" class="masonry-grid">
      <div 
        v-for="(articolo, index) in articoli" 
        :key="index" 
        @click="caricaDettagli(articolo.id)" 
        class="articolo">
        <img :src="articolo.field_anteprima_grande.src" :alt="articolo.field_anteprima_grande.alt">
        <h2>{{ articolo.title }}</h2>
        <p v-if="articolo['di ']" class="autore">di {{ articolo['di '] }}</p>
        <p class="data">{{ articolo.created }}</p>
      </div>
    </div>
    
    <div v-else-if="!articoloSelezionato">
      <p>Caricamento in corso...</p>
    </div>

    <!-- Dettagli dell'articolo selezionato -->
    <div v-if="articoloSelezionato" class="dettagli-articolo">
      <h2>{{ articoloSelezionato.title }}</h2>
      <img :src="articoloSelezionato.field_anteprima_grande.src" :alt="articoloSelezionato.field_anteprima_grande.alt">
      <p class="autore">di {{ articoloSelezionato['di '] }}</p>
      <p class="data">{{ articoloSelezionato.created }}</p>
      <!-- Aggiungi altri dettagli o contenuti qui -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaArticoli',
  data() {
    return {
      articoli: null,
      articoloSelezionato: null // Stato per l'articolo selezionato
    };
  },
  async created() {
    try {
      const response = await fetch('/api/getJson');
      const data = await response.json();
      this.articoli = data.nodes.map(node => ({
        id: node.node.id,  // Assicurati di avere l’ID del nodo
        title: node.node.title,
        field_anteprima_grande: node.node.field_anteprima_grande,
        created: node.node.created,
        'di ': node.node['di '] // Dati per l’anteprima
      }));
    } catch (error) {
      console.error("Errore nel recupero dei dati JSON:", error);
    }
  },
  methods: {
    async caricaDettagli(id) {
      try {
        const response = await fetch(`/api/nodo-dettagli/${id}?_format=json`);
        this.articoloSelezionato = await response.json();
      } catch (error) {
        console.error("Errore nel caricamento dei dettagli JSON:", error);
      }
    }
  }
};
</script>

<style scoped>
/* CSS per la griglia e i dettagli */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
  cursor: pointer;
}

.articolo {
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.articolo:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Stili per il pulsante Home */
.home-button {
  background-color: #007acc;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #005f99;
}

.dettagli-articolo {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  background-color: #e0f7fa;
}

.dettagli-articolo img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.dettagli-articolo h2 {
  font-size: 1.4rem;
  color: #333;
}

.dettagli-articolo p.autore {
  color: #007acc;
}

.dettagli-articolo p.data {
  color: #ff6347;
  font-size: 0.8rem;
}
</style>
