# BlogCard Component

The **BlogCard** component displays a recent blog component.

## Props

- `block`: An object containing:
   - `content`: An objects for content data like `title`, `sub_title`, `variation`
   - `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   - `empty`: An objects for empty data like `title`, `description`
   - `button`: An objects for button data like `label`, `link`, `target`, `disabled`

## Usage

1. Import the `BlogCard` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import JobCard from "@/ui/block"

const blockData = {
    id: 1,
   __component: "block.blog-card",
   content: {
      id: 1,
      title: "See How You Can Up Your Career Status",
      sub_title: "Our Blog",
      variation: "Variation One"
   },
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
   },
   button: {
      id: 2,
      label: "See All Blog",
      link: "/career-advice"
   }

}

<BlogCard block={blockData} />
```
