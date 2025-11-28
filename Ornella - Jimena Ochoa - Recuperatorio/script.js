

let Proximo = (function () {
  var contadorTurnos = 3;
  return function () {
    contadorTurnos++;
    return contadorTurnos;
  };
})();
let viajes=[];
viajes =[
    {
        numero: 1,
        nombre: "Juan Pérez",
        destino: "Guaminí",
        fecha: "2025-12-10",
        transporte: "Avion",
        hotel: true,
        email: "juanperez@gmail.com",
        cantidad: 2,
        codigo: "23A1JJ",
        fechaRegistro:'2025-12-10'
    },
    {
        numero: 2,
        nombre: "María López",
        destino: "mendoza",
        fecha: "2025-11-25",
        transporte: "Colectivo",
        hotel: false,
        email: "marialopez@hotmail.com",
        cantidad: 4,
        codigo: "23A1BB",
        fechaRegistro:'2025-12-10'
    },
    {
        numero: 3,
        nombre: "Carlos García",
        destino: "rosario",
        fecha: "2025-12-01",
        transporte: "Avion",
        hotel: true,
        email: "carlos.garcia@yahoo.com",
        cantidad: 1,
        codigo: "101BJJ",
        fechaRegistro:'2023-12-10'
    }
];
function cargar()
{
    var formulario=document.getElementById('form');
    formulario.addEventListener('submit',function (evento)
    {evento.preventDefault();

    if(document.getElementById("bCargar").style.display !== "none")
    {cargarevento();}
    else{actualizarViaje();}
    })

    let bLimpiar=document.getElementById("bLimpiar");
    bLimpiar.addEventListener("click" , limpiar);

    let bCancelar=document.getElementById("bCancelar");
    bCancelar.addEventListener("click" , cancelar);

    //evento nuevos
    let  chTodos = document.getElementById("checkTodos")
    chTodos.addEventListener("click", actualizarTabla);

    let bFiltrar = document.getElementById("btnFiltrar");
    bFiltrar.addEventListener("click", actualizarTablaFiltro);

    actualizarTabla();

}

function cargarevento()
{
    let nombre=document.getElementById("textnombre").value.trim()
    let destino=document.getElementById("cbdestino").value;
    let fecha= document.getElementById("fechasalida").value;
    let transporte= document.querySelector('input[name="rbtransporte"]:checked').value;
    let hotel=document.getElementById("checkhotel").checked;
    let email=document.getElementById("textemail").value.trim();
    let cantidad= document.getElementById("textcantidad").value;
    let expresion=(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

    // Parcial
    let codigo = document.getElementById("codigo").value;
    let fRegistro = document.getElementById("fRegistro");

    // 2 numeros, 1 num y 1 caracter, 2 num , 2 caracteres, 
    let expCodigo = /^\d{2}([a-zA-Z0-9]){2}[A-Z]{2}$/;

    let i=0;
    let valido=false;
    
    if(codigo === ""){
        alert("Debe ingresar un código.")
    }
    else if(!expCodigo.test(codigo)){
        alert("La expresión del código es inválida.")
    }
    else if (fRegistro === "")
    {
        alert ("la fecha del registro no puede estar vacía.")
    }

    else if (!nombre)
    {
        alert("Por favor complete NOMBRE es un campo obligatorio.");
    }
    else if(!destino)
    {
        alert("Por favor complete DESTINO es un campo obligatorio.");
        
    }
    else if(!fecha)
    {
        alert("Por favor complete FECHA es un campo obligatorio.");
        
    }
    else if(!email)
    {
        alert("Por favor complete EMAIL es un campo obligatorio.");
        
    }
    else if(!cantidad)
    {
        alert("Por favor complete CANTIDAD es un campo obligatorio..");
        
    }
    else if (!expresion.test(email)) 
    {
        alert(" Ingrese un correo válido (ej: nombre@dominio.com)");
        
    }
    else if(existe_vuelo(nombre,fecha)!== -1)
    {
        alert("❌ YA hay un vuelo cargado con ese mismo nombre y fecha");
    }
    else
    {
        valido=true;
    }
    if (valido) 
    {
        let viaje={
        numero:Proximo(),
        nombre:nombre,
        destino:destino,
        fecha:fecha,
        transporte:transporte,
        hotel:hotel,
        email:email,
        cantidad:parseInt(cantidad),
        codigo:codigo,
        fechaRegistro: fRegistro
    }
    viajes.push(viaje);
    alert(`✅ Viaje #${viaje.numero} registrado correctamente para ${nombre}.;`);
    console.log(viajes);
    actualizarTabla(); 
    document.querySelector("form").reset();

    }    
}
function existe_vuelo(nombre,fecha)
{
    let indice=-1;
    let existe=false;
    let i=0;
    while(i<viajes.length && !existe)
    {
        if (viajes[i].nombre.toLowerCase()===nombre.toLowerCase() && viajes[i].fecha === fecha) 
        {
            indice=i;
            existe=true;
        }
        i++;
    }
    return indice;
}


function actualizarTabla() {
    let tabla = document.querySelector("#tablaviajes");

    console.log("actualiza tabla todos");

    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }
    
    //Encabezado
    let encabezado = document.createElement("tr");
    
    let thnombre=document.createElement("th");
    thnombre.appendChild(document.createTextNode("Nombre"));
    encabezado.appendChild(thnombre);
    
    let thfecha=document.createElement("th");
    thfecha.appendChild(document.createTextNode("Fecha"));
    encabezado.appendChild(thfecha);

    //Código 
    let thcodigo=document.createElement("th");
    thcodigo.appendChild(document.createTextNode("Código"));
    encabezado.appendChild(thcodigo);

    //Fecha registro 
    let thregistro=document.createElement("th");
    thregistro.appendChild(document.createTextNode("Fecha Registro"));
    encabezado.appendChild(thregistro);

    let thdestino=document.createElement("th");
    thdestino.appendChild(document.createTextNode("Destino"));
    encabezado.appendChild(thdestino);

    let theditar=document.createElement("th");
    theditar.appendChild(document.createTextNode("Editar"));
    encabezado.appendChild(theditar);

    let theliminar=document.createElement("th");
    theliminar.appendChild(document.createTextNode("Eliminar"));
    encabezado.appendChild(theliminar);

    tabla.appendChild(encabezado);

    if (viajes.length === 0) {
        let fila= document.createElement("tr");
        let celda=document.createElement("td");
        
        celda.setAttribute("colspan" , "5");
        celda.appendChild(document.createTextNode("No hay viajes registrados"));
        fila.appendChild(celda);
        tabla.appendChild(fila)
        return;
    }
    let i=0;
    while(i<viajes.length)
    {
        let fila = document.createElement("tr");
        let idx = i;  
        let tdnombre=document.createElement("td");
        tdnombre.appendChild(document.createTextNode(viajes[i].nombre));
        fila.appendChild(tdnombre);

        let tdfecha=document.createElement("td");
        tdfecha.appendChild(document.createTextNode(viajes[i].fecha));
        fila.appendChild(tdfecha);

        // campo codigo en datos
        let tdcodigo=document.createElement("td");
        tdcodigo.appendChild(document.createTextNode(viajes[i].codigo));
        fila.appendChild(tdcodigo);

        // campo fecha registro en datos 
        let tdfRegistro=document.createElement("td");
        tdfRegistro.appendChild(document.createTextNode(viajes[i].fechaRegistro));
        fila.appendChild(tdfRegistro);

        let tddestino=document.createElement("td");
        tddestino.appendChild(document.createTextNode(viajes[i].destino));
        fila.appendChild(tddestino);

        let tdeditar=document.createElement("td");
        let botoneditar=document.createElement("button")
        botoneditar.appendChild(document.createTextNode("✏"));
        botoneditar.setAttribute("type", "button");
        botoneditar.addEventListener("click", ()=>editarViaje(idx));
        tdeditar.appendChild(botoneditar);
        fila.appendChild(tdeditar);

        let tdeliminar = document.createElement("td");
        let botoneliminar = document.createElement("button");
        botoneliminar.appendChild(document.createTextNode("❌"));
        botoneliminar.setAttribute("type", "button");
        botoneliminar.addEventListener("click", ()=>eliminarViaje(idx));
        tdeliminar.appendChild(botoneliminar);
        fila.appendChild(tdeliminar);
        
        tabla.appendChild(fila);
        i++;
    }
    
}
function eliminarViaje(indice) 
{
    let confirmar = confirm(`¿Seguro que desea eliminar el evento "${viajes[indice].nombre}"?`);
    if (confirmar) {
        let nuevosViajes = [];
        let i=0;
        while(i<viajes.length)
        {
            if (i !== indice) 
            { 
                nuevosViajes.push(viajes[i]);
            }
            i++;
        }
        viajes = nuevosViajes; 
        alert("Viaje eliminado correctamente ✅");
        actualizarTabla();
    }
}
function editarViaje(i)
{
    let viaje = viajes[i];
    document.getElementById("indicevuelo").value=i;
    
    document.getElementById("textnombre").value = viaje.nombre;
    document.getElementById("cbdestino").value = viaje.destino;
    document.getElementById("fechasalida").value = viaje.fecha;
    document.querySelector(`input[name='rbtransporte'][value='${viaje.transporte}']`).checked = true;
    document.getElementById("checkhotel").checked = viaje.hotel;
    document.getElementById("textemail").value = viaje.email;
    document.getElementById("textcantidad").value = viaje.cantidad;

    //campos parcial
    document.getElementById("codigo").value = viaje.codigo;
    document.getElementById("fRegistro").value = viaje.fechaRegistro;

    document.querySelector("#bCargar").style.display = "none";
    document.querySelector("#bActualizar").style.display = "inline-block";
    document.getElementById("bLimpiar").style.display = "inline-block";
    document.getElementById("bCancelar").style.display="none"; 
}
function actualizarViaje() {
    let indice= parseInt(document.getElementById("indicevuelo").value);
    let nombre = document.getElementById("textnombre").value.trim();
    let destino = document.getElementById("cbdestino").value;
    let fecha = document.getElementById("fechasalida").value;
    let transporte = document.querySelector('input[name="rbtransporte"]:checked').value;
    let hotel = document.getElementById("checkhotel").checked;
    let email = document.getElementById("textemail").value.trim();
    let cantidad =document.getElementById("textcantidad").value;
    let expresion=(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let valido=false;

        // Parcial
    let codigo = document.getElementById("codigo").value;
    let fRegistro = document.getElementById("fRegistro").value;
    // 2 numeros, 1 num y 1 caracter, 2 num , 2 caracteres, 
    let expCodigo = /^\d{2}([a-zA-Z0-9]){2}[A-Z]{2}$/;

    
    if(codigo === ""){
        alert("Debe ingresar un código.")
    }
    else if(!expCodigo.test(codigo)){
        alert("La expresión del código es inválida.")
    }
    else if (fRegistro === "")
    {
        alert ("la fecha del registro no puede estar vacía.")
    }

    else if (!nombre)
    {
        alert("Por favor complete NOMBRE es un campo obligatorio.");
    }
    else if(!destino)
    {
        alert("Por favor complete DESTINO es un campo obligatorio.");
        
    }
    else if(!fecha)
    {
        alert("Por favor complete FECHA es un campo obligatorio.");
        
    }
    else if(!email)
    {
        alert("Por favor complete EMAIL es un campo obligatorio.");
        
    }
    else if(!cantidad)
    {
        alert("Por favor complete CANTIDAD es un campo obligatorio..");
        
    }
    else if (!expresion.test(email)) 
    {
        alert(" Ingrese un correo válido (ej: nombre@dominio.com)");
        
    }
    else
    {
        let indiceExistente = existe_vuelo(nombre,fecha);

        if (indiceExistente !== -1 && indiceExistente !== indice) {
            alert("❌ Ya existe un vuelo con ese nombre y fecha");
        } else {
            valido = true;
        }
    }
    if (valido) 
    {
        viajes[indice].nombre = nombre;
        viajes[indice].destino = destino;
        viajes[indice].fecha = fecha;
        viajes[indice].transporte = transporte;
        viajes[indice].hotel = hotel;
        viajes[indice].email = email;
        viajes[indice].cantidad = cantidad;

        //agregado parcial
        viajes[indice].codigo = codigo;
        viajes[indice].fechaRegistro = fRegistro;


        alert(`✅ Viaje #${viajes[indice].numero} registrado correctamente para ${nombre}.;`);
        actualizarTabla();
        document.querySelector("form").reset();
        document.querySelector("#bActualizar").style.display = "none";
        document.querySelector("#bCargar").style.display = "inline-block";
        document.querySelector("#bCancelar").style.display = "inline-block";
        document.querySelector("#bLimpiar").style.display="none"
        document.getElementById("indicevuelo").value="";
    
    }
}
function limpiar()
{
    document.querySelector("form").reset();
    document.getElementById("indicevuelo").value="";
    document.getElementById("bActualizar").style.display="none";
    document.getElementById("bCargar").style.display="inline-block";
    document.getElementById("bLimpiar").style.display="none";
    document.getElementById("bCancelar").style.display="inline-block";
    alert("Edicion cancelada. NO se modifico el viaje")
}

function cancelar()
{
    let confirmar = confirm(`¿Seguro que desea borrar los campos"?`);
    if (confirmar)
    {
        document.querySelector("form").reset();
        alert("Datos eliminados correctamente de los campos");
    }
}

function checkDesdeHasta(desde,hasta){
    console.log("Ingresó a checkdesdeHasta");
    console.log("desde:"+ desde);
    console.log("hasta:"+ hasta);

    let devuelve = false;

    if(desde === "") {
        alert("Por favor ingrese el desde para filtrar")
    }

    else if (hasta===""){
        alert("Por favor ingrese el hasta para filtrar")
    }
    else {

        //formatear los datos por parametro como tipo fecha  
        const fDesde = new Date(desde);
        const fHasta = new Date(hasta);

        if (fHasta > fDesde){
        alert("La fecha DESDE seleccionada no puede ser menor a la fecha HASTA")
    }
    else devuelve = true;

    return devuelve;
}}

function actualizarTablaFiltro(){

    const fdesde = document.getElementById("registroDesde");
    const fhasta = document.getElementById("registroHasta");


    console.log("entró al actualizarTablaFiltro")

    
    if(checkDesdeHasta(fdesde,fhasta))
        {
        let tabla = document.querySelector("#tablaviajes");

        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
        
        //Encabezado
        let encabezado = document.createElement("tr");
        
        let thnombre=document.createElement("th");
        thnombre.appendChild(document.createTextNode("Nombre"));
        encabezado.appendChild(thnombre);
        
        let thfecha=document.createElement("th");
        thfecha.appendChild(document.createTextNode("Fecha"));
        encabezado.appendChild(thfecha);

        //Código 
        let thcodigo=document.createElement("th");
        thcodigo.appendChild(document.createTextNode("Código"));
        encabezado.appendChild(thcodigo);

        //Fecha registro 
        let thregistro=document.createElement("th");
        thregistro.appendChild(document.createTextNode("Fecha Registro"));
        encabezado.appendChild(thregistro);

        let thdestino=document.createElement("th");
        thdestino.appendChild(document.createTextNode("Destino"));
        encabezado.appendChild(thdestino);

        let theditar=document.createElement("th");
        theditar.appendChild(document.createTextNode("Editar"));
        encabezado.appendChild(theditar);

        let theliminar=document.createElement("th");
        theliminar.appendChild(document.createTextNode("Eliminar"));
        encabezado.appendChild(theliminar);

        tabla.appendChild(encabezado);

        if (viajes.length === 0) {
            let fila= document.createElement("tr");
            let celda=document.createElement("td");
            
            celda.setAttribute("colspan" , "5");
            celda.appendChild(document.createTextNode("No hay viajes registrados"));
            fila.appendChild(celda);
            tabla.appendChild(fila)
            return;
        }
        let i=0;
        while(i<viajes.length)
        {

            if(viajes[i].fechaRegistro> fdesde.value && viajes[i].fechaRegistro<fhasta.value){
                    let fila = document.createElement("tr");
                    let idx = i;  
                    let tdnombre=document.createElement("td");
                    tdnombre.appendChild(document.createTextNode(viajes[i].nombre));
                    fila.appendChild(tdnombre);

                    let tdfecha=document.createElement("td");
                    tdfecha.appendChild(document.createTextNode(viajes[i].fecha));
                    fila.appendChild(tdfecha);

                    // campo codigo en datos
                    let tdcodigo=document.createElement("td");
                    tdcodigo.appendChild(document.createTextNode(viajes[i].codigo));
                    fila.appendChild(tdcodigo);

                    // campo fecha registro en datos 
                    let tdfRegistro=document.createElement("td");
                    tdfRegistro.appendChild(document.createTextNode(viajes[i].fechaRegistro));
                    fila.appendChild(tdfRegistro);

                    let tddestino=document.createElement("td");
                    tddestino.appendChild(document.createTextNode(viajes[i].destino));
                    fila.appendChild(tddestino);

                    let tdeditar=document.createElement("td");
                    let botoneditar=document.createElement("button")
                    botoneditar.appendChild(document.createTextNode("✏"));
                    botoneditar.setAttribute("type", "button");
                    botoneditar.addEventListener("click", ()=>editarViaje(idx));
                    tdeditar.appendChild(botoneditar);
                    fila.appendChild(tdeditar);

                    let tdeliminar = document.createElement("td");
                    let botoneliminar = document.createElement("button");
                    botoneliminar.appendChild(document.createTextNode("❌"));
                    botoneliminar.setAttribute("type", "button");
                    botoneliminar.addEventListener("click", ()=>eliminarViaje(idx));
                    tdeliminar.appendChild(botoneliminar);
                    fila.appendChild(tdeliminar);
                    
                    tabla.appendChild(fila);
                    
                }
                i++; //ésto me generaba el bucle infinito
        }
        
    } // cierre if 
}

//set Fecha Mínima y Máxima en el calendario de registro
    let fRegistro = document.getElementById("fRegistro");

    //Limitante hasta hoy
    let maximo = new Date();
    maximo.setHours(0,0,0,0)
    fRegistro.max = maximo.toISOString().split("T")[0];

    // 10 dias antes
    let minimo = new Date();
    minimo.setDate(minimo.getDate() - 10);
    fRegistro.min = minimo.toISOString().split("T")[0];

