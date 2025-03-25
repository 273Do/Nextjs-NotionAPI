import Image from "next/image";
import React from "react";

const NotionData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api");
    const data = await response.json();
    console.log(data);

    return (
      <>
        {data.map((post: any) => {
          return (
            <div
              key={post.id}
              style={{ border: "1px solid white", margin: "10px" }}
            >
              <h2 style={{ color: post.color }}>{post.title}</h2>
              <p>{post.date}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {post.tags.map((tag: string) => {
                  return <p key={tag}>#{tag}</p>;
                })}
              </div>
              {post.files.length ? (
                <img src={post.files} alt={post.title} width={100} />
              ) : (
                <p>no file</p>
              )}
            </div>
          );
        })}
      </>
    );
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
  }
};

export default NotionData;
