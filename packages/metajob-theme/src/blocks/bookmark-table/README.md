# BookmarkTable Component

The **BookmarkTable** component displays a user bookmark.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`
   - `table_head`: An array of objects for table header data like `key`, `value`

## Usage

1. Import the `BookmarkTable` component.
2. Pass a `block` object with the appropriate structure.

### Example

```tsx
import BookmarkTable from "@/ui/block"

const blockData = {
   __component: "metajob-block.bookmark",
   id: 12,
   title: null,
   description: null,
   table_config: {
      id: 12,
      label: "All Bookmarks",
      enable_edit: null,
      enable_delete: null,
      enable_search: true
   },
   table_head: [
      {
         id: 52,
         key: "Title",
         value: "Title"
      },
      {
         id: 53,
         key: "Type",
         value: "Type"
      },
      {
         id: 54,
         key: "Salary",
         value: "Salary"
      },
      {
         id: 55,
         key: "Status",
         value: "Status"
      },
      {
         id: 56,
         key: "Action",
         value: "Action"
      }
   ],
   style: null
}

<BookmarkTable block={blockData} />
```
