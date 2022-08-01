<template>
  <img :src="image" alt="imagen-background" >
  <div class="bg-dark"></div>
  <div class="indecision-container">
      <input 
        type="text" 
        placeholder="Hazme una pregunta" 
        v-model="question" >
      <p>Recuerda terminar con un signo de interrogación (?)</p>

      <div v-if="isValidQuestion">
          <h2> {{ question }} </h2>
          <h1>{{ answer }}</h1>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            question: null,
            answer: null,
            image: null,
            isValidQuestion: false,
        }
    },
    methods: {
        async getAnswer() {

            try {
                this.answer = 'Pensando...'
    
                //url de la api de yesno.wtf/
                const url = 'https://yesno.wtf/api'
                
                //hacemos la peticion a la API
                const { answer, image } = await fetch(url).then(respuesta => respuesta.json())
    
                //insertamos los valores en las propiedades de la data
                this.answer = answer === 'yes' ? 'Si!!🔥' : 'No!'
                this.image = image

            } catch (error) {
                this.answer = 'No se pudo cargar del API';
                this.image = null;
                console.log(error)
            }
        }
    },
    watch: { //va a estar observando los valores que les indiques y ejecuta una funcion cada vez que cambie
        question( value, oldValue) {

            this.isValidQuestion = false;

            if( !value.includes('?')) return;

            this.isValidQuestion = true;

            // TODO: realizar peticion HTTP
            this.getAnswer();
        }
    }
}
</script>

<style scoped>

/* scoped esto hace que el siguiente CSS solo sea aplicado apra este componente */

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
        margin-bottom: 1rem;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>