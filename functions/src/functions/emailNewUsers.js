const { sendWelcomeEmail } = require('@/shared/mailer');

module.exports = async function emailNewUsers(user) {
  const { email } = user;
  await sendWelcomeEmail({ email });
};
