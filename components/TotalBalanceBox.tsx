import { formatAmount } from '@/lib/utils';
import React from 'react';
import DoughnutChart from './DoughnutChart';

type TotalBalanceBoxProps = {
  accounts: { name: string; currentBalance: number }[];
  totalBanks: number;
  totalCurrentBalance: number;
};

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance p-6 bg-white shadow-lg rounded-xl flex flex-col lg:flex-row gap-6">
      {/* Chart Section */}
      <div className="total-balance-chart flex-1 min-w-[380px] rounded-md">
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 min-w-[380px] items-start justify-between">
        {/* Balance Overview Header */}
        <div className="flex flex-col items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Balance Overview</h2>
        </div>

        {/* Total Info Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm w-full flex flex-col gap-6">
          {/* Total Accounts */}
          <div className="flex justify-between items-center text-gray-700">
            <span className="text-sm uppercase tracking-wide">Total Accounts</span>
            <span className="text-lg font-bold text-gray-900">{totalBanks}</span>
          </div>

          {/* Total Funds */}
          <div className="flex justify-between items-center text-gray-700">
            <span className="text-sm uppercase tracking-wide">Total Funds</span>
            <span className="text-xl font-bold text-gray-900">
              {formatAmount(totalCurrentBalance)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
