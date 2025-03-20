export interface PlaylistItem {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  channelTitle: string;
  videoOwnerChannelTitle: string;
}

export interface PlaylistResponse {
  items: PlaylistItem[];
  nextPageToken?: string;
  totalResults: number;
}
