import React from 'react';
import { ComingSoonView } from '../../components/ComingSoon/ComingSoonView';

export const TransactionsScreen: React.FC = () => {
  return (
    <ComingSoonView
      screenName="Transactions"
      iconName="swap-horizontal-outline"
      description="Track transaction history, pending payments, transfer status, and detailed receipts."
    />
  );
};
