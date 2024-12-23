# BlogDetails Component

The **BlogDetails** component displays a candidate details.

## Props

- `block`: An object containing:

   - `id`: Block id as number.
   - `__component`: Block name as string value.
   - `title`: Block title as string.
   - `sidebar`: An enum value of `Right Sidebar` or `Left Sidebar` or `Both Sidebar` or `No Sidebar`,

- `data`: An object containing:
   - `id`: The id of the resume.
   - `documentId`: As string value.
   - `createdAt`: String value.
   - `updatedAt`: String value.
   - `publishedAt`: String value.
   - `slug`: String value.
   - `description`: Array of string value.
   - `short_description`: String value.
   - `featuredImage`: An objects with attribute `url` as string value.
   - `post_categories`: An array of objects each with `title`, `slug`
   - `user`: User having `username`, `avatar` data.

## Usage

1. Import the `ResumeDetails` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import BlogDetails from "@/ui"

const block = {
   __component: "single-type.blog-details",
   id: 4,
   title: "Blog Details",
   sidebar: null
}

const data = {
   id: 4,
   documentId: "fozkdon11vn2siserme6hd3d",
   title: "Post One",
   slug: "post-one",
    ...
}

<BlogDetails block={block} data={data} />
```
