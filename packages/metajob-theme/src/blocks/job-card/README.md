# PopularListedJobs Component

The **JobCard** component displays a grid of categories with icons and titles, allowing users to navigate to specific
category pages.

## Props

-  `block`: An object containing:
   -  `content`: An objects for content data like `title`, `sub_title`, `variation`
   -  `style`: An objects for style data like `color`, `backgroundColor`, `mobile`, `tab`, `desktop`
   -  `empty`: An objects for empty data like `title`, `description`
   -  `button`: An objects for button data like `label`, `link`, `target`, `disabled`
   -  `jobs`: An array of object having `relationId` as job id.

## Usage

1. Import the `PopularListedJobs` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import JobCard from "@/ui/block"

const blockData = {
   id: 1,
   title: "Popular Listed Jobs",
   description: "Recent Jobs",
   style: {
      id: 24,
      color: null,
      backgroundColor: null,
      mobile: 12,
      tab: 6,
      desktop: 3
   },
   empty: {
      id: 12,
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   },
   button: {
      id: 177,
      label: "View All Jobs",
      link: "/find-job",
      type: null,
      target: null,
      disabled: false
   },
   jobs: [
      {
         id: 4,
         relationId: 1
      }
   ]
}

<JobCard block={blockData} />
```
