import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { PlaylistItem, PlaylistResponse } from "../src/types/youtube";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORSヘッダー設定
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { playlistId, pageToken } = req.query;

    if (!playlistId) {
      return res.status(400).json({ error: "playlistIdは必須です" });
    }

    if (!YOUTUBE_API_KEY) {
      return res
        .status(500)
        .json({ error: "YouTube API Keyが設定されていません" });
    }

    // YouTube Data APIを呼び出してプレイリスト情報を取得
    const playlistResponse = await axios.get(
      `${YOUTUBE_API_URL}/playlistItems`,
      {
        params: {
          part: "snippet,contentDetails",
          maxResults: 10,
          playlistId,
          pageToken: pageToken || undefined,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    const items: PlaylistItem[] = playlistResponse.data.items.map(
      (item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url,
        videoId: item.contentDetails.videoId,
        channelTitle: item.snippet.channelTitle,
      })
    );

    const response: PlaylistResponse = {
      items,
      nextPageToken: playlistResponse.data.nextPageToken,
      totalResults: playlistResponse.data.pageInfo.totalResults,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("YouTube API Error:", error);
    return res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
}
