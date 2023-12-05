export const randFoodPos = (maxX, maxY) => {
    return{
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    };
}