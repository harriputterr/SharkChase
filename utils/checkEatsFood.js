import React from 'react'

export const checkEatsFood = (
    head, food, area
) => {
    const distBtwFoodAndSnakeX = Math.abs(head.x - food.x);
    const distBtwFoodAndSnakeY = Math.abs(head.y - food.y);
    return (
        distBtwFoodAndSnakeX < area && distBtwFoodAndSnakeY < area
    );
}
