import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";

describe('Funcionalidad del componente Indesicion', () => {

    let wrapper;

    // definimos un console.log spy para estudiar si se dispara un console.log en nuestro componente
    let clgSpy;

    // Construyendo un Moch para fetch API ya que no existe la funcion en Nodejs
    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }));

    beforeEach( () => {
        wrapper = shallowMount( Indecision );
        
        clgSpy = jest.spyOn( console, 'log');

        jest.clearAllMocks();
    
    })

    test('Debe hacer match con el snapshot', () => { 
        expect( wrapper.html() ).toMatchSnapshot();
    })

    test('Escribir en el input NO debe dispara nada', async () => {

        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        // hacemos la referencia al input
        const input = wrapper.find('input');

        // Le agregamos un valor al input
        await input.setValue('Hola Mundo');

        // llamo a mi spy para ver si ejecuto el console.log al menos 1 vez
        expect( clgSpy ).toHaveBeenCalledTimes(1);

        // compruebo que el getAnswer NO  se dispare
        expect(getAnswerSpy).toHaveBeenCalledTimes(0);
    })

    test('escribir el simbolo (?) debe disparar la funcion getAnswer', async () => {
        
        // definimos la funcion asincrona getAnswer 
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        //hacemos referencia al input
        const input = wrapper.find('input');

        //le agregamos un simbolo de ? 
        await input.setValue('llovera mañana ?');

        // la prueba funciona correctamente al hacer mocking de la funcion fetch API
        expect(getAnswerSpy).toHaveBeenCalled();
    })

    test('pruebas en getAnswer', async () => {
        
        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect( img.exists() ).toBeTruthy();
        expect( wrapper.vm.image ).toBe('https://yesno.wtf/assets/yes/2.gif');
        expect( wrapper.vm.answer ).toBe('Si!!🔥');
    })

    test('pruebas en getAnswer - fallos en el API', async () => {
        
        fetch.mockImplementationOnce( () => Promise.reject('API is down') );
        
        await wrapper.vm.getAnswer();

        const img = wrapper.find('image');

        // Si todo sale mal
        expect( img.exists() ).toBeFalsy();
        expect( wrapper.vm.answer ).toBe('No se pudo cargar del API');
    })
})