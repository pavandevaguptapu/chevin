// For Formatting numbers to thousand (1000 to 100k)
export function kFormatter (num) {
    return (num > 999 ? (num/1000).toFixed(1) + 'k' : num);
}