## Ref
Ref es una forma de crear variables.
Ref es mutable y reactiva, es decir, podemos cambiarla y modificarla como quieramos.
En el proyecto la usamos para iterar, porque a la hora de traer elementos de una tabla debemos guardar los valores en una variable ref, a la que luego le enviaremos datos y los iteraremos mediante ella.
Para editar un ref es preciso usar un VARIABLE.value = ZZZZ

## onMounted()

Es como una funcion que se cumple cuando sucede algo, es cuando se monta la pagina. Por ejemplo en ProductView, la usamos para traer los productos de la tabla products.

## computed()

Computed es reactiva tambien, reacciona ante cambios, la usamos en el proyecto para iterar productos. En el proyecto lo usamos con el fin de atribuirle logica a la iteracion, por ejemplo, que devolver en cierto caso de que la variable reactiva de la que estamos buscando los valores sea null o undefined por ejemplo, luego de eso computed lo maneja y segun eso devuelve algo o no se ejecuta.

## filter()
Es un metodo de array. Esta funciona asi, le pasamos un alias que le asignamos a cada producto del array, y luego empezamos la logica, se ve algo asi
array.value.filter(a=>a.id===arrayId), esto devuelve una filtracion donde buscamos elementos del array segun su ID.

## some()
Busca elementos dentro de un filter, o sea, de los elementos ya filtrados busca al menos un elemento que cumpla las condiciones.

## v-for
Es una herramienta que nos permite hacer un bucle for dentro de un elemento html.

### :key=""
Esto nos permite identificar cada iteracion del vfor, comunmente le pasamos el id :key"iterable.id"

### :datosParaHijo="DatosDePadre"
En el proyecto, esto es para los props, es decir, si tenemos un componente hijo y tenemos que darle elementos desde un componente padre asi se los pasamos. El componente hijo recibe los datosParaHijo que son llevados por DatosDePadre.

## emits(), defineEmit
Emit funciona de la siguiente manera; se define emit en un componente hijo, normalmente tiene un boton que exporta un emit y que espera datos, que luego es recogido por el componente padre, entonces le pasa los datos al emit hijo.
Nosotros lo usamos por ejemplo en ProductView. Tenemos un boton que dice "Add", esto envia datos del producto seleccionado al carrito, entonces el CartView espera los datos, pero antes de llegar, estos datos pasan por un Store, del cual hablare mas adelante.

## props()
Estos son datos que se envian entre componentes o vistas, funciona asi; El componente hijo espera una iteracion, entonces el componente padre debe pasarselo mediante props en un v-for con :datosParaHijo="DatosDePadre". El prop definido desde el componente hijo es datosParaHijo y los datos pasados desde el componente padre es DatosDePadre.

## useRouter
Esto lo usamos para navegar entre las paginas, normalmente debemos importarlo y guardarlo en una variable llamada router.

### router.push('')
Aqui es donde funciona la navegacion, es donde decidimos agregar la redireccion con push y pasandole en forma de string la ruta.

## onSubmit()
Es una funcion que se ejecuta al hacer una accion submit dentro de un form, el navegador detecta una accion de tipo submit y ejecuta dicha funcion.

## localStorage.setItem('key', value)
Lo que hace es pasarle datos para guardarlos en el localStorage, usando setitem acompañado de una clave y los valores.

## localStorage.getItem('key');
Lo que hace es traer datos del localStorage mediante una clave pasada como parametro.

## <RouterLink to="some-place">
Esto lo usamos para redirigir dentro de un template con un boton, en vez del clasico a link.

## composables

Aqui guardaremos logica que reutilizaremos en varios lugares. Unos de los primeros que realizamos fué el useCategory. Que trae secciones y categorias, y tambien el useAverage que realiza el promedio de las calificaiones, es importante reconocer cuando la usaremos en varios lugares.
Un composable se crea usando un "use" como prefijo del nombre del archivo.

## config.headers.Authorization 
Esto lo usamos en api.js, lo usamos para pasarle datos al header de un request, ya que en nuestro proyecto hay rutas que requieren una autenticacion previa.

## Rutas (index.js)

### createRouter
Aqui se definen las rutas, ademas creamos un historial, con createWebHistory al a que se le pasa los url.

### {path:'/some-place', component:SomePlaceView}
Aqui le pasamos la direccion de cada ruta y su componente. 

### routes Children
Le ponemos pasar a cada ruta un children, por ejemplo, en el proyecto lo usamos para la rutas de administrador, se lo pasa en forma de array de objetos, donde cada objeto tiene la estructura de una ruta convencional "{path:'/some-place', component:SomePlaceView}" y se le agrega un "name:some-place-view", pero al componente se le pasa una arrow function donde se importa la vista en forma de string.

### beforeEach
A beforeEach lo usamos para evitar intrusos en las rutas de administrador, sin esta, un usuario puede introducir en la navegacion "/admin-panel/products" y ver el formulario, pero cuando desee agregar un producto se le negara el acceso, ya que el token no es el token de un usuario con permisos, pero para evitar que si quiera tenga acceso, usamos before each

#### (to, from)
Son parametros convencionales que le pasamos a beforeEach, to es la direccion a DONDE se está dirigiendo y from es la direccion DESDE la que se está diriguiendo.

#### to.path
Esto hace que sepamos a donde se esta por dirigir el usuario y trabajar sobre este dato. En nuestro caso, para evitar que se diriga a paginas de admin, usamos startsWith() que hace que si el usuario desea dirigirse a una pagina que tenga como prefijo ('/admin-panel'), como por ejemplo ('/admin-panel/products'), se le niege el acceso y lo devuelva a una ruta que eligamos posteriormente.

## Pinia Stores

Pinia nos brinca stores, que sirve como logica intermedia en Vue, en nuestro caso lo usamos para la logica del cart y la autenticacion.

### state: () => ()
state sirve para guardar variables con datos al momento de usarlo, como un ref

### getters:
Son equivalentes al computed de Vue, esto devuelve valores retornados de funciones con una logica intermedia, por ejemplo en nuestro getter de autenticacion devolvemos el rol del usuario.

### actions:
Estas son  funciones, luego la usamos facilmente desde donde queramos importando el store y usando la funcion llamandola store.funcion().