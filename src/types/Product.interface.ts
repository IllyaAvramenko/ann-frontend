export interface IProduct {
   _id?: string
   slug: string
   title: string
   description: string
   createdAt: Date
   updatedAt: Date
   price: number
   size: string
   material: string
   genre: GenreEnum
   categoryId: string
}

export enum GenreEnum {
   PROTRAIT = 'PROTRAIT',
   STILL_LIFE = 'STILL_LIFE',
   LANDSCAPE = 'LANDSCAPE',
   ANIMALISTICS = 'ANIMALISTICS',
   RELIGIOUS = 'RELIGIOUS',
   BATTLE = 'BATTLE',
   HOUSEHOLD = 'HOUSEHOLD',
   HISTORICAL = 'HISTORICAL',
   MYTHOLOGICAL = 'MYTHOLOGICAL',
   MARINE_STUDIES = 'MARINE_STUDIES',
   SELF_PORTRAIT = 'SELF_PORTRAIT',
   ARCHITECTURE = 'ARCHITECTURE'
}