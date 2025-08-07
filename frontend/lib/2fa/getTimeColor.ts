export const getTimeColor = (timeRemaining: number) => {
    if (timeRemaining <= 5) return 'text-red-400';
    if (timeRemaining <= 10) return 'text-yellow-400';
    return 'text-green-400';
};