export const nameToRoute = (name: string): string => {
    // remove all non alphanumeric characters
    return name.replace(/[^a-zA-Z0-9]/g, '');
};

export const routeToName = (route: string): string => {
    // humanize route
    return route.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ');
};
