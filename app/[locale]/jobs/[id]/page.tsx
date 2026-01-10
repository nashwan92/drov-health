import Image from "next/image";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function JobDetailsPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const jobId = Number(params.id);

  if (Number.isNaN(jobId)) {
    return (
      <div className="p-10 text-center text-red-600">
        Invalid job ID
      </div>
    );
  }

  const { data: job, error } = await supabaseServer
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error || !job) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Job not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          ID: {params.id}
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        {job.title}
      </h1>

      {job.image_url && (
        <Image
          src={job.image_url}
          alt={job.title}
          width={900}
          height={450}
          className="w-full rounded-xl object-cover"
        />
      )}

      <p className="whitespace-pre-line text-slate-700">
        {job.description}
      </p>
    </main>
  );
}
