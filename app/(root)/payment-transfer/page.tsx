import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id })
  if (!accounts) return;

  return (
    <section className='payment-transfer'>
      <HeaderBox
        title='Payment Transfer'  
        subtext='Enter your banking information'
      />
      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accounts.data}/>
      </section>
    </section>
  )
}

export default Transfer
