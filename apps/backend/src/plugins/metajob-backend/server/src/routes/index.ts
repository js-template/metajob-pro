import JobSettingRoute from "./job-setting";
import ResumeSettingRoute from "./resume-setting";
import CompanySettingRoute from "./company-setting";
import TestimonialRoute from "./testimonial";
import PackageRoute from "./package";
import MembershipRoute from "./membership";
import JobCategoryRoute from "./job-category";
import CompanyRoute from "./company";
import JobRoute from "./job";
import ResumeRoute from "./resume";
import AppliedJobRoute from "./applied-job";
import BookmarkRoute from "./bookmark";
import ChatRoute from "./chat";
import MessageRoute from "./message";
import ExperienceLevelRoute from "./experience-level";
import SalaryTypeRoute from "./salary-type";
import AvgSalaryRoute from "./avg-salary";
import emailHistory from "./email-history";
import CompanySizeRoute from "./company-size";
import RevenueRoute from "./revenue";
import JobTypeRoute from "./job-type";
import SkillRoute from "./skill";
import AuthSettingRoute from "./auth-setting";

export default {
  "job-setting": JobSettingRoute,
  "resume-setting": ResumeSettingRoute,
  "company-setting": CompanySettingRoute,
  testimonial: TestimonialRoute,
  package: PackageRoute,
  membership: MembershipRoute,
  "job-category": JobCategoryRoute,
  company: CompanyRoute,
  job: JobRoute,
  resume: ResumeRoute,
  "applied-job": AppliedJobRoute,
  bookmark: BookmarkRoute,
  chat: ChatRoute,
  message: MessageRoute,
  "experience-level": ExperienceLevelRoute,
  "salary-type": SalaryTypeRoute,
  "avg-salary": AvgSalaryRoute,
  "email-history": emailHistory,
  "company-size": CompanySizeRoute,
  revenue: RevenueRoute,
  "job-type": JobTypeRoute,
  skill: SkillRoute,
  "auth-setting": AuthSettingRoute,
};
