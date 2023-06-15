//para poder usar el faker
const { faker } = require('@faker-js/faker');
//para usar el mongo Cliente
const { MongoClient } = require('mongodb');
//Conecta a mongo por medio de la uri
const uri = "mongodb+srv://edbravo:Sena1234@cluster0.ushwfet.mongodb.net/"
//Funcion para crear la base de datos con una collection

//USUARIO
//insertarUsuarios
async function insertarUsuarios() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosFaker = [];
        var id_usuario=[];
        for (let i = 0; i < 2000; i++) {
            do{
                var id_usuarios=faker.number.int({ min: 1, max: 2000 })
            }while(id_usuario.includes(id_usuarios));
            id_usuario.push(id_usuarios)

            var nombre = faker.person.firstName();
            const datosAInsertar = {
                id_usuario: id_usuarios,
                _id_Rol: faker.number.int({ min: 1, max: 3 }),
                nombre: nombre,
                documento: faker.number.int({ min: 10000, max: 99999 }),
                email: faker.internet.email({ firstName: nombre }),
                telefono: faker.number.int({ min: 30000, max: 39999 }),
                password: faker.internet.password(),
                estado: faker.helpers.arrayElement(['activo', 'inactivo'])
            }
            datosFaker.push(datosAInsertar);
            console.log(`se an agregado : ${i} registros`)
        }
        console.log('estoos son los valores que genero el faker');
        console.log(datosFaker);
        const result = await cliente.db('Soft_Imperio').collection('Usuarios').insertMany(datosFaker)
        if (result) {
            console.log('se ha ingresado el registro')
        } else {
            console.log('ha fallado')
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//insertarUsuarios();


//ver un usuarios
async function VerUsuario() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').findOne({"id_usuario": 1 });
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//VerUsuario();

//ver todos usuarios
async function VerTUsuarios() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').find(
            {}, { limit: 2000 }
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//VerTUsuarios();

// eliminar Usuarios
async function eliminarUsuarios() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').deleteOne({ "id_usuario": 3 });
      console.log('Registro eliminado de usuario');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  // Llamar a la función para eliminar el registro
  //eliminarUsuarios();


  // eliminar todos Usuarios
async function eliminarTUsuarios() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').deleteMany();
      console.log('Registros eliminados de usuarios');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //eliminarTUsuarios();


  //modificar Usuarios
  async function modificarUsuarios() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').updateOne({ "id_usuario": 3 },
        { $set: { nombre: 'kevin', estado: "Inactivo" } }
      );
      console.log('Registro modificado de usuario');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  // Llamar a la función para modificar el registro
  //modificarUsuarios();

 //modificar todos Usuarios
async function modificarTUsuarios() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').updateMany({},
        { $set: {estado: "Inactivo" } }
      );
      console.log('Registros modificado de usuarios');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  // Llamar a la función para modificar el registro
  //modificarTUsuarios();


  // ordenar los Usuarios
async function ordenarUsuarios() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Usuarios').find().sort({ id_usuario: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }

  //ordenarUsuarios();




  //rol

  async function insertarRol() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Roles').insertOne([
            {
              _id_Rol: 3,
              nombreRol: "prueba"
            }
        ])
        console.log(`se a agregaron los registros correctamenta`)
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
 //insertarRol();

async function verRoles() {
  const cliente = new MongoClient(uri);

  try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Roles').find(
          {}, { limit: 3 }
      ).toArray();
      console.log(resultado);
  } catch (e) {
      console.log(e);
  } finally {
      await cliente.close();
  }
}

//verRoles();

// eliminar Categorias
async function eliminarRol() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('Roles').deleteOne({ "_id_Rol": 3 });
    console.log('Registro eliminado de rol');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}

// Llamar a la función para eliminar el registro
//eliminarRol();

async function eliminarTRol() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('Roles').deleteMany();
    console.log('Registros eliminados de roles');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}

//eliminarTRol();


//modificar Rol
async function modificarRol() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('Roles').updateOne({ "_id_Rol": 3 },
      { $set: { nombreRol: 'mesero2' } }
    );
    console.log('Registro modificado');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}
//modificarRol();

//modificar Todas los roles
async function modificarTRol() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('Roles').updateMany({},
      { $set: { nombreRol: 'meseros' } }
    );
    console.log('Registro modificado');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}
//modificarTRol();


// ordenar los roles
async function ordenarRol() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('Roles').find().sort({ _id_Rol: 1 }).toArray();
    console.log('Registros ordenados de menor a mayor:');
    console.log(resultado);
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}

//ordenarRol();

//Usuari Credicto

async function crearColeccionUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
      await cliente.connect();
      const result = await cliente.db('Soft_Imperio').createCollection("UsuarioCredito", {
          validator: {
              $jsonSchema: {
                  bsonType: 'object',
                  title: "SchemaRoles",
                  required: [
                      "_id_UsuarioCredito",
                      "nombreUsuarioCredito",
                      "documento",
                      "Telefono"
                  ],
                  properties: {
                      "_id_UsuarioCredito": {
                          "bsonType": "int"
                      },
                      "nombreUsuarioCredito": {
                          "bsonType": "string"
                      },
                      "documento": {
                        "bsonType": "int"
                      },
                      "Telefono": {
                        "bsonType": "int"
                      }
                  }
              }
          }
      })
      if (result) {
          console.log("Se creo correctamente la Base de Datos");
      } else {
          console.log("Error al crear la Base de Datos");
      }

  } catch (e) {
      console.log(e);
  } finally {
      await cliente.close();
  }
}
//crearColeccionUsuarioCredito();


async function insertarUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
      await cliente.connect();
      const datosFaker = [];
      var _id_UsuarioCreditos=[];
      for (let i = 0; i < 2000; i++) {
          do{
              var _id_UsuarioCredi=faker.number.int({ min: 1, max: 2000 })
          }while(_id_UsuarioCreditos.includes(_id_UsuarioCredi));
          _id_UsuarioCreditos.push(_id_UsuarioCredi)
          var nombre = faker.person.firstName();

          var document = faker.number.int({ min: 10000, max: 99999 })
          var telefono = faker.number.int({ min: 30000, max: 39999 })

          const datosAInsertar = {
            _id_UsuarioCredito: _id_UsuarioCredi,
            nombreUsuarioCredito: nombre,
            documento: document,
            Telefono: telefono
          }
          datosFaker.push(datosAInsertar);
          console.log(`se an agregado : ${i} registros`)
      }
      console.log('estoos son los valores que genero el faker');
      console.log(datosFaker);
      const result = await cliente.db('Soft_Imperio').collection('UsuarioCredito').insertMany(datosFaker)
      if (result) {
          console.log('se ha ingresado el registro')
      } else {
          console.log('ha fallado')
      }
  } catch (e) {
      console.log(e);
  } finally {
      await cliente.close();
  }
}
insertarUsuarioCredito();


//ver un usuarios
async function VerUsuarioCredito() {
  const cliente = new MongoClient(uri);

  try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').findOne({"_id_UsuarioCredito":2 });
      console.log(resultado);
  } catch (e) {
      console.log(e);
  } finally {
      await cliente.close();
  }
}
//VerUsuarioCredito();


//ver todos usuarios
async function VerTUsuarioCredito() {
  const cliente = new MongoClient(uri);

  try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').find(
          {}, { limit: 2000 }
      ).toArray();
      console.log(resultado);
  } catch (e) {
      console.log(e);
  } finally {
      await cliente.close();
  }
}

//VerTUsuarioCredito();

// eliminar Usuarios
async function eliminarUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').deleteOne({ "_id_UsuarioCredito": 3 });
    console.log('Registro eliminado de Usuario Credito');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}
// Llamar a la función para eliminar el registro
//eliminarUsuarioCredito();


// eliminar todos Usuarios
async function eliminarTUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').deleteMany();
    console.log('Registros eliminados de Usuario Credito');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}

//eliminarTUsuarioCredito();


//modificar Usuario Credito
async function modificarUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').updateOne({ "_id_UsuarioCredito": 3 },
      { $set: { nombre: 'kevin', estado: "Inactivo" } }
    );
    console.log('Registro modificado de Usuario Credito');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}

// Llamar a la función para modificar el registro
//modificarUsuarioCredito();


//modificar todos Usuario Credito
async function modificarTUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').updateMany({},
      { $set: {estado: "Inactivo" } }
    );
    console.log('Registros modificado de Usuario Credito');
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}
// Llamar a la función para modificar el registro
//modificarTUsuarioCredito();


// ordenar los UsuarioCredito
async function ordenarUsuarioCredito() {
  const cliente = new MongoClient(uri);
  try {
    await cliente.connect();
    const resultado = await cliente.db('Soft_Imperio').collection('UsuarioCredito').find().sort({ _id_UsuarioCredito: 1 }).toArray();
    console.log('Registros ordenados de menor a mayor:');
    console.log(resultado);
  } catch (e) {
    console.log(e);
  } finally {
    await cliente.close();
  }
}

// funcion para borrar collection ***Drop collection

async function eliminarcollection(){
  const cliente = new MongoClient(uri);
  try {
      await cliente.connect();
      const db = cliente.db(Soft_Imperio);
      await db.collection('UsuarioCredito').drop();
      console.log('La coleccion se elimino correctamente');
  }catch(err) {
    console.log('La coleccion No se elimino correctamente' + err.message);

  }finally{
    await cliente.close();
  }
}
//eliminarcollection();


//funcion para borrar la base de datos ***Drop DB

async function eliminardb(){
  const cliente = new MongoClient(uri);
  try {
      await cliente.connect();
      const db = cliente.db(Soft_Imperio);
      await db.dropDatabase().drop();
      console.log('La Base de datos se elimino correctamente');
  }catch(err) {
    console.log('La Base de datos No se elimino correctamente' + err.message);

  }finally{
    await cliente.close();
  }
}
//eliminardb();


// lookup 

async function lookup(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const db = cliente.db(Soft_Imperio);
        const resultado = await db.collection('UsuarioCredito').aggregate([
          {
            $lookup: {
              from: 'credito',
              localfield: 'IdUsuarioCredito',
              foreignfield: 'IdUsuarioCredito',
              as: 'idUsuario'
            }
          }
        ]).toArray();
        console.log();
    }finally{
      await cliente.close();
    }
  }
  //lookup();


//Consulta con pipeline
  async function pipelinequery (){
    const cliente = new MongoClient(uri);
    try{
      await cliente.connect();
      const db = cliente.db('Soft_Imperio')
      const collection = db.collection('Usuarios')

      //etapa pipeline
      const pipeline=[
        { $match: {_id_usuario: 1569}},
        //criterios de arupacion
        {sort: {_id_usuario:1}}
        ];
    const result = await collection.aggregate(pipeline).toArray();
    console.log('la consulta es: ', result)
    }catch(error){
      console.log('error en la consulta.', error);
    }finally{
      await cliente.close();
    }
  }
  //pipelinequery();


  //consulta de agregacion con limit, sort, unwind

  async function ejecutarConsulta() {
    try {
      const resultado = new MongoClient([
        {
          $sort: { nombre: 1 } // Ordena los documentos por el campo 'nombre' de forma ascendente (1)
        },
        {
          $limit: 10 // Limita la cantidad de documentos a 10
        },
        {
          $lookup: {
            from: "roles",
            localField: "id_rol",
            foreignField: "id",
            as: "rol"
          }
        },
        {
          $unwind: "$rol" // Descompone el campo 'rol' en documentos individuales
        }
      ]);
  
      // Procesa y organizael resultado de la consulta
      resultado.forEach(doc => {
        console.log(doc);
      });
    } catch (error) {
      console.error("Ocurrió un error durante la consulta:", error);
    } finally {
      // Código que se ejecuta siempre, independientemente de si ocurre una excepción o no
      await cliente.close();
    }
  }  
  // ejecutarConsulta();
  











































//CATEGORIA

async function crearColeccionCategoria() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("Categoria", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaRoles",
                    required: [
                        "_id_Categoria",
                        "nombre_Categoria"
                    ],
                    properties: {
                        "_id_Categoria": {
                            "bsonType": "int"
                        },
                        "nombre_Categoria": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo correctamente la Base de Datos");
        } else {
            console.log("Error al crear la Base de Datos");
        }

    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//crearColeccionCategoria();

//Funcion para insertar las carateristicas

async function insertarCategoria() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Categoria').insertOne([
            {
                _id_Categoria: 1,
                nombre_Categoria: "Cervesas"
            }
        ])
        console.log(`se a agregaron los registros correctamenta`)
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
 //insertarCategoria();

//ver categorias
async function verCategorias() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Categoria').find(
            {}, { limit: 3 }
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//verCategorias();

// eliminar Categorias
async function eliminarCategorias() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Categoria').deleteOne({ "_id_Categoria": 3 });
      console.log('Registro eliminado de categoria');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  // Llamar a la función para eliminar el registro
  //eliminarCategorias();

  // eliminar todas Categorias
async function eliminarTCategorias() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Categoria').deleteMany();
      console.log('Registros eliminados de categoria');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //eliminarTCategorias();

//modificar Categoria
  async function modificarCategoria() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Categoria').updateOne({ "_id_Categoria": 3 },
        { $set: { nombre_Categoria: 'Gaseosas' } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //modificarCategoria();

//modificar Todas las Categoria
  async function modificarTCategoria() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Categoria').updateMany({},
        { $set: { nombre_Categoria: 'Gaseosas' } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarTCategoria();


  // ordenar las Categorias
  async function ordenarCategoria() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Categoria').find().sort({ _id_Categoria: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }

  //ordenarCategoria();







//PROVEEDORES

async function crearColeccionProveedores() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("Proveedores", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "_id_Proveedores",
                        "nombre",
                        "documento",
                        "telefono",
                        "email",
                        "direccion"
                    ],
                    properties: {
                        "_id_Proveedores": {
                            "bsonType": "int"
                        },
                        "nombre": {
                            "bsonType": "string"
                        },
                        "documento": {
                            "bsonType": "string"
                        },
                        "telefono": {
                            "bsonType": "string"
                        },
                        "email": {
                            "bsonType": "string"
                        },
                        "direccion": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo la collection correctamente");
        } else {
            console.log("Error al crear la collection");
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//crearColeccionProveedores();


//insertarproveedor

async function insertarProveedore() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosFaker = [];
        var _id_Proveedores = [];
        for (let i = 0; i < 2000; i++) {

            do {
                var _id_Proveedor = faker.number.int({ min: 1, max: 2000 });
            } while (_id_Proveedores.includes(_id_Proveedor));
            _id_Proveedores.push(_id_Proveedor)
            
            var nombre = faker.person.firstName();
            var documento = faker.number.int({ min: 10000, max: 99999 })
            var telefono = faker.number.int({ min: 3000000000, max: 3999999999 })
            const datosAInsertar = {
                _id_Proveedores: _id_Proveedor,
                nombre: nombre,
                documento: documento.toString(),
                telefono: telefono.toString(),
                email: faker.internet.email({ firstName: nombre }),
                direccion: faker.location.streetAddress(),
            }
            datosFaker.push(datosAInsertar);
            console.log(`se an agregado : ${i} registros`)
        }
        console.log('estoos son los valores que genero el faker');
        console.log(datosFaker);
        const result = await cliente.db('Soft_Imperio').collection('Proveedores').insertMany(datosFaker)
        if (result) {
            console.log('se ha ingresado el registro')
        } else {
            console.log('ha fallado')
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//insertarProveedore();

//ver un proveedores
async function verProveedores() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').findOne(
            {"_id_Proveedores": 1 }
        );
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//verProveedores();


//ver todos los proveedores
async function verTProveedores() {
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').find(
            {}, { limit: 2000 }
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}

//verTProveedores();


 // eliminar Proveedores
 async function eliminarProveedores() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').deleteOne({ "_id_Proveedores": 1 });
      console.log('Registro eliminado de proveedore');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //eliminarProveedores();

// eliminar todos los Proveedores
async function eliminarTProveedores() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').deleteMany();
      console.log('Registros eliminados de proveedores');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //eliminarTProveedores();


  //modificar Proveedores
  async function modificarProveedores() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').updateOne({ "_id_Proveedores": 1 },
        { $set: { nombre: 'pepito', email: "pepito@gmail.com" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarProveedores();

  //modificar todos los Proveedores
  async function modificarTProveedores() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').updateMany({},
        { $set: { nombre: 'pepito', email: "pepito@gmail.com" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //modificarTProveedores();

   // ordenar los Proveedores
async function ordenarProveedores() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Proveedores').find().sort({ _id_Proveedores: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }

  //ordenarProveedores();






async function crearColeccionProductos() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const result = await cliente.db('Soft_Imperio').createCollection("Productos", {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: "SchemaUsuarios",
                    required: [
                        "_id_Producto",
                        "_id_Categoria",
                        "_id_Proveedores",
                        "nombre_producto",
                        "foto",
                        "precio_Producto",
                    ],
                    properties: {
                        "_id_Producto": {
                            "bsonType": "int"
                        },
                        "_id_Categoria": {
                            "bsonType": "int"
                        },
                        "_id_Proveedores": {
                            "bsonType": "int"
                        },
                        "nombre_Producto": {

                            "bsonType": "string"
                        },
                        "foto": {
                            "bsonType": "string"
                        },
                        "precio_Producto": {
                            "bsonType": "string"
                        }
                    }
                }
            }
        })
        if (result) {
            console.log("Se creo la collection correctamente");
        } else {
            console.log("Error al crear la collection");
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//crearColeccionProductos();



//PRODUCTOS

async function traerIdProveedor(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();

        const result = await cliente.db('Soft_Imperio').collection('Proveedores').find({}).project({_id:0,_id_Proveedores:1}).toArray()
        return result;
        
    } catch (e) {
        console.log(e);
    }finally{
        console.log('se han enviado los id_proveedores')
        await cliente.close();
    }

}

/*async function traerCategorias(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();

        const result = await cliente.db('Soft_Imperio').collection('Categoria').find({}).project({_id:0,_id_Categoria:1}).toArray()
        return result;
        
    } catch (e) {
        console.log(e);
    }finally{
        console.log('se han enviado los id_categoria')
        await cliente.close();
    }

}*/



//insertarproductos
async function insertarProductos() {
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosFaker = [];
        var _id_Productos= [];

        //const idCategorias= await traerCategorias();
        const idProveedores= await traerIdProveedor();
        


        for (let i = 0; i < 2000; i++) {
            do{
                var _id_Producto = faker.number.int({ min: 1, max: 2000 });
            }while(_id_Productos.includes(_id_Producto));
            _id_Productos.push(_id_Producto);

            //const id_Categoria = idCategorias[i]._id_Categoria; // Ajustar para acceder al campo correcto
            const id_Proveedore = idProveedores[i]._id_Proveedores;

            //const id_Categoria = faker.helpers.arrayElement(idCategorias).idCategoria;
            //const id_Proveedore = faker.helpers.arrayElement(idProvedores).idProveedore;
            
            const _id_Categoria = faker.number.int({ min: 1, max: 3 });
            const nombre_Producto = faker.commerce.productName();
            const foto = faker.image.url();
            const precioProducto = Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
            const precio = precioProducto.toString();

            const datosAInsertar = {
                _id_Producto: _id_Producto,
                _id_Categoria:_id_Categoria,
                _id_Proveedores: id_Proveedore,
                nombre_producto: nombre_Producto, // Cambiar el nombre del campo a 'nombre_producto'
                foto: foto,
                precio_Producto: precio // Cambiar el nombre del campo a 'precio_Producto'
            };

            datosFaker.push(datosAInsertar);
            console.log(`Se ha agregado ${i + 1} registro(s)`);

        }
        console.log('Estos son los valores generados por Faker:');
        console.log(datosFaker);
        const result = await cliente.db('Soft_Imperio').collection('Productos').insertMany(datosFaker);
        if (result) {
            console.log('se ha ingresado el registro')
        } else {
            console.log('ha fallado')
        }
    } catch (e) {
        console.log(e);
    } finally {
        await cliente.close();
    }
}
//insertarProductos();


//ver un productos
async function verProductos(){
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Productos').findOne(
            {"_id_Producto": 2}
        );
        console.log(resultado);
    } catch (e) {
        console.log(e);
    }finally{
        await cliente.close();
    }
}

//verProductos();

//ver todos productos
async function verTProductos(){
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
        const resultado = await cliente.db('Soft_Imperio').collection('Productos').find(
            {},{limit:2000}
        ).toArray();
        console.log(resultado);
    } catch (e) {
        console.log(e);
    }finally{
        await cliente.close();
    }
}

//verTProductos();

 // eliminar Productos
async function eliminarProducto() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Productos').deleteOne({ "_id_Producto": 2 });
      console.log('Registro eliminado de producto');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //eliminarProducto();

   // eliminar todos los Productos
async function eliminarTProducto() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Productos').deleteMany();
      console.log('Registros eliminados de productos');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  //eliminarTProducto();

  //modificar Producto
  async function modificarProducto() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Productos').updateOne({ "_id_Producto": 2 },
        { $set: { nombre_producto: 'vodka', precio_Producto: "50000" } }
      );
      console.log('Registro modificado');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //modificarProducto();

//modificartos los Producto
async function modificarTProducto() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Productos').updateMany({},
        { $set: {precio_Producto: "50000" } }
      );
      console.log('Registros modificados de productos');
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }
  
  //modificarTProducto();

  // ordenar los Producto
async function ordenarProducto() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      const resultado = await cliente.db('Soft_Imperio').collection('Productos').find().sort({ _id_Producto: 1 }).toArray();
      console.log('Registros ordenados de menor a mayor:');
      console.log(resultado);
    } catch (e) {
      console.log(e);
    } finally {
      await cliente.close();
    }
  }

  //ordenarProducto();








async function insertarPedidoVentaBarra() {
  const cliente = new MongoClient(uri);
  try {
      await cliente.connect();
      const datosFaker = [];
      var _id_PedidoBarraB= [];
      for (let i = 0; i < 5; i++) {
          do{
              var _id_PedidoB = faker.number.int({ min: 1, max: 6 });
          }while(_id_PedidoBarraB.includes(_id_PedidoB));
          _id_PedidoBarraB.push(_id_PedidoB);       

          const fecha=faker.date.recent()
          const fechas=fecha.toString()
          const TotalPedidoB=Math.floor(Math.random() * (19999 - 10000 + 1)) + 10000;
          const precio= TotalPedidoB.toString()

          const datosAInsertar = {
              _id_PedidoBarra:_id_PedidoB,
              FechaPedido:fechas,
              TotalPedidoBarra:precio
          };

          datosFaker.push(datosAInsertar);
          console.log(`Se ha agregado ${i + 1} registro(s)`);

      }
      console.log('Estos son los valores generados por Faker:');
      console.log(datosFaker);
      const result = await cliente.db('Soft_Imperio').collection('PedidoVentaBarra').insertMany(datosFaker);
      if (result) {
          console.log('se ha ingresado el registro')
      } else {
          console.log('ha fallado')
      }
  } catch (e) {
      console.log(e);
  } finally {
      await cliente.close();
  }
}

//insertarPedidoVentaBarra()




