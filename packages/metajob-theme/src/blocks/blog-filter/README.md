# BlogFilter Component

The **BlogFilter** component displays a recent blog component.

## Props

- `block`: An object containing:
   - `title`: As string value
   - `description`: As string value
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`

## Usage

1. Import the `BlogFilter` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import JobCard from "@/ui/block"

const blockData = {
    id: 1,
   __component: "block.blog-card",
   title: "Career Advice",
   description: "See How You Can Up Your Career Status",
   style: {
      id: 26,
      color: null,
      backgroundColor: null,
      mobile: 12,
      tab: 6,
      desktop: 4
   },
   empty: {
      id: 14,
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }

}

<BlogFilter block={blockData} />
```
