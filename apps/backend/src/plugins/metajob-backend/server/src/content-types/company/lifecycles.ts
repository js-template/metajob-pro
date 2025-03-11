import createCompanyTemplate from "../../../../email-templates/company";

export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      // Get the title and current time
      const title = result?.name; // Get the title from the created company
      const currentTime = new Date().toISOString(); // Get current time in ISO format
      const subject = `Company Created Successfully: ${title}`;

      // Receiver email from the populated owner
      const populatedOwner = await strapi
        .service("plugin::metajob-backend.company")
        .findOne(result?.documentId, {
          populate: "*", // Change this to your relation name
        });

      const emailReceiver = populatedOwner?.owner?.email;
      const ownerId = populatedOwner?.owner?.id;

      // Load the email template
      const companyEmailTemplate = createCompanyTemplate(title);

      // Send email after job creation
      await strapi.plugins["email"].services.email.send({
        to: emailReceiver, // Receiver's email
        from: process.env.EMAIL_EMAIL,
        subject: "Company Created", // Customized subject
        text: `Your company posting "${title}" has been successfully created on ${currentTime}.`,
        html: companyEmailTemplate, // Use the HTML content
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
      const entry = await strapi.entityService.create(
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
