export const useCartStore = defineStore('cart', () => {

  const items = ref<CartProduct[]>([])
  const totalItems = ref(0)
  const totalCost = ref(0)

  const addItem = (item: Product) => {
    let targetItem: Product = items.value.filter(currItem => currItem.id === item.id)[0]

    if (targetItem) {
      targetItem.quantity = targetItem.quantity + item.quantity
    }
    else {
      items.value = [...items.value, { ...item, totalPrice: item.price * item.quantity }]
    }

    totalItems.value += item.quantity
    totalCost.value += item.price * item.quantity
  }

  const reduceItemQuantity = (item: Product) => {
    let targetItem = items.value.filter(currItem => currItem.id === item.id)[0]

    if (targetItem.quantity === 1) {
      items.value = items.value.filter(currItem => currItem.id !== item.id)
    }
    else {
      targetItem.quantity -= 1
      targetItem.totalPrice -= item.price
    }

    totalItems.value -= 1
    totalCost.value -= item.price
  }

  const increaseItemQuantity = (item: Product) => {
    let targetItem = items.value.filter(currItem => currItem.id === item.id)[0]

    if (targetItem) {
      targetItem.quantity += 1
      targetItem.totalPrice += targetItem.price
    }
    else {
      items.value = [...items.value, { ...item, totalPrice: item.price * item.quantity }]
    }


    totalItems.value += 1
    totalCost.value += item.price
  }

  const isEmpty = () => {
    return totalItems.value === 0
  }

  const emptyCart = () => {
    items.value = []
    totalCost.value = 0
    totalItems.value = 0
  }

  const orderSummary = (): OrderSummary => {
    return {
      totalItems: totalItems.value,
      totalCost: totalCost.value,
      items: [
        ...items.value.map(item => {
          return {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice
          }
        })
      ]
    }
  }

  return {
    items,
    addItem,
    reduceItemQuantity,
    increaseItemQuantity,
    totalItems,
    totalCost,
    isEmpty,
    emptyCart,
    orderSummary
  };
})