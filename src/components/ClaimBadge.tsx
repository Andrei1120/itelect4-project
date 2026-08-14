import React from 'react';
import type { Claim } from '../types/index';
import { ClaimStatus } from '../types/index';

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="claim-badge border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 m-2 shadow-sm transition-colors">
      <p className="font-semibold text-gray-900 dark:text-gray-100">Claim ID: {claim.id}</p>
      <p className="text-gray-600 dark:text-gray-400">
        Status:{' '}
        <span className={`font-medium ${claim.status === ClaimStatus.Pending ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
          {ClaimStatus.Pending === claim.status ? 'Pending' : claim.status === ClaimStatus.Approved ? 'Approved' : claim.status === ClaimStatus.Rejected ? 'Rejected' : 'Resolved'}
        </span>
      </p>
      <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Claimed At: {claim.claimedAt.toLocaleDateString()}</p>
      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default ClaimBadge;
