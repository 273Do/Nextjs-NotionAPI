import React from "react";

const NotionData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
  }

  return <div>notionData</div>;
};

export default NotionData;
