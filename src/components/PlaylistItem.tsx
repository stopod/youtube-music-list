import React from "react";
import { PlaylistItem as PlaylistItemType } from "../types/youtube";

interface PlaylistItemProps {
  item: PlaylistItemType;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ item }) => {
  return (
    <div className="playlist-item">
      <a
        href={`https://www.youtube.com/watch?v=${item.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="playlist-item-link"
      >
        <div className="thumbnail">
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="details">
          <h3 className="title">{item.title}</h3>
          <p className="channel">{item.channelTitle}</p>
        </div>
      </a>
    </div>
  );
};

export default PlaylistItem;
