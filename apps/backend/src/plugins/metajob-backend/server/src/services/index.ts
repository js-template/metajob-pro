import service from "./service";

import JobSettingService from "./job-setting";
import ResumeSettingService from "./resume-setting";
import CompanySettingService from "./company-setting";
import TestimonialService from "./testimonial";
import PackageService from "./package";
import MembershipService from "./membership";
import JobCategoryService from "./job-category";
import CompanyService from "./company";
import JobService from "./job";
import ResumeService from "./resume";
import AppliedJobService from "./applied-job";
import BookmarkService from "./bookmark";
import ChatService from "./chat";
import MessageService from "./message";
import ExperienceLevelService from "./experience-level";
import SalaryTypeService from "./salary-type";
import AvgSalaryService from "./avg-salary";
import emailHistory from "./email-history";
import CompanySizeService from "./company-size";
import RevenueService from "./revenue";
import JobTypeService from "./job-type";
import SkillService from "./skill";
import AuthSettingService from "./auth-setting";
import ErrorSettingService from "./error-setting";

export default {
  service,

  "job-setting": JobSettingService,
  "resume-setting": ResumeSettingService,
  "company-setting": CompanySettingService,
  testimonial: TestimonialService,
  package: PackageService,
  membership: MembershipService,
  "job-category": JobCategoryService,
  company: CompanyService,
  job: JobService,
  resume: ResumeService,
  "applied-job": AppliedJobService,
  bookmark: BookmarkService,
  chat: ChatService,
  message: MessageService,
  "experience-level": ExperienceLevelService,
  "salary-type": SalaryTypeService,
  "avg-salary": AvgSalaryService,
  "email-history": emailHistory,
  "company-size": CompanySizeService,
  revenue: RevenueService,
  "job-type": JobTypeService,
  skill: SkillService,
  "auth-setting": AuthSettingService,
  "error-setting": ErrorSettingService,
};
