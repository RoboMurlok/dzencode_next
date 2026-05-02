
import { Product } from './../types/product';

export type Order = {
    id: number
    title: string
    date: string
    description: string
    products: Product[]
}

export type CreateOrder = {
    title: string
    description: string
}

export type ModalType = "addProduct" | "deleteProduct" | "deleteOrder" | "addOrder" | null;