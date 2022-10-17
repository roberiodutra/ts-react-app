export const saveUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const value = localStorage.getItem('user') || '';
  return JSON.parse(value);
};

export const removeUser = () => localStorage.removeItem('user');
