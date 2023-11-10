import { CreateGPT } from "@/app/_components/CreateGPT";
import { api } from "@/trpc/server";
import { ThemeToggle } from "./_components/ThemeToggle";
import { Button } from "./_components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./_components/ui/card";

export default function Home() {
  // const allGPTs = await api.gpt.getAll.query();
  // console.log(allGPTs);

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <CrudShowcase />
    </div>
  );
}

async function CrudShowcase() {
  const allGPTs = await api.gpt.getAll.query();

  if (!allGPTs) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col gap-2">
      {allGPTs.map((gpt) => (
        <div key={gpt.id}>
          <Card>
            <CardHeader>
              <h2>{gpt.name}</h2>
            </CardHeader>
            <CardContent>
              <p>{gpt.description}</p>
              <p>By: {gpt.creator}</p>
            </CardContent>
            <CardFooter>
              <p>{gpt.url}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
