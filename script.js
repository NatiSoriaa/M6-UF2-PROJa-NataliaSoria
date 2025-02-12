window.onload = () => {
    comunidadesAutonomas();
    document.getElementById('ccaa').addEventListener('change', provincias);
    document.getElementById('provincia').addEventListener('change', poblaciones);
    document.getElementById('submit').addEventListener('click', recibirImagenes);
}


async function comunidadesAutonomas(){
    let jsonComunidades = `https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/ccaa.json`;
    let response = await fetch(jsonComunidades);
    let comunidades = await response.json();
    
    let selectComunidad = document.getElementById('ccaa');
    selectComunidad.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';

    comunidades.forEach (comunidad => {
        let option = document.createElement('option');
        option.value = comunidad.code;
        option.textContent = comunidad.label;
        selectComunidad.appendChild(option);
    })
}



async function provincias(){
    let comunidadSeleccionada = document.getElementById('ccaa').value;
    let jsonProvincias = `https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/provincias.json`;
    let response = await fetch(jsonProvincias);
    let provincias = await response.json();

    let selectProvincia = document.getElementById('provincia');
    selectProvincia.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';

    provincias.forEach (provincia => {
        if (provincia.parent_code === comunidadSeleccionada){
            let option = document.createElement('option');
            option.value = provincia.code;
            option.textContent = provincia.label;
            selectProvincia.appendChild(option);
        }
    })
}




async function poblaciones(){
    let provinciaSeleccionada = document.getElementById('provincia').value;
    let jsonPoblacion = `https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/poblaciones.json`;
    let response = await fetch(jsonPoblacion);
    let poblaciones = await response.json();

    let selectPoblacion = document.getElementById('poblacion');
    selectPoblacion.innerHTML = '<option value="" disabled selected>Selecciona una opción</option>';

    poblaciones.forEach (poblacion => {
        if (poblacion.parent_code === provinciaSeleccionada){
            let option = document.createElement('option');
            option.value = poblacion.label;
            option.textContent = poblacion.label;
            selectPoblacion.appendChild(option);
        } 
    })
}


async function recibirImagenes(event) {
    event.preventDefault();

    let poblacionSeleccionada = document.getElementById('poblacion').value; 

    let url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=images&titles=${encodeURIComponent(poblacionSeleccionada)}&gimlimit=10&prop=imageinfo&iiprop=url`;
    let response = await fetch(url);
    let data = await response.json();  

    let containerImagenes = document.getElementById('image-container');
    containerImagenes.innerHTML = '';  

    if (data.query && data.query.pages) {
        let pages = data.query.pages;
        let imagesFound = false;  

        for (let pageId in pages) {
            let page = pages[pageId];
            if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
                let imageBox = document.createElement('div');
                imageBox.classList.add('image-box');
                let imagen = document.createElement('img');
                imagen.classList.add('image-box');
                imagen.src = page.imageinfo[0].url; 
                imagen.alt = poblacionSeleccionada;  
                containerImagenes.appendChild(imagen);
                imagesFound = true;
            }
        }
        if (!imagesFound) {
            containerImagenes.innerHTML = "<p>No se encontraron imágenes para la poblacion seleccionada.</p>";
        }
    } else {
        containerImagenes.innerHTML = "<p>No se encontraron imágenes para la poblacion seleccionada.</p>";
    }
}