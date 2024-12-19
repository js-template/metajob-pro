# ResumeDetails Component

The **ResumeDetails** component displays a candidate details.

## Props

- `block`: An object containing:

   - `id`: Block id as number.
   - `__component`: Block name as string value.
   - `title`: Block title as string.
   - `empty`: An objects for empty data with attributes `title`, `description`,

- `data`: An object containing:
   - `id`: The id of the resume.
   - `documentId`: As string value.
   - `createdAt`: String value.
   - `name`: String value.
   - `tagline`: String value.
   - `about`: String value.
   - `salary`: An objects with attributes `title`, `value`as string value.
   - `salary_type`: An objects with attributes `title`, `value`as string value.
   - `experience_time`: An objects with attributes `title`, `value`as string value.
   - `qualification`: An objects with attributes `title`, `value`as string value.
   - `language`: String value.
   - `education`: An array of objects each with `title`, `description`, `startDate`,`endDate`,`institution`
   - `experience`: An array of objects each with `title`, `description`, `startDate`,`endDate`,`institution`
   - `portfolio`: An array of objects each with `title`, `description`, `image`,`link`
   - `contact`: An Objects each with `friendlyAddress`, `location`
   - `user`: User having avatar data.

## Usage

1. Import the `ResumeDetails` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import ResumeDetails from "@/ui/block"

const block = {
   __component: "single-type.resume-details",
   id: 4,
   title: "Candidate Profile",
   empty: {
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }
}

const data = {
    id: 3,
   documentId: "pzqgmmnne34j1o45ejygwvbz",
   description: "Candidate description",
   name: "John Doe",
   tagline: "Developer",
   about: "Candidate about",
      ...
}

<ResumeDetails block={block} data={data} />
```
