const nodemailer = require("nodemailer");

async function getEmail(emailId: any, gmail: any) {
  const response = await gmail.users.messages.get({
    id: emailId,
    userId: "me",
  });

  const {
    id,
    snippet,
    payload: { headers, parts },
  } = response.data;

  const subjectHeader = headers.find(
    (header: any) => header.name === "Subject"
  );

  const fromHeader = headers.find((header: any) => header.name === "From");

  const extractedFrom = fromHeader.value.substring(
    fromHeader.value.indexOf("<") + 1,
    fromHeader.value.lastIndexOf(">")
  );

  //   if (parts) {
  //     console.log(decodeBody(parts));
  //   }

  return {
    id,
    snippet,
    subject: subjectHeader.value,
    from: extractedFrom,
    body: decodeBody(parts),
  };
}

export { getEmail };

function decodeBody(parts: any) {
  let parser: string = "";
  if (parts) {
    parts.forEach((part: any) => {
      if (part.body && part.body.data) {
        parser += Buffer.from(part.body.data, "base64").toString("utf-8");
      } else if (part.parts) {
        parser += decodeBody(part.parts);
      }
    });
  }

  return parser;
}
