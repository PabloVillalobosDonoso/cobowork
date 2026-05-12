const USERS_KEY = "users";
const AUTH_KEY = "isAuth";

// Obtener usuarios
const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// Guardar usuarios
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// REGISTRO
export const register = (nombre, apellido, email, telefono, password) => {
  const users = getUsers();

  const exists = users.some((user) => user.email === email);

  if (exists) {
    return { success: false, message: "No fue posible procesar la solicitud" };
  }

  //  simulación de "seguridad básica"
  const newUser = {
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    password: btoa(password), // codificación simple
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true };
};

// LOGIN
export const login = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === btoa(password),
  );

  if (!user) {
    return { success: false, message: "Credenciales incorrectas" };
  }

  localStorage.setItem(AUTH_KEY, "true");
  return { success: true, user };
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
