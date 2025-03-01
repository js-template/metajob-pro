import createResumeTemplate from "../../../../email-templates/resume";

export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      // Get the title and current time
      const title = result?.name; // Get the title from the created resume
      const currentTime = new Date().toISOString(); // Get current time in ISO format
      const subject = `Resume Created Successfully: ${title}`;

      // Receiver email from the populated owner
      const populatedOwner = await strapi
        .service("plugin::metajob-backend.resume")
        .findOne(result?.documentId, {
          populate: "*", // Change this to your relation name
        });

      const emailReceiver = populatedOwner?.user?.email;
      const ownerId = populatedOwner?.user?.id;

      // Load the email template
      const resumeEmailTemplate = createResumeTemplate(title);

      // Send email after resume creation
      await strapi.plugins["email"].services.email.send({
        to: emailReceiver, // Receiver's email
        from: process.env.EMAIL_EMAIL,
        subject: "Resume Created", // Customized subject
        text: `Your resume posting "${title}" has been successfully created on ${currentTime}.`,
        // html: emailTemplate, // Use the HTML content
        html: resumeEmailTemplate, // Use the HTML content
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
      console.log("create-resume lifecycle error:", err);
    }
  },
};
