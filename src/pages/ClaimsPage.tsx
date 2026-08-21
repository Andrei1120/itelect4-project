import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiClaim } from "../types/index";
import { ClaimStatus } from "../types/index";
import ClaimBadge from "../components/ClaimBadge";
import { fetchClaims, createClaim } from "../api/client";

function ClaimsPage() {
  const [itemId, setItemId] = useState<string>("");
  const queryClient = useQueryClient();

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
      setItemId("");
    },
  });

  const handleAdd = (): void => {
    const parsedItemId = parseInt(itemId, 10);
    if (isNaN(parsedItemId)) return;

    addClaim.mutate({
      itemId: parsedItemId,
      claimerId: 1, // Current demo student user
      status: ClaimStatus.Pending,
      claimedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">Loading claims...</div>;
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

      <div className="mb-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">
          File a New Claim
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="Enter Item ID to claim (e.g., 1, 2, 3)..."
            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            disabled={itemId.trim() === "" || addClaim.isPending}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {addClaim.isPending ? "Submitting..." : "Submit Claim"}
          </button>
        </div>
      </div>

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
