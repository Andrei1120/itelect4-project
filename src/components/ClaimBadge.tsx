import React from 'react';
import type { Claim } from '../types/index';

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="claim-badge" style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
      <p>Claim ID: {claim.id}</p>
      <p>Status: {claim.status}</p>
      <p>Claimed At: {claim.claimedAt.toLocaleDateString()}</p>
      {children}
    </div>
  );
};

export default ClaimBadge;
