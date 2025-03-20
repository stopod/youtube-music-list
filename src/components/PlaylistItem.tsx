import {
  Box,
  Center,
  CloseButton,
  Dialog,
  Image,
  Link,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { PlaylistItem as PlaylistItemType } from "../types/youtube";

interface PlaylistItemProps {
  item: PlaylistItemType;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ item }) => {
  return (
    <Box border={"solid 1px #ccc"} borderRadius="md" p={4}>
      <Dialog.Root placement="center">
        <Dialog.Trigger>
          <Box cursor="pointer">
            <VStack>
              <Image src={item.thumbnail} alt={item.title} />

              <Text>{item.title}</Text>
              <Text textStyle="xs">{item.videoOwnerChannelTitle}</Text>
            </VStack>
          </Box>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  <Link
                    href={`https://www.youtube.com/watch?v=${item.videoId}`}
                    target="_blank"
                  >
                    {item.title}
                  </Link>
                </Dialog.Title>
                <Dialog.CloseTrigger>
                  <CloseButton size="md" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Center>
                  <iframe
                    title={item.title}
                    src={`https://www.youtube-nocookie.com/embed/${item.videoId}`}
                    allowFullScreen
                  ></iframe>
                </Center>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default PlaylistItem;
