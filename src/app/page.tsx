import { api } from "@/trpc/server";
import { GPT } from "./_components/GPT";
import { Input } from "./_components/ui/input";

export default async function Home() {
  const allGPTs = await api.gpt.getAll.query();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-6xl font-bold self-center">
          GPTs Browser
        </h1>

        <Input
          className="w-full"
          placeholder="Search GPTs..."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {allGPTs.length > 0 ? (
            allGPTs.map((gpt) => (
              <GPT key={gpt.id} gpt={gpt} />
            ))
          ) : (
            <p>No GPTs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
