interface Config {
    delay?: number;
    callback: (value: string) => void;
}

export const debounce = (node: any, config: Config) => {
    const { delay = 750, callback } = config;

    let timer: NodeJS.Timeout | number;

    const handleChange = (e: any) => {
        const { value } = e.target;

        clearTimeout(timer);
        timer = window.setTimeout(() => {
            callback(value);
        }, delay);
    };

    node.addEventListener('input', handleChange);

    return {
        destroy() {
            node.removeEventListener('input', handleChange);
        },
    };
};
