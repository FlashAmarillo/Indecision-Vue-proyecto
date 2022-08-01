import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe('Counter component Vue', () => {
    // definimos el wrapper de forma global, me va a crear una instancia del componente Counter montado y renderizado en el DOM 
    let wrapper;

    // antes de cada prueba, reinicia el wrapper
    beforeEach( () => {
        wrapper = shallowMount( Counter );
    })

    test('H2 debe tener el valor por defecto "Counter"', () => {
        
        expect( wrapper.find('h2').exists()).toBeTruthy();

        const h2Velue = wrapper.find('h2').text();

        expect(h2Velue).toBe('Counters');

    })

    test('El valor por defecto debe ser 100 en el parrafo P', () => {
        
        // traemos todos los parrafos
        const parrafo = wrapper.find('[data-testid="counter"]').text();

        // expect segundo p = 100
        expect(parrafo).toBe("100");

    })

    test('debe incrementar y decrementar el valor del contador al hacer click en los boton', async () => {

        //tomar la referencia de los botones
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');

        // le montamos un click al boton con el metodo trigger 3 veces
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        // hacemos click 2 veces segudias para reducir
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');

        // evaluamos si aumento el state
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe('101');
    })

    test('debe de establecer el valor por defecto', () => { 
        
        // obtenemos el valor de los props
        const { start } = wrapper.props();

        const value = wrapper.find('[data-testid="counter"]').text();

        // Evaluamos que el valor sea igual al prop por defecto
        expect(Number(value)).toBe(start);
    })

    test('Debe de mostrar la prop de title', () => { 

        const title = "Hola Mundo Diomar!!!";

        // le pasamos props a nuestro componente Counter
        const wrapper = shallowMount(Counter, {
            props: {
                title
            }
        });

        expect( wrapper.find('h2').text() ).toBe(title);


        console.log(wrapper.html());
     })
})