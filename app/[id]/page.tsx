import React from "react";
import ReactMarkdown from "react-markdown";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const response = await fetch(`http://localhost:3000/api/${id}`);
  const data = await response.json();
  console.log(data);
  return <ReactMarkdown>{data}</ReactMarkdown>;
};

export default page;
