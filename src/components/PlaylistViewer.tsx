import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import {
  PlaylistItem as PlaylistItemType,
  PlaylistResponse,
} from "../types/youtube";

const PLAYLIST_ID = "PL1ydbA84LtpK_WBKTZCSZsjqorBo9us2N";

const PlaylistViewer: React.FC = () => {
  const [items, setItems] = useState<PlaylistItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPlaylist = async (pageToken?: string) => {
    try {
      setLoading(true);

      // バックエンドAPIを呼び出す
      const url = pageToken
        ? `/api/getPlaylist?playlistId=${PLAYLIST_ID}&pageToken=${pageToken}`
        : `/api/getPlaylist?playlistId=${PLAYLIST_ID}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("プレイリストの取得に失敗しました");
      }

      const data: PlaylistResponse = await response.json();

      if (pageToken) {
        setItems((prev) => [...prev, ...data.items]);
      } else {
        setItems(data.items);
      }

      setNextPageToken(data.nextPageToken);
      setHasMore(!!data.nextPageToken);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "不明なエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const loadMore = () => {
    if (nextPageToken && !loading) {
      fetchPlaylist(nextPageToken);
    }
  };

  return (
    <div className="playlist-viewer">
      <h1>YouTube Music プレイリスト</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="playlist-container">
        {items.map((item) => (
          <PlaylistItem key={item.id} item={item} />
        ))}
      </div>

      {loading && <div className="loading">読み込み中...</div>}

      {!loading && hasMore && (
        <button className="load-more-button" onClick={loadMore}>
          もっと見る
        </button>
      )}
    </div>
  );
};

export default PlaylistViewer;
