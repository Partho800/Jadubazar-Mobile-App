import React from 'react';
import { ComingSoonView } from '../../components/ComingSoon/ComingSoonView';

export const WalletScreen: React.FC = () => {
  return (
    <ComingSoonView
      screenName="Wallet"
      iconName="wallet-outline"
      description="Manage your balances, deposit funds, process withdrawals, and view financial assets."
    />
  );
};
