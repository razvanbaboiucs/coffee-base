type Order = {
    state: OrderStateEnum,
    itemSummary: OrderSummary,
    total: number,
    id: number,
    userId: string,
    pointsUsed: number,
}