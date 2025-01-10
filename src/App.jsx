import { Suspense } from "react";
import ChatbotAssistant from "./component/ChatbotAI";
import HistoricalMissionPage from "./component/Content01";
import StorytellingPage from "./component/Storytelling";
import LoadingComponent from "./component/LoadingPage";

function App() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <StorytellingPage />
      {/* <HistoricalMissionPage /> */}
      <ChatbotAssistant />
    </Suspense>
  );
}

export default App;
