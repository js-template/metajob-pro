# CompanyFilter Component

The **CompanyFilter** component displays a all companies with filter.

## Props

- `block`: An object containing:
   - `title`: A string value.
   - `description`: A string value.
   - `show_filter`: A boolean value.
   - `search`: An object with following parameters:
      - `title`: A string value.
      - `search_placeholder`: A string value.
      - `category_placeholder`: A string value.
      - `button_placeholder`: A string value.
   - `empty`: empty value object having `title` and `description` string value

## Usage

1. Import the `CompanyFilter` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import CompanyFilter from "@padma/metajob-ui"

const blockData = {
   __component: "block.company-filter",
   id: 8,
   title: null,
   description: null,
   show_filter: true,
   search: {
      id: 8,
      title: "Company Filter",
      search_placeholder: "Company Title",
      category_placeholder: "Industry",
      button_placeholder: null
   },
   empty: {
      id: 14,
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }
}


<CompanyFilter block={blockData} />
```
