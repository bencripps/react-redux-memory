export function queryUtil(type) {
    switch (type) {
    case 'DIFFICULTY':
        return location.search.length > 0 ? location.search.slice(1).toUpperCase() : '';
    }
}