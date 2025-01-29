# CategoryCard Component

The **CategoryCard** component displays a grid of categories with icons and titles, allowing users to navigate to specific category pages.

## Props

- `data`: An object containing:
   - `title`: The main heading displayed.
   - `description`: The text description under the title.
   - `categories`: An array of category objects, each with:
      - `attributes.title`: The name of the category.
      - `attributes.image.data.attributes.url`: The URL of the category icon.

## Usage

1. Import the `CategoryCard` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import CategoryCard from "@/components/CategoryCard"

const data = {
   title: "Explore Categories",
   description: "Browse jobs by different categories",
   categories: {
      data: [
         {
            id: 1,
            attributes: {
               title: "Design",
               image: {
                  data: {
                     attributes: {
                        url: "/images/design-icon.png"
                     }
                  }
               }
            }
         },
         {
            id: 2,
            attributes: {
               title: "Finance",
               image: {
                  data: {
                     attributes: {
                        url: "/images/finance-icon.png"
                     }
                  }
               }
            }
         }
      ]
   }
}

<CategoryCard data={data} />
