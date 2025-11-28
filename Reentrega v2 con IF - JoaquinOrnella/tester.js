/*
    TESTER.JS - Inyector de datos de prueba
*/

// Datos simulados
// Nota: Los IDs acá son irrelevantes porque se generarán nuevos automáticamente.
const mockProductos = [
    {
        nombre: "Burger Clásica",
        categoria: "Hamburguesas",
        costo: "1500",
        venta: "3000",
        fechaCompra: "2025-10-01",
        tipoPan: "Árabe",
        disponible: true
    },
    {
        nombre: "Doble Cheddar",
        categoria: "Hamburguesas",
        costo: "2000",
        venta: "4000",
        fechaCompra: "2025-10-01",
        tipoPan: "Árabe",
        disponible: true
    },
    {
        nombre: "Coca-Cola 500ml",
        categoria: "Bebidas",
        costo: "500",
        venta: "1000",
        fechaCompra: "2025-10-02",
        tipoPan: "No Aplica", 
        disponible: true
    },
    {
        nombre: "Agua 500ml",
        categoria: "Bebidas",
        costo: "400",
        venta: "800",
        fechaCompra: "2025-10-02",
        tipoPan: "No Aplica",
        disponible: true
    },
    {
        nombre: "Flan con Crema",
        categoria: "Postres",
        costo: "700",
        venta: "1400",
        fechaCompra: "2025-10-03",
        tipoPan: "No Aplica",
        disponible: false 
    },
    {
        nombre: "Hamburguesa Veggie",
        categoria: "Hamburguesas",
        costo: "1800",
        venta: "3600",
        fechaCompra: "2025-10-01",
        tipoPan: "Quemado",
        disponible: true
    },
    {
        nombre: "Cerveza Lata",
        categoria: "Bebidas",
        costo: "600",
        venta: "1200",
        fechaCompra: "2025-10-02",
        tipoPan: "No Aplica",
        disponible: true
    },
];

window.onload = () => {
    console.log("Tester.js cargado 🚀 Inyectando datos...");

    // Verificamos que existan las funciones del script principal
    if (typeof agregarProductoAlListado !== 'undefined' && typeof dibujarTabla !== 'undefined') {
        
        mockProductos.forEach((producto) => {
            
            //Creamos un objeto con las claves que espera 'agregarProductoAlListado'
            const datosParaCargar = {
                nombre: producto.nombre,
                categoria: producto.categoria,
                PrecioCosto: producto.costo,        // Mapeo clave
                PrecioVenta: producto.venta,        // Mapeo clave
                UltimaCompraDate: producto.fechaCompra, // Mapeo clave
                tipoPan: producto.tipoPan,
                disponible: producto.disponible
            };
            agregarProductoAlListado(datosParaCargar);
        });

        // Dibujamos la tabla al final de todo el proceso
        dibujarTabla();
        console.log("Datos inyectados y tabla actualizada.");

    } else {
        console.error("¡ERROR! 'tester.js' debe cargarse DESPUÉS de 'script.js'");
    }
};