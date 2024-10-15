export const getProjectIdentifier = (name: string) => {
    // Limit the string to 4 characters and convert to uppercase
    return name.slice(0, 4).toUpperCase();
}