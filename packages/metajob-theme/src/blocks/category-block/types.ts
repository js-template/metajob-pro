export type ISingleCategory = {
   id?: number
   attributes: CategoryAttributes
}

type CategoryAttributes = {
   title: string
   description: string | null
   slug: string
   createdAt: string
   updatedAt: string
   publishedAt: string
   locale: string
   image: Image
   link: Link | null
   seo: null
   localizations: Localizations
}
type Image = {
   data: ImageData
}

type ImageData = {
   id: number
   attributes: ImageAttributes
}

type ImageAttributes = {
   name: string
   alternativeText: string | null
   caption: string | null
   width: number
   height: number
   formats: null
   hash: string
   ext: string
   mime: string
   size: number
   url: string
   previewUrl: string | null
   provider: string
   provider_metadata: ProviderMetadata
   createdAt: string
   updatedAt: string
}

type Link = {
   id: number
   label: string | null
   link: string | null
   type: string | null
   target: string | null
   icon: Icon
}

type Localizations = {
   data: any[]
}

type Icon = {
   data: null | IconData
}

type IconData = {
   id: number
   attributes: IconAttributes
}

type IconAttributes = {
   name: string
   alternativeText: string | null
   caption: string | null
   width: number
   height: number
   formats: null
   hash: string
   ext: string
   mime: string
   size: number
   url: string
   previewUrl: string | null
   provider: string
   provider_metadata: ProviderMetadata
   createdAt: string
   updatedAt: string
}

type ProviderMetadata = {
   public_id: string
   resource_type: string
}
