# AppliedJobs Component

The **AppliedJobs** component displays a candidate applied jobs lists.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `table_config`: An objects for table cingug data like `label`, `enable_search`
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`
   - `table_head`: An array of objects for table header data like `key`, `value`

## Usage

1. Import the `AppliedJobs` component.
2. Pass a `block` object with the appropriate structure.

### Example

```tsx
import AppliedJobs from "@/ui/block"

const blockData = {
   __component: "metajob-block.applied-jobs"
   id: 12,
   title: null,
   description: null,
   table_config: {
      id: 12,
      label: "Applied Jobs",
      enable_edit: null,
      enable_delete: null,
      enable_search: true
   },
   table_head: [
      {
         id: 52,
         value: "Title"
      },
      {
         id: 53,
         value: "Start Date	"
      },
      {
         id: 54,
         value: "End Date	"
      },
      {
         id: 55,
         value: "Vacancy"
      },
      {
         id: 56,
         value: "Status"
      }
   ],
   style: null
}

<AppliedJobs block={blockData} />
```
