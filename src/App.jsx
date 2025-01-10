import { Suspense } from "react";
import FloatingAssistantChatbot from "./component/ChatbotAI";
import HistoricalMissionPage from "./component/Content01";
import StorytellingPage from "./component/Storytelling";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StorytellingPage />
      {/* <HistoricalMissionPage /> */}
      <FloatingAssistantChatbot />
    </Suspense>
  );
}

export default App;
