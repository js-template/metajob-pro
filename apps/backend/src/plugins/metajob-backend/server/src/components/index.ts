import JobInfo from "./ui/job-info.json";

// Blocks import here
import JobBanner from "./block/job-banner.json";
import JobCard from "./block/job-card.json";
import JobFilter from "./block/job-filter.json";
import CompanyFilter from "./block/company-filter.json";
import CandidateFilter from "./block/candidate-filter.json";
import Contact from "./block/contact.json";
import Portfolio from "./block/portfolio.json";
import Experience from "./block/experience.json";
import Pricing from "./block/pricing.json";
import BookmarkList from "./block/bookmark-list.json";
import Bookmark from "./block/bookmark.json";
import LatestApplied from "./block/latest-applied.json";
import AppliedJob from "./block/applied-jobs.json";
import ManageResume from "./block/manage-resume.json";
import ManageCompany from "./block/manage-companies.json";
import ManageJob from "./block/manage-job.json";
import NotificationList from "./block/notification-list.json";

// Single type import here
import JobDetails from "./single-type/job-details.json";
import CompanyDetails from "./single-type/company-details.json";
import ResumeDetails from "./single-type/resume-details.json";

// Component type import here

// Config import here
import MetaData from "./config/meta-data.json";
import JobRelation from "./config/relations.json";
import HeaderConfig from "./config/header-config.json";
import HeaderFiled from "./config/header-field.json";
import Message from "./config/message.json";
import SearchConfig from "./config/search-config.json";

// Widget import here
import CountCard from "./widget/count-card.json";
import TotalJob from "./widget/total-job.json";
import OpenJob from "./widget/open-job.json";
import ClosedJob from "./widget/closed-job.json";
import AppliedList from "./widget/applied-lists.json";
import FavoriteList from "./widget/favorite-lists.json";
import MatchedList from "./widget/matched-list.json";

export default {
  //Demo
  "ui.job-info": JobInfo,

  // Block export here
  "block.job-banner": JobBanner,
  "block.job-card": JobCard,
  "block.job-filter": JobFilter,
  "block.company-filter": CompanyFilter,
  "block.candidate-filter": CandidateFilter,
  "block.contact": Contact,
  "block.portfolio": Portfolio,
  "block.experience": Experience,
  "block.pricing": Pricing,
  "block.bookmark-list": BookmarkList,
  "block.bookmark": Bookmark,
  "block.latest-applied": LatestApplied,
  "block.applied-job": AppliedJob,
  "block.manage-resume": ManageResume,
  "block.manage-company": ManageCompany,
  "block.manage-job": ManageJob,
  "block.notification-list": NotificationList,

  // Single type export here
  "single-type.job-details": JobDetails,
  "single-type.company-details": CompanyDetails,
  "single-type.resume-details": ResumeDetails,

  // Component export here

  // Config export here
  "config.relations": MetaData,
  "config.meta-data": JobRelation,
  "config.header-config": HeaderConfig,
  "config.header-field": HeaderFiled,
  "config.message": Message,
  "config.search-config": SearchConfig,

  // Widget export here
  "widget.count-card": CountCard,
  "widget.total-job": TotalJob,
  "widget.open-job": OpenJob,
  "widget.closed-job": ClosedJob,
  "widget.applied-list": AppliedList,
  "widget.favorite-list": FavoriteList,
  "widget.matched-list": MatchedList,
};
