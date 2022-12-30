export const dateFormat = (date: any) => new Intl.DateTimeFormat([], {
    dateStyle: 'medium',
    timeStyle: 'short'
}).format(new Date(date));
