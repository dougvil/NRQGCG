"use client";
import { useHelloMessageQuery } from "@/server/graphql";

export default function Home() {
  const helloMessageQuery = useHelloMessageQuery({
    params: {
      name: "Douglas",
    },
  });
  return <h2>{helloMessageQuery.data?.hello.message}</h2>;
}
