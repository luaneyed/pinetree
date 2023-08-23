import { create } from 'zustand'

interface PineconeConfig {
  environment: string,
  apiKey: string,
  setEnvironment: (environment: string) => void,
  setApiKey: (apiKey: string) => void,
}

export const usePineconeConfigStore = create<PineconeConfig>((set) => ({
  environment: '',
  apiKey: '',
  setEnvironment: (environment: string) => set({ environment }),
  setApiKey: (apiKey: string) => set({ apiKey }),
}))
