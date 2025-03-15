export interface PlaylistItem {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  channelTitle: string;
}

export interface PlaylistResponse {
  items: PlaylistItem[];
  nextPageToken?: string;
  totalResults: number;
}
