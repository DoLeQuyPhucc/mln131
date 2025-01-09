import { Suspense } from "react";
import FloatingAssistantChatbot from "./component/ChatbotAI";
import HistoricalMissionPage from "./component/Content01";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoricalMissionPage />
      <FloatingAssistantChatbot />
    </Suspense>
  );
}

export default App;
