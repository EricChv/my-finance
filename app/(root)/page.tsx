import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
    const loggedIn = { 
      firstName: "Eric", lastName: "Chavarria", email: "chvr.eric@gmail.com" 
    };

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
                totalCurrentBalance={4500} // temp balance placeholder
            />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 883.67}, {currentBalance: 254.20}]}
      />

    </section>
  )
}

export default Home
