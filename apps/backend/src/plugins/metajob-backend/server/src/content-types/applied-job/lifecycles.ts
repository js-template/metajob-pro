import createAppliedJobTemplate from "../../../../email-templates/appliedJob";

export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      // Receiver email from the populated owner
      const populatedOwner = await strapi
        .service("plugin::metajob-backend.applied-job")
        .findOne(result?.documentId, {
          populate: "*",
        });

      // Get the title and current time
      const title = populatedOwner?.job?.[0]?.title || "Applied Job Demo"; // Get the title from the created applied-job
      const currentTime = new Date().toISOString(); // Get current time in ISO format
      const subject = `Applied Job Successfully: ${title}`;
      const emailReceiver = populatedOwner?.owner?.email;
      const ownerId = populatedOwner?.owner?.id;

      // Load the email template
      const jobEmailTemplate = createAppliedJobTemplate(title);

      // Send email after job creation
      await strapi.plugins["email"].services.email.send({
        to: emailReceiver, // Receiver's email
        from: process.env.EMAIL_EMAIL,
        subject: "Job Applied", // Customized subject
        text: `Your job apply for "${title}" has been successfully created on ${currentTime}.`,
        html: jobEmailTemplate, // Use the HTML content
      });

      // Insert into email history collection after email is sent successfully
      const emailHistoryEntry = {
        title: subject,
        datetime: currentTime,
        receiver: emailReceiver,
        owner: {
          id: ownerId,
        },
      };

      // Create the email history entry using `entityService.create`
      await strapi.entityService.create(
        "plugin::metajob-backend.email-history",
        {
          data: emailHistoryEntry, // Insert the email history data
        },
      );
    } catch (err) {
      return true;
    }
  },
};
