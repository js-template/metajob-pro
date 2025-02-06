# ManageResume Component

The **ManageResume** component manage a candidate resume.

## Props

- `block`: An object containing:
   - `title`: As string value

## Usage

1. Import the `ManageResume` component.
2. Pass a `block` object with the appropriate structure.

### Example

```tsx
import ManageResume from "@/ui/block"

const blockData = {
   __component: "metajob-block.manage-resume"
   title: null,

}

<ManageResume block={blockData} />
```
