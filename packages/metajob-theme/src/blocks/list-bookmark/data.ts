// *** table head ***
export const headCells = [
   {
      label: "Job Title",
      sort: true,
      align: "left"
   },
   {
      label: "Type",
      sort: true,
      align: "left"
   },
   {
      label: "Salary",
      sort: true,
      align: "left"
   },
   // {
   //    label: "Deadline",
   //    sort: true,
   //    align: "left"
   // },
   {
      label: "Status",
      sort: true,
      align: "left"
   },
   {
      label: "Action",
      sort: false,
      align: "center"
   }
] as {
   label: string
   sort: boolean
   align: "left" | "center" | "right"
}[]

// *** table rows ***
export const rows = [
   {
      title: "Software Engineer",
      company: "Google",
      location: "California",
      status: "Applied"
   },
   {
      title: "Frontend Developer",
      company: "Facebook",
      location: "California",
      status: "Not Applied"
   },
   {
      title: "Backend Developer",
      company: "Amazon",
      location: "California",
      status: "Applied"
   },
   {
      title: "Fullstack Developer",
      company: "Microsoft",
      location: "California",
      status: "Not Applied"
   },
   {
      title: "DevOps Engineer",
      company: "Apple",
      location: "California",
      status: "Applied"
   },
   {
      title: "Data Scientist",
      company: "Netflix",
      location: "California",
      status: "Not Applied"
   },
   {
      title: "Machine Learning Engineer",
      company: "Tesla",
      location: "California",
      status: "Applied"
   },
   {
      title: "Cloud Engineer",
      company: "Oracle",
      location: "California",
      status: "Not Applied"
   },
   {
      title: "Network Engineer",
      company: "Cisco",
      location: "California",
      status: "Applied"
   },
   {
      title: "Security Engineer",
      company: "IBM",
      location: "California",
      status: "Not Applied"
   }
] as {
   title: string
   company: string
   location: string
   status: string
}[]

// *** box header data ***
export const boxHeaderData = {
   title: "Bookmarks",
   searchPlaceholder: "Search",
   packageLeft: {
      label: "You have 3 Alar listing left",
      button: "Upgrade"
   },
   selectStatus: {
      placeholder: "Select Status",
      options: [
         {
            label: "All",
            value: 1
         },
         {
            label: "Applied",
            value: 2
         },
         {
            label: "Not Applied",
            value: 3
         }
      ],
      default: 0
   },
   showingPerPage: {
      label: "Showing per page",
      options: [10, 20, 30, 40, 50],
      default: 10
   }
}

// *** drawer data ***
export const drawerData = {
   title: "Add Note",
   icon: "mdi:clear-circle-outline",
   button: "Add Note",
   placeholder: "Add a note here",
   label: "Note"
}
