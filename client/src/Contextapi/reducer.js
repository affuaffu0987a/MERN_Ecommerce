const reducer = (state, action) => {
    const { productsCards, totalPrice, Qty } = state
    let Allproducts;
    let UpdatedTotalprice;
    let Updatedqty;

    switch (action.type) {
        case "Add_TO_CART":
            let check = productsCards?.find((data) => data.id === action.payload.id)
            if (check) {
                return state;
            }
            else {
                Allproducts = action.payload.Products;
                Allproducts['qty'] = 1;
                Allproducts['DiscountPrice'] = action.payload.Newprice
                Updatedqty = Qty + Allproducts.qty
                UpdatedTotalprice = totalPrice + Allproducts.DiscountPrice
                return {
                    productsCards: [...productsCards, Allproducts],
                    totalPrice: UpdatedTotalprice,
                    Qty: Updatedqty
                }
            }
            break;
        case "REMOVE_ITEM":
            let filtered = productsCards.filter((items) => items.id !== action.payload.id)
            Allproducts = action.payload.items,
            Updatedqty = Qty - Allproducts.qty
            UpdatedTotalprice = totalPrice - Allproducts.DiscountPrice * Allproducts.qty
            return {
                productsCards: [...filtered],
                Qty: Updatedqty,
                totalPrice: UpdatedTotalprice
            }
            break;
        case "QTY_MINUS":
            let index = productsCards.findIndex((elem) => elem.id === action.payload)
            Allproducts = action.payload.items
            Allproducts.qty = Allproducts.qty - 1
            Updatedqty = Qty - 1
            UpdatedTotalprice = totalPrice - Allproducts.DiscountPrice
            productsCards[index]
            return {
                productsCards: [...productsCards],
                Qty: Updatedqty,
                totalPrice: UpdatedTotalprice
            }
            break;
        case "QTY_PLUS":
            let index2 = productsCards.findIndex((elem) => elem.id === action.payload)
            Allproducts = action.payload.items
            Allproducts.qty = Allproducts.qty + 1
            Updatedqty = Qty + 1
            UpdatedTotalprice = totalPrice + Allproducts.DiscountPrice
            productsCards[index2]
            return {
                productsCards: [...productsCards],
                Qty: Updatedqty,
                totalPrice: UpdatedTotalprice
            }
            break;
        case "ADD_SINGLEITEM":
            let find = productsCards.find((elem) => elem.id === action.payload.id)
            if (find) {
                return state;
            }
            else {
                Allproducts = action.payload.item
                Allproducts["qty"] = 1
                Allproducts['DiscountPrice'] = action.payload.Newprice
                Updatedqty = Qty + Allproducts.qty
                UpdatedTotalprice = totalPrice + Allproducts.DiscountPrice
                return {
                    productsCards: [...productsCards, Allproducts],
                    Qty: Updatedqty,
                    totalPrice: UpdatedTotalprice
                }
            }
            break;
        case "Add_TO_CART2":
            let checks = productsCards?.find((data) => data.id === action.payload.id)
            if (checks) {
                return state;
            }
            else {
                Allproducts = action.payload.allItems;
                Allproducts['qty'] = 1;
                Allproducts['DiscountPrice'] = action.payload.Newprice
                Updatedqty = Qty + Allproducts.qty
                UpdatedTotalprice = totalPrice + Allproducts.DiscountPrice
                return {
                    productsCards: [...productsCards, Allproducts],
                    totalPrice: UpdatedTotalprice,
                    Qty: Updatedqty
                }
            }
        default:
            return state;

    }
}


export default reducer;