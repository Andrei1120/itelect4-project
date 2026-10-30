import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { askAi } from "../api/client";
import type { AiReply, AiUrgency } from "../types/index";

// ---- Zod schema for the form (mirrors backend validation) ----
const FormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so the AI has enough context.")
    .max(2000, "Description must be at most 2000 characters."),
});
type FormValues = z.infer<typeof FormSchema>;

// ---- Helper: urgency badge style ----
const urgencyStyle: Record<AiUrgency, { label: string; cls: string; icon: string }> = {
  low:    { label: "Low",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800", icon: "🟢" },
  medium: { label: "Medium", cls: "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-300  dark:border-amber-800",   icon: "🟡" },
  high:   { label: "High",   cls: "bg-rose-50   text-rose-700   border-rose-200   dark:bg-rose-950/40   dark:text-rose-300   dark:border-rose-800",     icon: "🔴" },
};

export default function AiAssistantPage() {
  const [result, setResult] = useState<AiReply | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  const charCount = watch("prompt")?.length ?? 0;

  const mutation = useMutation({
    mutationFn: (values: FormValues) => askAi(values.prompt),
    onSuccess: (data) => setResult(data),
  });

  const onSubmit = (values: FormValues) => {
    setResult(null);
    mutation.mutate(values);
  };

  const urgency = result ? urgencyStyle[result.urgencyLevel] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          🤖 AI Lost &amp; Found Assistant
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Describe your lost or found item and our AI will analyse it for you.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4"
        id="ai-form"
      >
        <label
          htmlFor="prompt"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          Item description
        </label>

        <textarea
          id="prompt"
          {...register("prompt")}
          rows={5}
          placeholder="e.g. I lost my student ID card near the cafeteria this morning..."
          className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Char counter + validation */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className={errors.prompt ? "text-rose-500" : ""}>
            {errors.prompt ? errors.prompt.message : "20 – 2000 characters"}
          </span>
          <span className={charCount > 2000 ? "text-rose-500 font-bold" : ""}>
            {charCount} / 2000
          </span>
        </div>

        {/* Mutation error (from server: 400 / 429 / 502) */}
        {mutation.isError && (
          <p className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
            ⚠️ {(mutation.error as Error).message}
          </p>
        )}

        <button
          id="ai-submit"
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white text-sm font-bold transition shadow-sm"
        >
          {mutation.isPending ? "Analysing…" : "Analyse with AI ✨"}
        </button>
      </form>

      {/* Result card */}
      {result && urgency && (
        <div
          id="ai-result"
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6"
        >
          {/* Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
              Summary
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Urgency level (z.enum field) */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Urgency Level
            </h2>
            <span
              id="ai-urgency"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${urgency.cls}`}
            >
              {urgency.icon} {urgency.label}
            </span>
          </div>

          {/* Suggested categories (array field) */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Suggested Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.suggestedCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Next steps (array field) */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Next Steps
            </h2>
            <ol className="space-y-2">
              {result.nextSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Encouragement */}
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900 px-5 py-4">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 leading-relaxed">
              💬 {result.encouragement}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
