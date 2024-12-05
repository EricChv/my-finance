import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
            <HeaderBox 
                type="greeting"
                title="Welcome back,"
                user={loggedIn?.firstName + '.' || "Guest"}
                subtext="Conveniently manage all your financial needs in one place."
            />

            <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={23400.99} // temp balance placeholder
            />
        </header>
        
        Recent transactions

      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 883.67}, {currentBalance: 254.20}]}
      />
    </section>
  );
};

export default Home
