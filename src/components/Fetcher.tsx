import { usePineconeConfigStore } from "@/store/PineconeConfigStore";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CSSProperties, FC, useCallback, useState } from "react";
import axios from "axios";

interface Props {
  style?: CSSProperties;
}

export const Fetcher: FC<Props> = ({ style }) => {
  const [indexName, setIndexName] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState('');
  const environment = usePineconeConfigStore((state) => state.environment);
  const apiKey = usePineconeConfigStore((state) => state.apiKey);
  const fetch = useCallback(async () => {
    const result = await axios.post('/api/fetch', { apiKey, environment, indexName, parameters });
    result.data;
    setResult(JSON.stringify(result.data));
  }, [environment, apiKey, indexName, parameters]);

  return (
    <FormControl style={style}>
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
      <Button onClick={fetch}>Fetch</Button>
      <Box>{result}</Box>
    </FormControl>
  );
};
