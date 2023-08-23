"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Configurator } from "@/components/Configurator";
import { ChakraProvider } from "@chakra-ui/react";
import { Fetcher } from "@/components/Fetcher";

export default function Home() {
  return (
    <ChakraProvider>
      <Configurator style={{ margin: "30px", width: "500px" }} />
      <Fetcher style={{ margin: "30px" }} />
    </ChakraProvider>
  );
}
