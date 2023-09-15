import { usePineconeConfigStore } from "@/store/PineconeConfigStore";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CSSProperties, FC } from "react";

interface Props {
  style?: CSSProperties;
}

export const Configurator: FC<Props> = ({ style }) => {
  const setEnvironment = usePineconeConfigStore(
    (state) => state.setEnvironment
  );
  const setApiKey = usePineconeConfigStore((state) => state.setApiKey);
  const setOpenAiKey = usePineconeConfigStore((state) => state.setOpenAiKey);

  return (
    <FormControl style={style}>
      <FormLabel>Pinecone Environment</FormLabel>
      <Input
        type="text"
        value={usePineconeConfigStore((state) => state.environment)}
        onChange={(e) => setEnvironment(e.target.value)}
      />
      <FormLabel>Pinecone API Key</FormLabel>
      <Input
        type="password"
        value={usePineconeConfigStore((state) => state.apiKey)}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <FormLabel>Open AI Key</FormLabel>
      <Input
        type="password"
        value={usePineconeConfigStore((state) => state.openAiKey)}
        onChange={(e) => setOpenAiKey(e.target.value)}
      />
    </FormControl>
  );
};
