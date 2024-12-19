# CandidateFilter Component

The **CandidateFilter** component displays a grid of categories with icons and titles, allowing users to navigate to
specific category pages.

## Props

- `block`: An object containing:
   - `show_filter`: A boolean value.
   - `search`: An object with following parameters:
      - `title`: A string value.
      - `search_placeholder`: A string value.
      - `category_placeholder`: A string value.
      - `button_placeholder`: A string value.
   - `empty`: empty value object having `title` and `description` string value

## Usage

1. Import the `CandidateFilter` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import CandidateFilter from "@/ui/block"

const data = {
 __component: "block.candidate-filter",
   id: 4,
   show_filter: true,
   search: {
      id: 12,
      title: "Search Filter",
      search_placeholder: "Candidate Name",
      category_placeholder: "Select Category"
   },
   empty: {
      id: 20,
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }
}

<CandidateFilter block={block} />
```
