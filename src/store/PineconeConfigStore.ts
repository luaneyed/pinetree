import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PineconeConfig {
  environment: string;
  apiKey: string;
  openAiKey: string;
  setEnvironment: (environment: string) => void;
  setApiKey: (apiKey: string) => void;
  setOpenAiKey: (openAiKey: string) => void;
}

export const usePineconeConfigStore = create(
  persist<PineconeConfig>(
    (set) => ({
      environment: "",
      apiKey: "",
      openAiKey: "",
      setEnvironment: (environment: string) => set({ environment }),
      setApiKey: (apiKey: string) => set({ apiKey }),
      setOpenAiKey: (openAiKey: string) => set({ openAiKey }),
    }),
    {
      name: "pinecone-config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
