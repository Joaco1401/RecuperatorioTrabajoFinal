// #region ---- VARIABLES GLOBALES ----
const listadoProductos= [];

// #region ---- FUNCIONES PRINCIPALES----
const dibujarTabla = () => {
    console.log("Dibujando tabla...");

    const tabla = document.getElementById("elementosTabla")

    // Limpia la tabla 
    while(tabla.firstChild)
        tabla.removeChild(tabla.firstChild)

    //Crea encabezado
    const encFila = document.createElement("tr");

    const encID = document.createElement("th");
    encID.textContent = "ID";

    const encNombre = document.createElement("th");
    encNombre.textContent = "Nombre";
    encNombre.style.background = "#d4edda"

    const encCategoria = document.createElement("th");
    encCategoria.textContent = "Categoria";

    const encPrecioVenta = document.createElement("th");
    encPrecioVenta.textContent = "Precio Venta";

    const encEditar = document.createElement("th");
    encEditar.textContent = "Editar";

    const encEliminar = document.createElement("th");
    encEliminar.textContent = "Eliminar";

    //Asigna valores a la fila creada
    encFila.appendChild(encID);
    encFila.appendChild(encNombre);
    encFila.appendChild(encCategoria);
    encFila.appendChild(encPrecioVenta);
    encFila.appendChild(encEditar);
    encFila.appendChild(encEliminar);

    //enlaza el encabezado a la tabla
    tabla.appendChild(encFila);

    // Recorrer el array 'listadoProductos'
    listadoProductos.forEach((producto) => {
        
        // Crea la fila (<tr>) y celdas (<td>) seteando texto
        const fila = document.createElement("tr");

        //celda ID
        const tdId = document.createElement("td");
        tdId.textContent = producto.id;

        // Celda Nombre
        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;
        tdNombre.style.background = "#d4edda"

        // Celda Categoría
        const tdCategoria = document.createElement("td");
        tdCategoria.textContent = producto.categoria;

        // Celda Venta
        const tdVenta = document.createElement("td");
        tdVenta.textContent = producto.venta;
        
        // ---- Celda Editar ----
        const tdEditar = document.createElement("td");
        const imgEditar = document.createElement("img");
        imgEditar.setAttribute("src", "img/edit.svg"); // 
        imgEditar.setAttribute("alt", "Editar"); // 
        imgEditar.classList.add("icono-accion");

        imgEditar.addEventListener("click", () => {
            prepararEdicion(producto.id);
        });
        tdEditar.appendChild(imgEditar); // 

        // ---- Celda Eliminar  ----
        const tdEliminar = document.createElement("td");
        const imgEliminar = document.createElement("img");
        imgEliminar.setAttribute("src", "img/delete.svg"); // 
        imgEliminar.setAttribute("alt", "Eliminar"); // 
        imgEliminar.classList.add("icono-accion");
        imgEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });
        tdEliminar.appendChild(imgEliminar); // 

        // Agrega celda a filas
        fila.appendChild(tdId);
        fila.appendChild(tdNombre);
        fila.appendChild(tdCategoria);
        fila.appendChild(tdVenta);
        fila.appendChild(tdEditar);
        fila.appendChild(tdEliminar);

        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    });
};

/**
 * Se llama al hacer click en la img delete.svg
 * Busca y elimina un producto por su ID.
 */
const eliminarProducto = (id) => {
    
    const confirmar = confirm(`¿Estás seguro que querés eliminar el producto ID ${id}?`);
    

    if (!confirmar) {
        console.log("Eliminación cancelada.");
    } 
    else {

        // Busca la posición del producto en el array con finIndex
        //si por alguna razón, index es -1, el .splice BORRARÍA TODO EL ARREGLO.
        const index = listadoProductos.findIndex((producto) => producto.id === id);

        // Si no lo encontró, devuelve -1.
        if (index === -1) {
            console.error("Error: No se encontró el producto a eliminar.");
            } 
            else {
                // Corta el producto del array ORIGINAL, sin dejar espacios
                // .splice(posicion, cuantosBorro DESDE esa posición)
                listadoProductos.splice(index, 1);
                console.log("Array actualizado:", listadoProductos);

                dibujarTabla();

                mostrarExito(`¡Producto ID ${id} eliminado con éxito!`);
            }
        }
};

/*
 * Se llama al hacer click en la img 'edit.svg'
 */
const prepararEdicion = (id) => {
    console.log("Editando ID:", id);

    // DOM
    const iNombre = document.getElementById("nombreProducto");
    const iCategoria = document.getElementById("Categoria");
    const iPrecioCosto = document.getElementById("precioCosto");
    const iPrecioVenta = document.getElementById("precioVenta");
    const iUltimaCompraDate = document.getElementById("ultimaCompra");
    const iDisponible = document.getElementById("checkDisponible");

    const btnGuardar = document.getElementById("btnGuardar");
    const btnActualizar = document.getElementById("btnActualizar");
    const iProdOculto = document.getElementById("idProductoHidden")
    // Buscar el producto en el array 
    const productoAEditar = listadoProductos.find((producto) => producto.id === id);

    // si no lo encuentra
    if (!productoAEditar) {
        console.error("Error: No se encontró el producto para editar.");
        mostrarError("Error: No se pudo cargar el producto.");
    } else {

        console.log("Datos a cargar:", productoAEditar);

        // Rellena el formulario con sus datos
        iNombre.value = productoAEditar.nombre;
        iCategoria.value = productoAEditar.categoria;
        iPrecioCosto.value = productoAEditar.costo;
        iPrecioVenta.value = productoAEditar.venta;
        iUltimaCompraDate.value = productoAEditar.fechaCompra;
        iDisponible.checked = productoAEditar.disponible; 

        // Rellena los radios
        const todosLosRadios = document.getElementsByName("rbTipoPan");
        for (let i = 0; i < todosLosRadios.length; i++) {
            if (todosLosRadios[i].value === productoAEditar.tipoPan) {
                todosLosRadios[i].checked = true;
            } else {
                todosLosRadios[i].checked = false;
            }
        }
        
        //actualizacion rb
        toggleVisorPan();

        // Ocultar Guardar y Mostrar Actualizar
        btnGuardar.style.display = "none";
        btnActualizar.style.display = "inline-block"; 

        // set el id que estamos editando
        iProdOculto.value = id;
    }
};

const validarCampos = () => {
    limpiarErrores();

    // DOM
    const iNombre = document.getElementById("nombreProducto");
    const iCategoria = document.getElementById("Categoria");
    const iPrecioCosto = document.getElementById("precioCosto");
    const iPrecioVenta = document.getElementById("precioVenta");
    const iUltimaCompraDate = document.getElementById("ultimaCompra");
    const iDisponible = document.getElementById("checkDisponible");
    const iProdOculto = document.getElementById("idProductoHidden");

    // Valores 
    const regexNumeros = /^\d+(\.\d+)?$/;
    const nombre = iNombre.value.trim();
    const categoria = iCategoria.value;
    const PrecioCosto = iPrecioCosto.value.trim();
    const PrecioVenta = iPrecioVenta.value.trim();
    const UltimaCompraDate = iUltimaCompraDate.value;
    const disponible = iDisponible.checked;

    // Buscamos si existe (para usarlo en el if)
    const yaExiste = listadoProductos.find(
        (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );

    // resolucion radio button 
    const todosLosRadios = document.getElementsByName("rbTipoPan");
    let tipoPan = "";
    let radioEncontrado = false;
    for (let i = 0; i < todosLosRadios.length && !radioEncontrado; i++) {
        if (todosLosRadios[i].checked) {
            tipoPan = todosLosRadios[i].value;
            radioEncontrado = true;
        }
    }

    // Validacion en cadena
    
    if (nombre === "") {                                            // 1. Nombre vacío
        mostrarError("El campo 'Nombre' no puede estar vacío.", iNombre);
        return null;

    } else if (yaExiste && yaExiste.id !== Number(iProdOculto.value)) { // 2. Nombre repetido
        mostrarError("No puede haber 2 productos con el mismo nombre.", iNombre);
        return null;

    } else if (categoria === "") {                                  // 3. Categoría vacía
        mostrarError("Debe seleccionar una 'Categoría'.", iCategoria);
        return null;

    } else if (PrecioCosto === "") {                                // 4. Costo vacío
        mostrarError("El campo 'Precio Costo' no puede estar vacío.", iPrecioCosto);
        return null;

    } else if (!regexNumeros.test(PrecioCosto)) {                   // 5. Costo formato
        mostrarError("El 'Precio Costo' solo puede contener números.", iPrecioCosto);
        return null;

    } else if (PrecioVenta === "") {                                // 6. Venta vacío
        mostrarError("El campo 'Precio Venta' no puede estar vacío.", iPrecioVenta);
        return null;

    } else if (!regexNumeros.test(PrecioVenta)) {                   // 7. Venta formato
        mostrarError("El 'Precio Venta' solo puede contener números.", iPrecioVenta);
        return null;

    } else if (UltimaCompraDate === "") {                           // 8. Fecha vacía
        mostrarError("Debe seleccionar una fecha de 'Última Compra'.", iUltimaCompraDate);
        return null;

    } else if (!radioEncontrado && categoria === "Hamburguesas") {  // 9. Radio Button
        mostrarError("Debe seleccionar un 'Tipo de Pan' para hamburguesas.", null);
        return null;

    } else {
        // --- ÉXITO
        return { nombre, categoria, PrecioCosto, PrecioVenta, UltimaCompraDate, disponible, tipoPan };
    }
};

// Crea el objeto y lo pushea al array.
const agregarProductoAlListado = (datosFormulario) => {
    
    let resultado = false;

        // ---- CREAR OBJETO ----
        const nuevoProducto = {
            id: proximoID(),
            nombre: datosFormulario.nombre,
            categoria: datosFormulario.categoria,
            costo: datosFormulario.PrecioCosto,
            venta: datosFormulario.PrecioVenta,
            fechaCompra: datosFormulario.UltimaCompraDate,
            tipoPan: datosFormulario.tipoPan,
            disponible: datosFormulario.disponible 
        };

        // ---- PUSHEA AL ARRAY ----
        listadoProductos.push(nuevoProducto);
        console.log("Array actualizado:", listadoProductos);
        console.log("Se agregó elemento al array");
        console.log("Recargando tabla");
        resultado = true; // Se agregó con éxito!

    return resultado;
};

/**
 * Función principal para validar y guardar el producto.
 * Se ejecuta al hacer click en "Guardar".
 */
const guardarProducto = () => {
    /* 1. validarCampos()
        2. agregarProductoAlListado(datosValidados)
        3. termina guardarProducto()
     */

    //valida los campos. Si está ok, devuelve el objeto 
    const datosValidados = validarCampos();

     //  Si devuelve 'null', hubo un error.
    if (datosValidados === null) {
        console.error("Validación falló.");
    } else 
        {
        // ---- AGREGA ELEMENTO AL ARRAY ----
        agregarProductoAlListado(datosValidados); 

        dibujarTabla();
        limpiarFormulario();
        mostrarExito("Producto registrado con éxito!");
    }
};

// Boton EDIT
const actualizarProducto = () => {
    const iProdOculto = document.getElementById("idProductoHidden")

    // Si idEnEdicion es 0, algo salió mal
    if (Number(iProdOculto.value) === 0) {
        mostrarError("Error: No hay ningún producto seleccionado para actualizar.");
    } else {

            // validaDatos
            const datosValidados = validarCampos();

            // devuelve 'null', hubo un error.
            if (datosValidados === null) {
                console.error("Validación falló.");
            } else {

                // ---- ACTUALIZAR EL OBJETO ----
                const productoAActualizar = listadoProductos.find((p) => p.id === Number(iProdOculto.value));
                
                // Pisa sus valores
                productoAActualizar.nombre = datosValidados.nombre;
                productoAActualizar.categoria = datosValidados.categoria;
                productoAActualizar.costo = datosValidados.PrecioCosto;
                productoAActualizar.venta = datosValidados.PrecioVenta;
                productoAActualizar.fechaCompra = datosValidados.UltimaCompraDate;
                productoAActualizar.tipoPan = datosValidados.tipoPan;
                productoAActualizar.disponible = datosValidados.disponible;

                // ---- FINALIZAR ----
                dibujarTabla();
                limpiarFormulario();
                mostrarExito("¡Producto actualizado con éxito!");
                console.log("Array actualizado:", listadoProductos);
            }
    }
}; // #endregion

// #region ---- FUNCIONES AYUDA----

 // Genera un ID único para el próximo producto. (registro de eventos)
const proximoID = (function() {
    let contador = 0; 

    return function() { 
        contador++;
        return contador;
    };
})();

/*
 * 
 * Recibe 2 parámetros: el texto y el input a marcar.
 */
const mostrarError = (mensaje, input) => {
    const msgError = document.getElementById("mjeError");

    msgError.textContent = mensaje;
    msgError.style.display = "inline-block";

    // Resaltamos el input (si es que pasamos uno)
    if (input) {
        input.classList.add("error-input");
    }
};

/**
 * Muestra un mensaje de éxito
 */
const mostrarExito = (mensaje) => {
    const msgExito = document.getElementById("mjeExito");
    
    msgExito.textContent = mensaje;
    msgExito.style.display = "inline-block";

    //saca el cartelito luego de 4seg
    setTimeout(() => { limpiarErrores(); }, 4000);
};

    /**
 * Oculta el mensaje de error/exito y quita el resaltado de TODOS los campos.
 */
const limpiarErrores = () => {
    //DOM
    const msgExito = document.getElementById("mjeExito");
    const msgError = document.getElementById("mjeError");
    const iNombre = document.getElementById("nombreProducto");
    const iCategoria = document.getElementById("Categoria");
    const iPrecioCosto = document.getElementById("precioCosto");
    const iPrecioVenta = document.getElementById("precioVenta");
    const iUltimaCompraDate = document.getElementById("ultimaCompra");
    
    // Limpio msgError y quitamos la clase .error-input de todos los campos
    msgError.textContent = "";
    msgError.style.display = "none";
    msgExito.textContent = "";
    msgExito.style.display = "none";

    iNombre.classList.remove("error-input");
    iCategoria.classList.remove("error-input");
    iPrecioCosto.classList.remove("error-input");
    iPrecioVenta.classList.remove("error-input");
    iUltimaCompraDate.classList.remove("error-input");
    };

const limpiarFormulario = () => {
    //DOM
        const formulario = document.getElementById("form");
        const btnGuardar = document.getElementById("btnGuardar");
        const btnActualizar = document.getElementById("btnActualizar");
        const iProdOculto = document.getElementById("idProductoHidden")

        formulario.reset(); // Limpia inputs
        
        iProdOculto.value = "";

        // Resetea los botones actualizar y mostrar
        btnGuardar.style.display = "inline-block"; 
        btnActualizar.style.display = "none";

        // Resetea el disable del radio button
        toggleVisorPan();

        limpiarErrores();
    };

 // Muestra u oculta el DIV del pan según la categoría seleccionada.
const toggleVisorPan = () => {
    const divGrupoPan = document.getElementById("rbBurger");
    const iCategoria = document.getElementById("Categoria");

    // leo el valor del <select>
    const categoria = iCategoria.value;

    // agarro TODOS los radios que están DENTRO del div
    const radiosDelPan = divGrupoPan.querySelectorAll('input[type="radio"]');

    // 
    if (categoria === "Hamburguesas") {
        // se HABILITA
        divGrupoPan.classList.remove("grupo-deshabilitado");
        
        // Recorremos los radios y les sacamos el 'disabled'
        radiosDelPan.forEach((radio) => {
            radio.disabled = false;
        });

    } else {
        // se DESHABILITA
        divGrupoPan.classList.add("grupo-deshabilitado");
        
        // Recorremos los radios y los deshabilitamos
        radiosDelPan.forEach((radio) => {
            radio.disabled = true;
            radio.checked = false; // (destilda si quedó algo)
        });
    }
}
// #endregion

// #region ---- BUTTON EVENT LISTENERS ----
    //DOM
    const btnGuardar = document.getElementById("btnGuardar");
    const btnActualizar = document.getElementById("btnActualizar");
    const btnCancelar = document.getElementById("btnCancelar");
    const iCategoria = document.getElementById("Categoria");

    btnGuardar.addEventListener("click", guardarProducto);
    btnActualizar.addEventListener("click", actualizarProducto);
    btnCancelar.addEventListener("click",limpiarFormulario)
    iCategoria.addEventListener("change", toggleVisorPan); //para el efecto disabled en los rButton
//#endregion