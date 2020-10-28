const nodemailer = require('nodemailer');

// postmark
// sendgrid

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Order will be ready in the next 20mins.</p>
      <ul>
        ${order.map(
          (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name} />
          ${item.size} ${item.name} - ${item.price}
        </li>`
        )}
      </ul>
      <p>Your total is $${total} due at pickup</p>
    </div>
  `;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop',
      }),
    };
  }
  // validate data
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Ooops! You are missin ${field} field`,
        }),
      };
    }

    if (!body.order.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Why would you order nothing`,
        }),
      };
    }
  }

  const info = await transporter.sendMail({
    from: 'slick slices <slick@example.com>',
    to: `${body.name}, <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
