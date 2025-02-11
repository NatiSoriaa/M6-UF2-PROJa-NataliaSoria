window.onload = () => {
    comunidadesAutonomas();
    provincias();
    poblaciones();
    // recibirImagenes()
}


async function comunidadesAutonomas(){
    let jsonComunidades = 'https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/ccaa.json';
    let resolve = await fetch(jsonComunidades);
    let comunidades = await resolve.json();

    agregarComunidades(comunidades);
}
function agregarComunidades(comunidades){
    let selectComunidad = document.getElementById('ccaa');

    comunidades.forEach (comunidad => {

        let option = document.createElement('option');
        option.append(comunidad.label)
        selectComunidad.appendChild(option);
    })
}



async function provincias(){
    let jsonProvincias = 'https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/provincias.json';
    let resolve = await fetch(jsonProvincias);
    let provincias = await resolve.json();

    agregarProvincias(provincias);
}
function agregarProvincias(provincias){
    let selectProvincia = document.getElementById('provincia');

    provincias.forEach (provincia => {

        let option = document.createElement('option');
        option.append(provincia.label)
        selectProvincia.appendChild(option);
    })
}



async function poblaciones(){
    let jsonPoblacion = 'https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/poblaciones.json';

    let resolve = await fetch(jsonPoblacion);
    let poblaciones = await resolve.json();

    agregarPoblacion(poblaciones);
}
function agregarPoblacion(poblaciones){
    let selectPoblacion = document.getElementById('poblacion');

    poblaciones.forEach (poblacion => {

        let option = document.createElement('option');
        option.append(poblacion.label)
        selectPoblacion.appendChild(option);
    })
}


// async function recibirImagenes(){
//     let url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=images&titles=${encodeURIComponent(poblacio)}&gimlimit=10&prop=imageinfo&iiprop=url';
//     let resolve = await fetch(url);
//     let imagenes = await resolve.json();
    
//     mostrarImagenes(imagenes);
// }
// function clickEnviar(){
//     let enviar = document.getElementById('submit');
//     enviar.addEventListener('click', mostrarImagenes);
// }
// function mostrarImagenes(imagenes){
//     let containerImagenes = document.getElementById('image-container');
    
//     imagenes.forEach (img => {
//         let imagen = document.createElement('img');
//         imagen.append(img);
//         containerImagenes.appendChild(imagen);
//     });
// }