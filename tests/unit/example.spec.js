


describe('Example Component', () => {
  
  test( 'Debe de ser mayor a 10', () =>{
    //Revisar la documentacion de jest en su API

    //Arreglar
    let value = 10;

    //Estímulo
    value = value + 2;
    //Observar el resultado
    expect( value ).toBeGreaterThanOrEqual(10);
    expect(value).toBeDefined();
  })
})