// placeholder import
import PlaceholderComponent from "./utils/placeholder"

// header import
import { PublicHeader } from "./blocks/public-header"
import { PrivateHeader } from "./blocks/private-header"

// footer import
import { ContactWidget } from "./widgets/contact-widget"
import { MenuWidget } from "./widgets/menu-widget"
import { CopyrightWidget } from "./widgets/copyright-widget"

// blocks import
import { JobBanner } from "./blocks/job-banner"
import { JobCategory } from "./blocks/job-category"
import { JobCard } from "./blocks/job-card"
import { BlogCard } from "./blocks/blog-card"
import { ReviewCard } from "./blocks/review-card"
import { JobFilter } from "./blocks/job-filter"
import CompanyFilter from "./blocks/company-filter"
import { CandidateFilter } from "./blocks/candidate-filter"

// single-type import
import JobDetails from "./single-type/job-details"
import CompanyDetails from "./single-type/company-details"
import { ResumeDetails } from "./single-type/resume-details"
import { BlogDetails } from "./single-type/blog-details"

// widgets import

import { TotalList } from "./widgets/total-list"
import { ClosedList } from "./widgets/closed-list"
import { OpenList } from "./widgets/open-list"
import BreadCrumbs from "./components/breadcrumbs"
import Checkbox from "./components/checkbox"
import { Card } from "./components/common/card"
import GoBackBtn from "./components/common/go-back-btn"
import CIcon from "./components/common/icon"

import TextFieldWithLabel from "./components/textField-with-label"
import Spacing from "./shared/spacing"
export * from "./widgets/applied-list"
export * from "./widgets/favorite-list"
export * from "./widgets/matched-list"

import ResumePreviewBox from "./blocks/resume-block/resumePreview"
import { PageLoader } from "./components/loader/pageLoader"
import { AppliedJobs } from "./blocks/applied-jobs"
import { CategoryBlock } from "./blocks/category-block"
import { MessageLayout } from "./blocks/chats"
import { LatestApplied } from "./blocks/latest-applied"
import { LatestBookmarks } from "./blocks/latest-bookmarks"
import { LatestNotifications } from "./blocks/latest-notification"
import { BookmarkTable } from "./blocks/list-bookmark"

import { ManageCompanies } from "./blocks/manage-companies"
import { ManageLists } from "./blocks/manage-list"
import { AppliedList } from "./widgets/applied-list"
import { FavoriteList } from "./widgets/favorite-list"
import { MatchedList } from "./widgets/matched-list"

import { AddResumeForm } from "./blocks/resume-block"
import { MyProfile } from "./blocks/profile"

// *** get the private components from the mapping
export const getPrivateComponents = {
   // header mapping
   // "block.private-header": { component: NavBar },
   "header.private-header": { component: PrivateHeader },

   // ?? Widget mapping
   "widget.total-list": { component: TotalList },
   "widget.open-list": { component: OpenList },
   "widget.closed-list": { component: ClosedList },
   "widget.bookmark-list": { component: ClosedList },
   // ?? Dashboard blocks mapping
   "widget.applied-lists": { component: AppliedList },
   "widget.favorite-lists": { component: FavoriteList },
   "widget.matched-lists": { component: MatchedList },
   "shared.spacing": { component: Spacing },
   "block.bookmark-list": { component: LatestBookmarks },
   "block.recent-activities": { component: LatestNotifications },
   "block.latest-applied": { component: LatestApplied },
   "config.message": { component: MessageLayout },
   "table.bookmark": { component: BookmarkTable },
   "block.manage-lists": { component: ManageLists },
   "block.manage-companies": { component: ManageCompanies },
   "table.applied-jobs": { component: AppliedJobs },
   "block.manage-resume": { component: AddResumeForm },
   "block.auth-profile": { component: MyProfile }
}

// *** get the public components from the mapping
export const getPublicComponents = {
   "header.breadcrumbs": { component: BreadCrumbs },

   // header mapping
   "header.top-bar": { component: PlaceholderComponent },
   "header.header-bottom": { component: PlaceholderComponent },
   "header.main-menu": { component: PublicHeader },
   // footer mapping
   "widget.contact-widget": { component: ContactWidget },
   "widget.menu-widget": { component: MenuWidget },
   "widget.copyright-bar": { component: CopyrightWidget },

   // block mapping
   "metajob-block.job-banner": { component: JobBanner },
   "metajob-block.job-category": { component: JobCategory },
   "block.category-card": { component: PlaceholderComponent },
   "block.job-card": { component: JobCard },
   "block.category-list": { component: CategoryBlock },
   "block.blog-card": { component: BlogCard },
   "block.review-block": { component: ReviewCard },
   "block.job-filter": { component: JobFilter },
   "block.company-filter": { component: CompanyFilter },
   "block.candidate-filter": { component: CandidateFilter },

   // single-type mapping
   "single-type.job-details": { component: JobDetails },
   "single-type.company-details": { component: CompanyDetails },
   "single-type.resume-details": { component: ResumeDetails },
   "single-type.blog-details": { component: BlogDetails }
}
