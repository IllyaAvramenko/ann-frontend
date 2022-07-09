export type GetPathsResponseType = {
   paths: Array<{
      name: string 
      productsSlugs: string[]
   }>
};

export enum SortEnum {
   'title-asc' = 'title-asc',
   'title-desc' = 'title-desc',
   'price-asc' = 'title-asc',
   'price-desc' = 'title-desc',
   'createdAt-asc' = 'title-asc',
   'createdAt-desc' = 'title-desc',
}

export interface IGetProductsQueryParams {
   page?: string, 
   limit?: string, 
   sortBy?: SortEnum, 
   genre?: string, 
   search?: string
}

export type ResWithPagination<T> = {
   items: T[]
   total: number
   limit: number
   page: number
};