import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import {
  PlaylistItem as PlaylistItemType,
  PlaylistResponse,
} from "../types/youtube";
import {
  Button,
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Center,
  Text,
} from "@chakra-ui/react";

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
    <Box>
      <Stack gap={4}>
        <Heading size={"3xl"}>文化的な生活のプレイリスト</Heading>

        {error && <Text>{error}</Text>}

        <SimpleGrid gap={4} columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
          {items.map((item) => (
            <PlaylistItem key={item.id} item={item} />
          ))}
        </SimpleGrid>

        <Center>
          {hasMore && (
            <Button
              onClick={loadMore}
              colorPalette={"pink"}
              variant="surface"
              loading={loading}
              size={"2xl"}
            >
              もっとみる
            </Button>
          )}
        </Center>
      </Stack>
    </Box>
  );
};

export default PlaylistViewer;
