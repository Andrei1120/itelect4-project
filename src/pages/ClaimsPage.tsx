import ClaimBadge from "../components/ClaimBadge";
import { allClaims } from "../data/mockData";
import { allItems } from "../data/mockData";

function ClaimsPage() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allClaims.map((claim) => {
          const item = allItems.find((i) => i.id === claim.itemId);
          return (
            <ClaimBadge key={claim.id} claim={claim}>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Item: {item ? item.title : "Unknown Item"}
                </p>
              </div>
            </ClaimBadge>
          );
        })}
      </div>
    </div>
  );
}

export default ClaimsPage;
