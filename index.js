import fs from 'fs';

const baseProd = JSON.parse( fs.readFileSync( './products.json' ) )
const jsonFile = 'products.json';

class Productos{

  constructor ( productos )
  {
    this.productosArray = productos;
  }

  async write ( params )
  {
    const nuevoProducto = JSON.stringify( params, null, 2 )
    await fs.promises.writeFile( jsonFile, nuevoProducto, 'utf8' );
  }


//-save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado

async save ( obj )
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( 'productos.json', 'utf8' ) )
      const productosArray = data;
      productosArray.push( obj );
      let id = 0

     
      productosArray.forEach( ( producto ) =>
      {
        if ( producto.id > id ) id = producto.id

      } )

      obj.id = id + 1
      await fs.promises.writeFile( jsonFile, JSON.stringify( productosArray, null, 2 ) );

    } catch ( err ) {
      console.log( err )
    }
  }


//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.

  async getById ( idNumber )
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( jsonFile, 'utf8' ) )
      this.productosArray = data;

      const producto = this.productosArray.find( ( producto ) => producto.id === idNumber )
      if ( producto ) console.log( producto )

      else console.log( 'No se encontro el producto' )

    } catch ( err ) {
      console.log( err )
    }

  }

//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

  async getAll ( _title)
  {
    const data = await fs.promises.readFile( jsonFile )
    const products = JSON.parse( data )

    if ( products.length ) {
      const todosLosProductos = products.map( ( producto ) => producto )
      console.log( todosLosProductos )
    } 
    else {
      console.log( 'No hay productos' )
    }
  }


//deleteAll(): void - Elimina todos los objetos presentes en el archivo.
async deleteAll ()
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( jsonFile, 'utf8' ) )
      if ( data.length ) {
        this.write( [] )
        console.log( 'Todos los archivos fueron borrados ' )
      } else {
        console.log( 'No hay productos para borrar' )
      }

    } catch ( err ) {
      console.log( err )
    }
  }


}

await Productos.getById(  )
//Productos.getAll()
//Productos.deleteAll()