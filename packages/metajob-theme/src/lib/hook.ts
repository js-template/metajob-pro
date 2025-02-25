import { find } from "./strapi"

export const getBanners = async () => {
   return await find("banners", {}, "force-cache", 60)
}
