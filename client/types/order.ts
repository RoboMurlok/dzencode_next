
import { Product } from './../types/product';

export type Order = {
    id: number
    title: string
    date: string
    description: string
    products: Product[]
}