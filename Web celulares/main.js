let id = document.getElementById("id_input");
let marca = document.getElementById("marca_input");
let modelo = document.getElementById("modelo_input");
let color = document.getElementById("color_input");
let almacenamiento = document.getElementById("almacenamiento_input");
let procesador = document.getElementById("procesador_input");

function obtenerInformacion(url){
    axios.get(url)
        .then(function (respuesta) {
            let listaInfo = document.getElementById("tabla_contenido");
            for (let i=0; i<respuesta.data.dispositivos.length; i++) {
                let filaInfo = document.createElement('tr');

                let listID = document.createElement('td');
                listID.textContent = respuesta.data.dispositivos[i].id;
                filaInfo.appendChild(listID);

                let listaMarca = document.createElement('td');
                listaMarca.textContent = respuesta.data.dispositivos[i].marca;
                filaInfo.appendChild(listaMarca);

                let listaModelo = document.createElement('td');
                listaModelo.textContent = respuesta.data.dispositivos[i].modelo;
                filaInfo.appendChild(listaModelo);

                let listaColor = document.createElement('td');
                listaColor.textContent = respuesta.data.dispositivos[i].color;
                filaInfo.appendChild(listaColor);

                let listaAlmacenamiento = document.createElement('td');
                listaAlmacenamiento.textContent = respuesta.data.dispositivos[i].almacenamiento;
                filaInfo.appendChild(listaAlmacenamiento);

                let listaProcesador = document.createElement('td');
                listaProcesador.textContent = respuesta.data.dispositivos[i].procesador;
                filaInfo.appendChild(listaProcesador);

                listaInfo.appendChild(filaInfo);
            }
        })
        .catch(function (error){
            console.log(error)
        }
        )
}

function agregar(){
    let url = ('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id.value)
    fetch(url,{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "id": id.value,
            "marca": marca.value,
            "modelo": modelo.value,
            "color": color.value,
            "almacenamiento": almacenamiento.value,
            "procesador": procesador.value
        })
    })
        .then(response => {
            alert("Dispositivo agregado con éxito", response.data);
            console.log(response.data);
        })
        .catch(error => {
            alert("Error al añadir el dispositivo", error);
        });
}

function eliminar(){
    if (id.value<=10){
        let url = ('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id.value)
        axios.delete(url)
            .then(response => {
                alert("Dispositivo eliminado exitosamente", response.data);
                console.log(response.data);
            })
            .catch(error => {
                alert("Error al eliminar el dispositivo", error);
            });
    }
    else{
        alert("ID inválido.")
    }
}

function modificar(){
    let url = ('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + id.value)
    fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "id": id.value,
            "marca": marca.value,
            "modelo": modelo.value,
            "color": color.value,
            "almacenamiento": almacenamiento.value,
            "procesador": procesador.value
        })
    })
        .then(respuesta => respuesta.json())
        .then(data => alert(JSON.stringify(data, null, 3)))
        .catch(error => console.error("Error:", error))
}


obtenerInformacion('https://my-json-server.typicode.com/fedegaray/telefonos/db');