<template>
  <h2>{{ customTitle }}</h2>
  <p data-testid="counter"> {{ counter }}</p>
  <p> {{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <div class="botones-container">
      <button @click="increase">+1</button>
      <button @click="decrease">-1</button>
  </div>

  <footer>
      <p>Diomar Villarroel 2022</p>
  </footer>
</template>

<script>
export default {
    //properties/propiedades o props (definimos sus tipos de datos)
    props: {
        title: String,
        start: {
            type: Number,
            required: true,
            default: 100,
            validator( value ) {
                return value >= 0
            }
        }
    },

    name: 'Patito',
    data() {
        return {
            counter: this.start
        }
    }, 
    methods: {
        getSquareValue() {
            return this.counter * this.counter;
        },
        //incremento al clickear +1
        increase() {
            console.log('Aumentado');
            this.counter++;
        },
        //decremento al clickear -1
        decrease() {
            console.log('Disminuyendo')
            this.counter--;
        }
    }, 
    computed: { //Las propiedades computadas se guardan en el cache haciendolas más eficientes
        squareCounter() {
            return this.counter * this.counter
        },
        customTitle() {
            console.log(this.title)
            return this.title === undefined ? 'Counters' : this.title;
        }
    }
}
</script>

<style>

button {
    background-color: #64bb87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    font-size: 1.3rem;
    margin: 0 5px;
    padding: 10px 30px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}

</style>