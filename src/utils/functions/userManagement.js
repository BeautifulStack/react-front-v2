export const logout = () => {
    localStorage.removeItem('FAIRREPACK_TOKEN')
    localStorage.removeItem('FAIRREPACK_ADMIN')
}