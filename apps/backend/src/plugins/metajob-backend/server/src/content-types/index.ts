import JobSetting from "./job-setting/schema.json";
import CompanySetting from "./company-setting/schema.json";
import ResumeSetting from "./resume-setting/schema.json";
import JobCategory from "./job-category/schema.json";
import Company from "./company/schema.json";
import Job from "./job/schema.json";
import Skill from "./skill/schema.json";
import AppliedJob from "./applied-job/schema.json";
import Bookmark from "./bookmark/schema.json";
import Resume from "./resume/schema.json";
import Testimonial from "./testimonial/schema.json";
import Package from "./package/schema.json";
import EmailHistory from "./email-history/schema.json";
import Chat from "./chat/schema.json";
import Message from "./message/schema.json";
import Membership from "./membership/schema.json";
import CompanySize from "./company-size/schema.json";
import Revenue from "./revenue/schema.json";
import AvgSalary from "./avg-salary/schema.json";
import JobType from "./job-type/schema.json";
import SalaryType from "./salary-type/schema.json";
import ExperienceLevel from "./experience-level/schema.json";
import AuthSetting from "./auth-setting/schema.json";

export default {
  "job-setting": {
    schema: JobSetting,
  },
  "company-setting": {
    schema: CompanySetting,
  },
  "resume-setting": {
    schema: ResumeSetting,
  },
  "job-category": {
    schema: JobCategory,
  },
  company: {
    schema: Company,
  },
  job: {
    schema: Job,
  },
  skill: {
    schema: Skill,
  },
  "applied-job": {
    schema: AppliedJob,
  },
  resume: {
    schema: Resume,
  },
  bookmark: {
    schema: Bookmark,
  },
  testimonial: {
    schema: Testimonial,
  },
  package: {
    schema: Package,
  },
  "email-history": {
    schema: EmailHistory,
  },
  chat: {
    schema: Chat,
  },
  message: {
    schema: Message,
  },
  membership: {
    schema: Membership,
  },
  "company-size": {
    schema: CompanySize,
  },
  revenue: {
    schema: Revenue,
  },
  "avg-salary": {
    schema: AvgSalary,
  },
  "job-type": {
    schema: JobType,
  },
  "salary-type": {
    schema: SalaryType,
  },
  "experience-level": {
    schema: ExperienceLevel,
  },
  "auth-setting": {
    schema: AuthSetting,
  },
};
