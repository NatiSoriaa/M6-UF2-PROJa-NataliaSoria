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
    selectComunidad.innerHTML = '<option value="" disabled selected>Selecciona una comunidad</option>';

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
    selectProvincia.innerHTML = '<option value="" disabled selected>Selecciona una provincia</option>';

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
    selectPoblacion.innerHTML = '<option value="" disabled selected>Selecciona una población</option>';

    poblaciones.forEach (poblacion => {
        if (poblacion.parent_code === provinciaSeleccionada){
            let option = document.createElement('option');
            option.value = poblacion.code;
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


    for (let pageId in data.query.pages) {
        let page = data.query.pages[pageId];
        if (page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url) {
            let imagen = document.createElement('img');  
            imagen.src = page.imageinfo[0].url;  
            imagen.alt = poblacionSeleccionada;  
            containerImagenes.appendChild(imagen);  
        } 
    }
}
