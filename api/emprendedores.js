// Clase Principal del Sitio (Equivalente a EmprendiShop)
class EmprendiShop {
    static main() {
        console.log("Backend de EmprendiShop iniciado...");
    }
}

// Clase para manejar Redes y Contacto
class Contacto {
    constructor(redesSocialesUrl, whatsapp, email) {
        this.redesSocialesUrl = redesSocialesUrl;
        this.whatsapp = whatsapp;
        this.email = email;
    }
}

// Clase base para Productos y Servicios (Equivalente a ItemCatalogo)
class ItemCatalogo {
    constructor(nombre, tipo, infoOpcional, contactoReferencia) {
        if (this.constructor === ItemCatalogo) {
            throw new Error("No se puede instanciar una clase abstracta directamente.");
        }
        this.nombre = nombre;
        this.tipo = tipo;
        this.infoOpcional = infoOpcional;
        this.contactoReferencia = contactoReferencia;
    }
}

// Clase Producto que extiende de ItemCatalogo
class Producto extends ItemCatalogo {
    constructor(nombre, tipo, infoOpcional, contactoReferencia, codigo_barras) {
        super(nombre, tipo, infoOpcional, contactoReferencia);
        this.codigo_barras = codigo_barras;
    }
}

// Clase Servicio que extiende de ItemCatalogo
class Servicio extends ItemCatalogo {
    constructor(nombre, tipo, infoOpcional, contactoReferencia, descripcion) {
        super(nombre, tipo, infoOpcional, contactoReferencia);
        this.descripcion = descripcion;
    }
}

// Clase Emprendedor (Página/Entidad)
class Emprendedor {
    constructor(nombreEmprendimiento, nombreDuenio, contacto) {
        this.nombreEmprendimiento = nombreEmprendimiento;
        this.nombreDuenio = nombreDuenio;
        this.contacto = contacto;
        this.catalogo = []; // Reemplaza al ArrayList de Java
    }

    registrarItem(item) {
        // Validación: el ítem no puede ser nulo o indefinido
        if (!item) {
            throw new Error("Error: Debe inscribir al menos un producto o servicio.");
        }
        this.catalogo.push(item);
    }
}

// ESTO ES LO QUE FALTA EN TU CÓDIGO:
export default async function handler(req, res) {
    // 1. Verificar que la petición sea POST (enviar datos)
    if (req.method === 'POST') {
        try {
            // 2. Extraer los datos que vienen del formulario (frontend)
            const { nombreE, nombreD, contactoInfo, items } = req.body;

            // 3. Crear la instancia del emprendedor usando tus clases
            const nuevoContacto = new Contacto(contactoInfo.url, contactoInfo.ws, contactoInfo.mail);
            const miEmprendimiento = new Emprendedor(nombreE, nombreD, nuevoContacto);

            // 4. Validar y registrar productos/servicios
            if (!items || items.length === 0) {
                throw new Error("Debe inscribir al menos un producto o servicio.");
            }

            items.forEach(i => {
                if (i.clase === 'producto') {
                    miEmprendimiento.registrarItem(
                        new Producto(i.nombre, i.tipo, i.info, nuevoContacto, i.extra)
                    );
                } else if (i.clase === 'servicio') {
                    miEmprendimiento.registrarItem(
                        new Servicio(i.nombre, i.tipo, i.info, nuevoContacto, i.extra)
                    );
                }
            });

            // 5. Responder al frontend que todo salió bien
            return res.status(200).json({
                mensaje: "¡Emprendimiento registrado con éxito!",
                datos: miEmprendimiento
            });

        } catch (error) {
            // Si algo falla (como la validación), enviamos el error
            return res.status(400).json({ error: error.message });
        }
    } else {
        // Si intentan entrar por otro método (como GET), decir que no está permitido
        return res.status(405).json({ message: "Método no permitido" });
    }
}