import { usePineconeConfigStore } from "@/store/PineconeConfigStore";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CSSProperties, FC, useCallback, useState } from "react";
import axios from "axios";

interface Props {
  style?: CSSProperties;
}

export const Querier: FC<Props> = ({ style }) => {
  const [indexName, setIndexName] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState('');
  const environment = usePineconeConfigStore((state) => state.environment);
  const apiKey = usePineconeConfigStore((state) => state.apiKey);
  const query = useCallback(async () => {
    const result = await axios.post('/api/query', { apiKey, environment, indexName, parameters });
    setResult(JSON.stringify(result.data, null, 2));
  }, [environment, apiKey, indexName, parameters]);

  const description = `query ex. { "topK": 10000, "emptyVector": 1536, "filter": { "url": "https://www" } }`

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
      <Box><pre>{result}</pre></Box>
    </FormControl>
  );
};
