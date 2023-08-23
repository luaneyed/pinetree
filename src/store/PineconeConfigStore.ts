import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PineconeConfig {
  environment: string;
  apiKey: string;
  setEnvironment: (environment: string) => void;
  setApiKey: (apiKey: string) => void;
}

export const usePineconeConfigStore = create(
  persist<PineconeConfig>(
    (set) => ({
      environment: "",
      apiKey: "",
      setEnvironment: (environment: string) => set({ environment }),
      setApiKey: (apiKey: string) => set({ apiKey }),
    }),
    {
      name: "pinecone-config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
