import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
    const loggedIn = { firstName: "Eric"};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
            <HeaderBox 
                type="greeting"
                title="Welcome back,"
                user={loggedIn?.firstName + '!' || "Guest"}
                subtext="Conveniently manage all your financial needs in one place."
            />

            <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={4500} // temp balance placeholder
            />
        </header>
      </div>
    </section>
  )
}

export default Home
