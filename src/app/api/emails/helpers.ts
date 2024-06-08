async function getEmail(emailId: any, gmail: any) {
  const response = await gmail.users.messages.get({
    id: emailId,
    userId: "me",
  });
  const {
    id,
    snippet,
    payload: { headers },
  } = response.data;
  const subjectHeader = headers.find(
    (header: any) => header.name === "Subject"
  );
  const fromHeader = headers.find((header: any) => header.name === "From");
  const extractedFrom = fromHeader.value.substring(
    fromHeader.value.indexOf("<") + 1,
    fromHeader.value.lastIndexOf(">")
  );

  return { id, snippet, subject: subjectHeader?.value, from: extractedFrom };
}

export { getEmail };
