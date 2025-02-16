# ManageJobs Component

The **ManageJobs** component displays a user bookmark.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`
   - `table_head`: An array of objects for table header data like `key`, `value`
   - `table_config`: An objects for table configurations

## Usage

1. Import the `ManageJobs` component.
2. Pass a `block` object with the appropriate structure.

### Example

```tsx
import ManageJobs from "@/ui/block"

const blockData = {
   __component: "metajob-block.manage-job"
   id: 12,
   title: null,
   description: null,
   table_config: {
      id: 12,
      label: "Manage Company",
      enable_edit: null,
      enable_delete: null,
      enable_search: true
   },
   table_head: [
      {
         key: "Company Name",
         value: "Company Name"
      },
      {
         key: "Website",
         value: "Website"
      }
   ],
   style: null
}

<ManageJobs block={blockData} />
```
