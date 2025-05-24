import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatCartProducts } from "../../products/utils/formatCartProduct";

const useCartContext = create(
    persist(
        (set, get) => ({
            products: [],
            totalItems: 0,
            totalPrice: 0,

            addItem: (product) => {
                const products = get().products;
                const existingProduct = products.find((item) => item._id === product._id);

                if(existingProduct) {
                    const updateProduct = products.map((product) => product._id === existingProduct._id 
                        ? { ...product, quantity: product.quantity + 1}
                        : product
                    )


                    set((state) => ({
                        products: updateProduct,
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + product.precio

                    }));                  
                } else {
                    const productWithQuantity = { ...product, quantity: 1 };
         

                    set((state) => ({
                        products: [...state.products, productWithQuantity],
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + product.precio
                    }))
                }
            },
            removeOneItem: (productID) => {
                const products = get().products;
                /*  const productsSorted = [ ...products ].sort(() => {}) */
                const existingProduct = products.find(
                  (product) => product._id === productID
                );

                if (!existingProduct) return;

                if(existingProduct.quantity === 1) {
                    set((state) => ({
                        products: state.products.filter((product) => product._id !== productID),
                        totalItems: state.totalItems - 1,
                        totalPrice: state.totalPrice - existingProduct.precio
                    }))
                } else {
                    const updatedProducts = products.map((product) =>
                        product._id === productID ? { ...product, quantity: product.quantity - 1 } : product
                    )

                    set((state) => ({
                        products: updatedProducts,
                        totalItems: state.totalItems - 1,
                        totalPrice: state.totalPrice - existingProduct.precio
                    }))
                }
            },
            removeItem: (productID) => {
                const products = get().products;
               /*  const productsSorted = [ ...products ].sort(() => {}) */
                const existingProduct = products.find(product => product._id === productID);

                if(!existingProduct) return;

                const [ updatedProducts, totalItemsUpdated, totalPriceUpdated ] = formatCartProducts(products, productID);               

                set(() => ({
                    products: updatedProducts,
                    totalItems: totalItemsUpdated,
                    totalPrice: totalPriceUpdated
                }))
            },
            clearCart: () => {
                set(() => ({
                    products: [],
                    totalItems: 0,
                    totalPrice: 0
                }))
            }
        }),
        {
            name: "cart-storage", //Nombre para la persistencia en el localStorage
            getStorage: () => localStorage, //Usar el localStorage para guardar los datos

        } 
    )
)

export default useCartContext
