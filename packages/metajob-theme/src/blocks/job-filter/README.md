# JobFilter Component

The **JobFilter** component displays a grid of categories with icons and titles, allowing users to navigate to specific
category pages.

## Props

- `data`: An object containing:
   - `title`: A string value.
   - `description`: A string value.
   - `search`: An object with following parameters:
      - `title`: A string value.
      - `search_placeholder`: A string value.
      - `location_placeholder`: A string value.
      - `category_placeholder`: A string value.
      - `sort_placeholder`: A string value.
      - `button_placeholder`: A string value.

## Usage

1. Import the `JobFilter` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import JobFilter from "@/ui/block"

const data = {
   __component: "block.job-filter",
   id: 11,
   title: "Search Jobs",
   description: "Search Jobs Description",
   search: {
      id: 4,
      title: "Search Filter",
      search_placeholder: "Job Title",
      location_placeholder: "Location",
      category_placeholder: "Select Category",
      sort_placeholder: "Sort",
      button_placeholder: null
   }
}

<JobFilter data={data} />
```
