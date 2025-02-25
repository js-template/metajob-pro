import controller from "./controller";

import JobSettingController from "./job-setting";
import CompanySettingController from "./company-setting";
import ResumeSettingController from "./resume-setting";
import TestimonialController from "./testimonial";
import PackageController from "./package";
import MembershipController from "./membership";
import JobCategoryController from "./job-category";
import CompanyController from "./company";
import JobController from "./job";
import ResumeController from "./resume";
import AppliedJobController from "./applied-job";
import BookmarkController from "./bookmark";
import ChatController from "./chat";
import MessageController from "./message";
import ExperienceLevelController from "./experience-level";
import SalaryTypeController from "./salary-type";
import AvgSalaryController from "./avg-salary";
import emailHistory from "./email-history";
import CompanySizeController from "./company-size";
import RevenueController from "./revenue";

export default {
  "job-setting": JobSettingController,
  "company-setting": CompanySettingController,
  "resume-setting": ResumeSettingController,
  testimonial: TestimonialController,
  package: PackageController,
  membership: MembershipController,
  "job-category": JobCategoryController,
  company: CompanyController,
  job: JobController,
  resume: ResumeController,
  "applied-job": AppliedJobController,
  bookmark: BookmarkController,
  chat: ChatController,
  message: MessageController,
  "experience-level": ExperienceLevelController,
  "salary-type": SalaryTypeController,
  "avg-salary": AvgSalaryController,
  "email-history": emailHistory,
  "company-size": CompanySizeController,
  revenue: RevenueController,

  controller,
};
