# JobDetails Component

The **JobDetails** component displays a job details data category pages.

## Props

- `block`: An object containing:
   - `id`: Block id as number.
   - `title`: Block title as string.
   - `related_lists`: related_lists as boolean value.
   - `empty`: An objects for empty data with attributes `title`, `description`,

## Usage

1. Import the `JobDetails` component.
2. Pass a `data` object with the appropriate structure.

### Example

```tsx
import JobCard from "@/ui"

const blockData = {
   __component: "single-type.job-details",
   id: 11,
   title: "Job Detail",
   related_lists: true,
   empty: {
      title: "No Data Founds",
      description: "Try to refresh the page or check back later"
   }
}

const jobData = {
   id: 14,
   documentId: "mqk6o6jntwhqw4y5p3l4exdo",
   title: "Job One",
   startDate: "2024-12-03",
   price: 200,
   description: "**Lorem ipsum dolor** sit amet consectetur adipisicing elit.",
   vacancy: 4,
   slug: "job-one",
   job_status: "draft",
   endDate: "2024-12-25",
   createdAt: "2024-12-04T07:51:05.326Z",
   updatedAt: "2024-12-05T12:11:05.245Z",
   publishedAt: "2024-12-05T12:11:05.270Z",
   category: {
      id: 2,
      documentId: "nd6yittvorchwenwxp57ncfm",
      title: "Job Category One",
      description: "Job Category One",
      slug: "job-category-1"
   },
   type: {
      title: "Full Time",
      value: "full-time"
   },
   skills: [
      {
         id: 2,
         title: "Skill One",
         value: "skill-one"
      }
   ],
   company: {
      id: 6,
      documentId: "i8yp3pajdhqutet9qwizip3n",
      name: "Company One",
      tagline: "company Tag",
      email: "employer@metalancer.net",
      phone: "+121345566",
      website: "https://test.com",
      slug: "company-one",
      about: "Company about",
      logo: {
         url: "https://placehold.co/150"
      }
   },
   owner: {
      id: 1,
      documentId: "yvuddroxtgto5j3w8e91eoiy",
      email: "employer@gmail.com"
   }
}


<JobDetails block={blockData} data={jobData} />
```
