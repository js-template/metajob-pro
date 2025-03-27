# PublicPackage Component

The **PublicPackage** component displays a pricing table component.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`

## Usage

1. Import the `PublicPackage` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import JobCard from "@/ui/block"

const blockData = {
 id: 1,
   __component: "metajob-block.public-package",
   title: "We Have Exclusive Plan In Our Pricing",
   description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue feugiat adipiscing urna mauris sit leo consectetur tortor, dui.",
   style: {
      id: 26,
      color: null,
      backgroundColor: null,
      mobile: 12,
      tab: 6,
      desktop: 4
   },
   empty: {
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }
}

<PublicPackage block={blockData} />
```
