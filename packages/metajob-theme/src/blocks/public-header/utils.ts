import { useState } from "react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"

// Language function handler hook
export const useChangeLang = () => {
   const router = useRouter()

   const changeLang = (lang: string) => {
      setCookie("lang", lang, {
         maxAge: 30 * 24 * 60 * 60,
         path: "/"
      })
      setCookie("direction", lang === "ar" ? "rtl" : "ltr", {
         maxAge: 30 * 24 * 60 * 60,
         path: "/"
      })
      router.push("/")
   }

   return { changeLang }
}

// Change the direction function hook
export const useChangeDirection = () => {
   const changeDirection = (dir: "ltr" | "rtl") => {
      setCookie("direction", dir, {
         maxAge: 30 * 24 * 60 * 60,
         path: "/"
      })
   }

   return { changeDirection }
}
