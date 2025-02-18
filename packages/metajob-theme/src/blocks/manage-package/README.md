# ManagePackage Component

The **ManagePackage** component displays a user bookmark.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `empty`: An objects for empty data like `title`, `description`
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`

## Usage

1. Import the `ManagePackage` component.
2. Pass a `block` object with the appropriate structure.

### Example

```tsx
import ManagePackage from "@/ui/block"

const blockData = {
   __component: "metajob-block.manage-packages",
   title: "We Have Exclusive Plan In Our Pricing",
   description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue feugiat adipiscing urna mauris sit leo consectetur tortor.",
   empty: {
      id: 29,
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   },
   style: {
      id: 9,
      color: null,
      backgroundColor: null,
      mobile: 12,
      tab: 6,
      desktop: 3
   }
}

<ManagePackage block={blockData} />
```
