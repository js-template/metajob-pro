# JobBanner Component

The **JobBanner** component creates a search section with customizable title, description, and background image.

## Props

- `data`: An object containing the following keys:
   - `content`: An objects for content data like `title`, `sub_title`, `variation`
   - `search`: An object with following parameters:
      - `search_placeholder`: A string value.
      - `location_placeholder`: A string value.
      - `category_placeholder`: A string value.
      - `button_placeholder`: A string value.
   - `image`: An Object with image `url` property.

## Usage

1. Import the component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import { JobBanner } from "@/ui"

const data = {
   id: 1,
   __component: "block.job-banner",
   content: {
      title: "Find Your Dream Job With Brand Name",
      sub_title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry’s standard dummy text"
   },
   search: {
      search_placeholder: "Job Title",
      location_placeholder: "Job Location",
      button_placeholder: "Search",
      category_placeholder: "Select Category"
   },
   image: {
      url: "your_image_url"
   },
   style: null
}

;<JobBanner data={data} />
```
