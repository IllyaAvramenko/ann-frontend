import { IProduct } from './Product.interface'

export interface IOrder {
   _id: string
   productIds: string[]
   createdAt: Date
   updatedAt: Date
   shippingInfo: IShipping
   contactInfo: IContactInformation
   sumPrice: number
   orderNumber: number
   status: 'CONFIRMATION' | 'WAITING_SHIPMENT' | 'SENT' | 'DELIVERED' | 'RECEIVED'
}

export type OrderCreateType = Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'sumPrice' | 'orderNumber' | 'status'>;

export type IOrderWithProducts = Omit<IOrder, 'productIds'> & { products: IProduct[] };

export interface IShipping {
   type: 'BY_ADDRESS' | 'NOVA_POSHTA'
   country: string
   city: string
   address?: string
   postalCode?: string
   novaPoshta?: string
}

export interface IContactInformation {
   name: string
   surname: string
   byFather: string
   email: string
   phone: string
}