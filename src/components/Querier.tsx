import { usePineconeConfigStore } from "@/store/PineconeConfigStore";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CSSProperties, FC, useCallback, useState } from "react";
import axios from "axios";
import { JsonViewer } from "@textea/json-viewer";

interface Props {
  style?: CSSProperties;
}

export const Querier: FC<Props> = ({ style }) => {
  const [indexName, setIndexName] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState({});
  const environment = usePineconeConfigStore((state) => state.environment);
  const apiKey = usePineconeConfigStore((state) => state.apiKey);
  const openAiKey = usePineconeConfigStore((state) => state.openAiKey);
  const query = useCallback(async () => {
    const result = await axios.post('/api/query', { apiKey, openAiKey, environment, indexName, parameters });
    setResult(result.data);
  }, [environment, apiKey, openAiKey, indexName, parameters]);

  const description = `query ex. { "topK": 10000, "emptyVector": 1536, "filter": { "url": "httpsblah" } }`

  return (
    <FormControl style={style}>
      {description}
      <FormLabel>indexName</FormLabel>
      <Input
        type="text"
        value={indexName}
        onChange={(e) => setIndexName(e.target.value)}
      />
      <FormLabel>parameters</FormLabel>
      <Input
        type="text"
        value={parameters}
        onChange={(e) => setParameters(e.target.value)}
      />
      <Button onClick={query}>Query</Button>
      <JsonViewer value={result} theme='auto' />
    </FormControl>
  );
};
