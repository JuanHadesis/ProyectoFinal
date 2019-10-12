var contenido = document.querySelector('#contenido')

async function traer() {
    A = Math.round(Math.random() * 100)
    fetch(`https://www.superheroapi.com/api.php/2922464141115711/${A}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            contenido.innerHTML = `
                    <img src="${data.image.url}" width="400px" class="img-fluid"> 
                    <h3 style="color:white">Nombre: ${data.name}</h3>
                    <h3 style="color:white">Alias: ${data.biography.aliases}</h3>
                    <h3 style="color:white">Derechos: ${data.biography.publisher}</h3>
                    `
        })
}
async function obtenerpokemon(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    let data = await response.json()
    return data
}

async function obtenerDatos(url) {
    let response = await fetch(url)
    let data = await response.json()
    return data
}

/**
 * Retorna una cadena HTML con una lista de personajes y un botón de anterior y siguiente si recibe las URL
 * @param {string} url API a ser ejecutada 
 */
async function listapokemon(url) {
    let lista = `<ul class="collection with-header">
      <li class="collection-header indigo lighten-2"><h4>Nombre de Pokemon</h4></li>`
    let personajes = await obtenerDatos(url)

    let numeroPersonaje = 1;
    for (const personaje of personajes.results) {
        lista += `<li class="collection-item">
        <div><strong>${numeroPersonaje}. Nombre:</strong> ${personaje.name}</div></li>`
        numeroPersonaje++
    }
    lista += '</ul><div class="row">'
    if (personajes.previous) {
        lista += `<div class="col s6"><a id ="btn-anterior" 
                class="waves-effect waves-light btn red darken-2"
                data-url="${personajes.previous}"><i class="material-icons left">skip_previous</i>Anterior</a></div>`
    }
    if (personajes.next) {
        lista += `<div class="col s6"><a id ="btn-siguiente" 
                class="waves-effect waves-light btn indigo"
                data-url="${personajes.next}"><i class="material-icons right">skip_next</i>Siguiente</a></div></div>`
    }
    return lista
}

async function main(url) {
    let lista = await listapokemon(url)
    document.getElementById("informacion").innerHTML = lista
    let btnSiguiente = document.getElementById("btn-siguiente")
    let btnAnterior = document.getElementById("btn-anterior")
    if (btnSiguiente) {
        btnSiguiente.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
    if (btnAnterior) {
        btnAnterior.addEventListener("click", function() {
            main(this.dataset.url)
        })
    }
}

function cambiarcoloragilbtn(color) {
    let columnas = document.getElementsByClassName("agilebtn")
    for (let i = 0; i < columnas.length; i++) {
        columnas[i].style.backgroundColor = color
    }
}

document.getElementById("miimagen").src =
    "https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=BJIkDzQC6cQSobY1frJDXM$daE2N3K4ZzOUsqbU5sYv0llThVfxEhrxSrkC9nUET6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg"
document.getElementById('div5').addEventListener("click", cambiarPerrito)

async function cambiarPerrito() {
    let perrito = await httpCall('https://dog.ceo/api/breeds/image/random')
    document.getElementById("miimagen").src = perrito.message
}

async function httpCall(URL) {
    let peticion = await fetch(URL)
    let respuesta = await peticion.json()
    console.log(respuesta)
    return respuesta
}

main('https://pokeapi.co/api/v2/pokemon/')