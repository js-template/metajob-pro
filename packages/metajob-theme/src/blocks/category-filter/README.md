# CategoryFilter Component

The **CategoryFilter** component displays a all job-category component.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `card_button`: As string value for card button placeholder
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`

## Usage

1. Import the `CategoryFilter` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import CategoryFilter from "@/ui/block"

const blockData = {
    id: 1,
   __component: "metajob-block.category-filter",
   title: "All Categories",
   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue feugiat adipiscing urna mauris sit leo consectetur tortor, dui.",
   style: {
      color: null,
      backgroundColor: null,
      mobile: 12,
      tab: 4,
      desktop: 3
   },
   empty: {
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }

}

<CategoryFilter block={blockData} />
```
