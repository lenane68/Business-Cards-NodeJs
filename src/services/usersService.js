import httpService from "./httpService";

const TOKEN_KEY = "token";
const USER_KEY = "user";

refreshToken();

function createUser(user) {
  return httpService.post("/users", user);
}

async function login(credentials) {
  const { data: users } = await httpService.get("/users");

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password.trim()
  );

  if (!user) {
    throw new Error("אימייל או סיסמה לא נכונים");
  }

  const token = btoa(JSON.stringify({ id: user.id, role: user.role }));
  setToken(token);
  setUser(user);

  return { data: { token } };
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getLoggedInUser() {
  const json = localStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function refreshToken() {
  httpService.setDefaultCommonHeaders("x-auth-token", getJWT());
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}
export async function toggleFavorite(userId, cardId) {
  const { data: user } = await httpService.get(`/users/${userId}`);
  const favorites = user.favorites || [];

  const updatedFavorites = favorites.includes(cardId)
    ? favorites.filter(id => id !== cardId)
    : [...favorites, cardId];

  return httpService.patch(`/users/${userId}`, { favorites: updatedFavorites });
}

export async function updateUser(id, updatedData) {
  return httpService.patch(`/users/${id}`, updatedData);
}


const usersService = {
  createUser,
  login,
  logout,
  getJWT,
  getLoggedInUser,
  toggleFavorite,
  updateUser
};



export default usersService;
