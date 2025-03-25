import { NextResponse } from "next/server";
import { notion } from "../libs/notion/notionAPI";

// GETメソッドのハンドラ関数
export async function GET() {
  try {
    // Notionデータベースからデータをクエリして取得
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_ID as string,
    });

    const allPosts = response.results.map((post: any) => {
      const id = post.id;

      // titleプロパティの取り出し
      const title = post.properties.title.title[0]?.plain_text;

      // dateプロパティの取り出し
      const date = post.properties.createDate.date.start;

      // colorプロパティの取り出し
      const color = post.properties.color.rich_text[0]?.plain_text;

      // multi_selectプロパティの取り出し（例：types）
      const tags = post.properties.tags.multi_select.map(
        (item: any) => item.name
      );

      // filesプロパティの取り出し（例：file）
      const files = post.properties.file.files.map(
        (file: any) => file.file.url
      );

      const isPublic = post.properties.isPublic.checkbox;
      return { id, title, date, color, tags, files, isPublic };
    });

    // データベースから取得したデータをJSONレスポンスとして返す
    return new NextResponse(JSON.stringify(allPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("データの取得に失敗しました:", error);

    // エラーレスポンスを返す
    return new NextResponse(
      JSON.stringify({ error: "データの取得に失敗しました。" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
