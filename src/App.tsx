import { Box } from "@chakra-ui/react";
import PlaylistViewer from "./components/PlaylistViewer";
import { ColorModeButton } from "./components/ui/color-mode";

function App() {
  return (
    <Box>
      <Box position="absolute" right="10px">
        <ColorModeButton />
      </Box>
      <Box maxW={"1200px"} m={"auto"} mt={4}>
        <PlaylistViewer />
      </Box>
    </Box>
  );
}

export default App;
