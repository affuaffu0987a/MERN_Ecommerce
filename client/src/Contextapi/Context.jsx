import { createContext, useContext, useState, useEffect, useReducer } from "react";
import reducer from "./reducer";

const AppContext = createContext();
const URL = "https://dummyjson.com/products";

const GetLocalStorageData =()=>{
    let isProduct = localStorage.getItem("Products")
    if(!isProduct){
        return{
            productsCards: [],
            totalPrice: 0,
            Qty: 0,
        }
    }
    else{
        const parsedValue = JSON.parse(isProduct)
        return parsedValue;
    }
}

const initialState = GetLocalStorageData();

const AppProvider = ({ children }) => {
    const [ProductsApi, setProductsApi] = useState([])
    const [AllProduct, setAllProductsApi] = useState([])
    const [TotalProducts,setTotalProduct] = useState([])
    const [ShowCart, setCart] = useState(false)
    const [Next, setNext] = useState(0)
    const [Search, setSearch] = useState('')
    const [isLoader, setLoader] = useState(true)
    const [product, dispatch] = useReducer(reducer, initialState)

    const GetProductApi = async (url) => {
        try {
            let response = await fetch(url);
            let Data = await response.json()
            setLoader(false)
            setProductsApi(Data.products);
        }
        catch (error) {
            document.write(error)
        }
    }

    const AllProductApi = async (url) => {
        try {
            let response = await fetch(url);
            let Data = await response.json()
            setLoader(false)
            setAllProductsApi(Data.products);
        }
        catch (error) {
            document.write(error)
        }
    }

    const GetNextPage = async (url) => {
        try {
            let response = await fetch(url);
            let NextData = await response.json()
            setLoader(false)
            setAllProductsApi(NextData.products);
        }
        catch (error) {
            document.write(error)
        }
    }

    const AllTotalProduct = async (url) => {
        try {
            let response = await fetch(url);
            let Totalproducts = await response.json()
            setLoader(false)
            setTotalProduct(Totalproducts.products);
        }
        catch (error) {
            document.write(error)
        }
    }

    const DiscountPrices =(disPrice)=>{
        let discount = Math.round(disPrice.discountPercentage);
        let price = disPrice.price;
        let divide = discount / 100;
        let multiply = price * divide;
        let finalPrice = Math.round(price - multiply);
        return finalPrice;
    }

    useEffect(() => {
        GetProductApi(`${URL}?limit=6`)
        GetNextPage(`${URL}?limit=${Next / 2}&skip=${Next}`)
        AllTotalProduct(`${URL}?limit=100`)
    }, [Next])

    useEffect(() => {
        localStorage.setItem("Products",JSON.stringify(product))
        let qualitySearch = setTimeout(() => {
            AllProductApi(`${URL}/search?q=${Search}`)
        }, 1000)
        return () => clearTimeout(qualitySearch)
    }, [Search,product])
    return (
        <AppContext.Provider value={{
            ProductsApi,
            ...product,
            dispatch,
            Search,
            setSearch,
            setProductsApi,
            isLoader,
            setLoader,
            AllProductApi,
            AllProduct,
            Next,
            setNext,
            setCart,
            ShowCart,
            TotalProducts,
            DiscountPrices
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext };