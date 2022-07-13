export const nameToRoute = (name: string) : string => {
    // remove all non alphanumeric characters
    return name.replace(/[^a-zA-Z0-9]/g, '');
}
