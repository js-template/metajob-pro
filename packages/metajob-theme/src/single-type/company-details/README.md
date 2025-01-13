# CompanyDetails Component

The **CompanyDetails** component displays company details data specific category pages.

## Props

- `block`: An object containing:

   - `id`: Block id as number.
   - `title`: Block title as string.
   - `open_jobs`: open_jobs as boolean value.
   - `empty`: An objects for empty data with attributes `title`, `description`,

- `data`: An object containing:
   - `id`: Data id as number.
   - `documentId`: As string value.
   - `name`: As string value.
   - `tagline`: As string value.
   - `email`: As string value.
   - `phone`: As string value.
   - `website`: As string value.
   - `slug`: As string value.
   - `about`: As string value.
   - `createdAt`: As string value.
   - `updatedAt`: As string value.
   - `publishedAt`: As string value.
   - `company_size`: An objects with attributes `title`, `value`
   - `revenue`: An objects with attributes `title`, `value`
   - `avg_salary`: An objects with attributes `title`, `value`
   - `logo`: An objects with attribute `url`
   - `industry`: An objects with attribute `title`, `description`, `slug`
   - `social_links`: An array of objects with attribute `type`, `link`

## Usage

1. Import the `CompanyDetails` component.
2. Pass a `data` and `block` object with the appropriate structure.

### Example

```tsx
import JobCard from "@/ui"

const block = {
   __component: "single-type.company-details",
   title: "Company Profile",
   open_jobs: true,
   empty: {
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }
}

const data = {
   id: 6,
   documentId: "i8yp3pajdhqutet9qwizip3n",
   name: "Company One",
   tagline: "company Tag",
   email: "employer@metalancer.net",
   phone: "+121345566",
   website: "https://test.com",
   slug: "company-one",
   about: "Company about",
   createdAt: "2024-12-04T07:50:49.993Z",
   updatedAt: "2024-12-05T10:03:27.350Z",
   publishedAt: "2024-12-05T10:03:27.385Z",
   company_size: {
      title: "1-10",
      value: "1-10"
   },
   revenue: {
      title: "1-100000",
      value: "1-100000"
   },
   logo: {
      url: "https://placehold.co/100"
   },
   industry: {
      id: 2,
      documentId: "nd6yittvorchwenwxp57ncfm",
      title: "Job Category One",
      description: "Job Category One",
      slug: "job-category-1"
   },
   owner: {
      id: 1,
      documentId: "yvuddroxtgto5j3w8e91eoiy",
      username: "employer@gmail.com",
      email: "employer@gmail.com"
   },
   social_links: [
      {
         id: 12,
         type: "facebook",
         link: "https://facebook.com"
      }
   ],
   avg_salary: {
      title: "50k",
      value: "50k"
   }
}


<CompanyDetails block={block} data={data} />
```
