
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Kevin',
        descripcion:"este amigurumi esta tejido con  colores calidos  perfecto para llevartelo en tus aventuras,su medida es de 100cm",
        precio: 35,
        imagen: "./img/Amigurumi_de_pinterest-removebg-preview.png"
    },
    {
        id: 2,
        nombre: 'vaca',
        descripcion:"este hermoso tejido de vaquita contiene colores pasteles impecable para adornar tu comoda, su medida es de 150cm",
        precio: 25,
        imagen:"img/Bolsa_de_Fresas_Vaca_Amigurumi_Patron_Gratis_PDF-removebg-preview.png",
    },
    {
        id: 3,
        nombre: 'scream',
        descripcion:"¡SCREAM! tejido con tus colores favoritos, ahora puedes tener a tu personaje favorito junto a ti,su medida es de 50cm",
        precio: 45,
        imagen: "img/Crafting_Therapy__Dive_into_Exciting_Crocheting_Projects_Today-removebg-preview.png",
    },
    {
        id: 4,
        nombre: 'kevin kaarl',
        descripcion:"Este aritista esta tejido  con un acabado limpio, excelente para escuhar su nuevo album junto a el, su medida es de 70cm",
        precio: 50,
        imagen: "img/descarga-removebg-preview.png",
    },
    {
        id: 5,
        nombre: 'hongos',
        descripcion:"Estos hermosos hongos tejidos disponibles en diferentes medidas y colores perfectos para llevarlos contigo en tu dia a dia",
        precio: 15,
        imagen: "img/image-removebg-preview (8).png",
    },
    {
        id: 6,
        nombre: 'capibara',
        descripcion:"capibara tejido con colores calidos, se caracteriza por ser sociable que esperas para hacer match con el, sus medidas son de 50cm",
        precio: 27,
        imagen: "./img/capi.png",
    },
    {
        id: 7,
        nombre: 'ranita',
        descripcion:"La rana rene con sus colores frios perfecta para llevarla a un dia de campo contigo ¡te esta esperando! ,sus medidas son de 30cm",
        precio: 18,
        imagen: "img/verde.png",
    },
    {
        id: 8,
        nombre: 'coraje',
        descripcion:"Soy Coraje, el perro cobarde, mi tejito es de color rosa y negro,soy extremadamente tímido y asustadizo !protejeme¡, medidas 50cm",
        precio: 30,
        imagen: "img/CORAJE.png",
    },
    {
        id: 9,
        nombre: 'gary',
        descripcion:"Soy gary tengo unos colores brillantes dignos de mi especie y una serie de habilidade que te encantaran, medidas 40cm",
        precio: 25,
        imagen: "./img/GRA.png",
    },
 
];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        const miNododescripcion = document.createElement('h5');
        miNododescripcion.classList.add('card-descripcion');
        miNododescripcion.textContent = info.descripcion;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
     
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
    
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Agregar al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
     
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNododescripcion);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);

        
    });
}


function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
  

    actualizarContadorCarrito();
    renderizarCarrito();

}
function actualizarContadorCarrito() {
    const contadorCarrito = document.querySelector('#contador-carrito');
    contadorCarrito.textContent = carrito.length;
}

function renderizarCarrito() {
 
    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
    
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
           
            return itemBaseDatos.id === parseInt(item);
        });
       
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem}  ${miItem[0].nombre} = ${miItem[0].precio}${divisa}`;

        const miImagen = document.createElement('img');
        miImagen.classList.add('img-fluid');
        miImagen.setAttribute('src', miItem[0].imagen);
        miImagen.style.width = '5rem';
        miImagen.style.marginRight = '1rem';

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miImagen);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
 
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    actualizarContadorCarrito();
    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
      
        return total + miItem[0].precio;
    }, 0).toFixed(3);
}


;function vaciarCarrito() {
        carrito = [];
        actualizarContadorCarrito();
        renderizarCarrito();
    }



DOMbotonVaciar.addEventListener('click', vaciarCarrito);


renderizarProductos();
renderizarCarrito();


