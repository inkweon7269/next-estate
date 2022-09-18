export const setToken = (token: string) => {
    localStorage.setItem('acToken', token);
};

export const getToken = () => localStorage.getItem('acToken');
