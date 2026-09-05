import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiClaim, ApiLostFoundItem } from "../types/index";
import { ClaimStatus } from "../types/index";
import { claimSchema, type ClaimFormValues } from "../schemas/claimSchema";
import ClaimBadge from "../components/ClaimBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchClaims, createClaim, fetchItems } from "../api/client";

function ClaimsPage() {
  const queryClient = useQueryClient();

  // useForm holds the values, runs the schema, and stores the errors.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    mode: "onBlur",
    defaultValues: {
      itemId: "",
      contactEmail: "",
      claimReason: "",
    },
  });

  // Query items for the dropdown
  const items = useQuery<ApiLostFoundItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // 1. READ: Fetch claims list with useQuery
  const { data, isPending, isError, error } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  // 2. WRITE: useMutation to create a new claim and invalidate query on success
  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      reset(); // Clears all fields at once
    },
  });

  // handleSubmit only calls this after the schema passes
  const onSubmit = (values: ClaimFormValues): void => {
    addClaim.mutate({
      itemId: parseInt(values.itemId, 10),
      claimerId: 1, // Current demo student user
      status: ClaimStatus.Pending,
      claimedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">
        Loading claims...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>

      {/* Form wired with React Hook Form, Zod resolver, and Shadcn UI */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-xl border border-border bg-white dark:bg-[#0f172a] p-5 shadow-xs"
      >
        <h3 className="text-base font-semibold text-foreground">
          File a New Claim
        </h3>

        {/* Course / Item select field */}
        <div className="grid gap-1.5">
          <Label htmlFor="itemId" className="text-foreground">
            Select Item to Claim
          </Label>
          <select
            id="itemId"
            {...register("itemId")}
            aria-invalid={errors.itemId ? true : undefined}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Choose an item...</option>
            {items.data?.map((item) => (
              <option key={item.id} value={item.id}>
                #{item.id} - {item.title} ({item.location})
              </option>
            ))}
          </select>
          {errors.itemId && (
            <p className="text-sm text-red-600">{errors.itemId.message}</p>
          )}
        </div>

        {/* Contact Email field */}
        <div className="grid gap-1.5">
          <Label htmlFor="contactEmail" className="text-foreground">
            Contact Email
          </Label>
          <Input
            id="contactEmail"
            type="email"
            {...register("contactEmail")}
            aria-invalid={errors.contactEmail ? true : undefined}
            placeholder="juan@dlsl.edu.ph"
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-600">{errors.contactEmail.message}</p>
          )}
        </div>

        {/* Proof / Reason field */}
        <div className="grid gap-1.5">
          <Label htmlFor="claimReason" className="text-foreground">
            Proof of Ownership / Distinct Details
          </Label>
          <Input
            id="claimReason"
            {...register("claimReason")}
            aria-invalid={errors.claimReason ? true : undefined}
            placeholder="Describe unique marks, serial number, or stickers..."
          />
          {errors.claimReason && (
            <p className="text-sm text-red-600">{errors.claimReason.message}</p>
          )}
        </div>

        {/* Button: never disabled on invalid; only disabled while pending */}
        <Button
          type="submit"
          disabled={addClaim.isPending}
          className="justify-self-start"
        >
          {addClaim.isPending ? "Saving..." : "Submit Claim"}
        </Button>
      </form>

      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700 dark:text-red-400">
          {addClaim.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((claim) => (
          <ClaimBadge key={claim.id} claim={claim}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Claimed for Item #{claim.itemId}
            </p>
          </ClaimBadge>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">
          No claims recorded yet.
        </p>
      )}
    </div>
  );
}

export default ClaimsPage;
