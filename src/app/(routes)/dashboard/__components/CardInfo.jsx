import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import formatNumber from "../../../../../utils";
import getFinancialAdvice from "../../../../../utils/getFinancialAdvice";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudgets, setTotalBudgets] = useState(0);
  const [totalSpends, setTotalSpends] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      calculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudgets > 0 || totalIncome > 0 || totalSpends > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudgets,
          totalIncome,
          totalSpends
        );
        setFinancialAdvice(advice);
      };
      fetchFinancialAdvice();
    }
  }, [totalBudgets, totalIncome, totalSpends]);

  const calculateCardInfo = () => {
    let totalBudget = 0;
    let totalSpend = 0;
    let totalIncome = 0;

    budgetList.forEach((element) => {
      totalBudget += Number(element.amount);
      totalSpend += Number(element.totalSpend);
    });

    incomeList.forEach((element) => {
      totalIncome += Number(element.totalAmount);
    });

    setTotalBudgets(totalBudget);
    setTotalSpends(totalSpend);
    setTotalIncome(totalIncome);
  };

  return (
    <div>
      {budgetList.length > 0 ? (
        <div>
          <div className="p-7 border mt-4 rounded-2xl flex items-center justify-between">
            <div className="">
              <div className="flex mb-2 flex-row space-x-1 items-center">
                <h2>Finan Smart AI</h2>
                <Sparkles className="rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate" />
              </div>
              <h2 className="font-light text-md">
                {financialAdvice || "loading financial advice..."}
              </h2>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">
                  ${formatNumber(totalBudgets)}
                </h2>
              </div>
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. of budget</h2>
                <h2 className="font-bold text-2xl">${budgetList?.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income streams</h2>
                <h2 className="font-bold text-2xl">
                  ${formatNumber(totalIncome)}
                </h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="font-bold text-2xl">
                  ${formatNumber(totalSpends)}
                </h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CardInfo;