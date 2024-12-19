export type MessageDataProps = {
   messageId: number
   id: number
   message: string
   images: {
      src: string
      alt: string
      caption: string
      width: number
      height: number
   }[]
   avatar: string
   read: boolean
   name: string
   date: string
}

export type ChatSectionProps = {
   id: number
   title: string
   enableSearch: boolean
   empty_messages: {
      title: string
      description: string
   }
   empty_chat: {
      title: string
      description: string
   }
   saveButtonText: string
   cancelButtonText: string
   editActionText: string
   copyActionText: string
   searchPlaceholder: string
   sendMessagePlaceholder: string
   __component: string
}

export type ChatDataProps = {
   id: number
   avatar: string
   name: string
   slug?: string
   status: "active" | "inactive" | "away"
   message: string
   date: string
   badge: number
}
