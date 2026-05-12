const BASE_URL = import.meta.env.VITE_API_URL;

function obtenerToken(){
    return localStorage.getItem("token");
}

function authHeaders(){
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obtenerToken()}`,
    }
}

//Autenticacion

export async function iniciarSesion(correo, constraseña) {
    const res = await fetch(`${BASE_URL}/usuario/inicioSesion`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({correo, constraseña}),
    });
    const json = await res.json();
    if(!res.ok) throw new Error(json.msg || "Credenciales inválidas");
    console.log(json)
    return json;
}

export async function registro(nombre, apellido, numero, correo, constraseña) {
    const res = await fetch(`${BASE_URL}/usuario/registro`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nombre, apellido, numero, correo, constraseña}),
    });
    const json = await res.json();
    if(!res.ok) throw new Error(json.msg || "Err0r al registrar el usuario");
    return json;
}

//Espacios
export async function obtenerEspacios(){
    const res = await fetch(`${BASE_URL}/espacios`,{
        headers: authHeaders(),
    });
    if(!res.ok) throw new Error("Error al obtener los espacios")
    return res.json();
}

export async function obtenerEspaciosId(idEspacio){
    const res = await fetch(`${BASE_URL}/espacios/${idEspacio}`,{
        headers: authHeaders(),
    });
    if(!res.ok) throw new Error("Error al obtener los espacios")
    return res.json();
}

//Reservas
export async function obtenerReservas(idUsuario) {
    const res = await fetch(`${BASE_URL}/reservas/usuario/${idUsuario}`,{
        headers: authHeaders(),
    });
    if(!res.ok) throw new Error("Error al obetener las reservas");
    return res.json();
}

export async function crearReserva(reserva) {
    const res = await fetch(`${BASE_URL}/reservas`,{
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(reserva),
    })
    const json = await res.json();
    if(!res.ok) throw new Error(json.msg || "Error al pedir la reserva");
    return json;
    
}

export async function cancelarReserva(idReserva, nuevoEstado){
    const res = await fetch(`${BASE_URL}/reservas/${idReserva}`,{
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(nuevoEstado)
    })
    const json = await res.json();
    if(!res.ok) throw new Error(json.msg || "Error al cancelar la reserva");
    return json;
}