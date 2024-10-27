import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  return (
    <div className="flex flex-col">
        <Link href="/" className="bank-card">
          <div className="bank-card_content">
            <div>
              <h1 className="text-16 font-semibold text-white">
                {account.name || userName}
              </h1>
              <p className="font-ibm-plex-serif font-black text-white">
                {formatAmount(account.currentBalance)}
              </p>
            </div>
            <article className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h1 className="text-10 font-semibold text-white">
                <p className="text-10 font-semibold tracking-[1.1px] text-white">
                  ●●●● ●●●● ●●●●  <span className="text-12">5656</span>
                </p>
                </h1>
                
              </div>
              <h2 className="text-10 font-semibold text-white">
                ●● / ●●
                </h2>
            </article>
          </div>

          <div className="bank-card-icon">
            <Image 
              src="/icons/Paypass.svg"
              width={20}
              height={24}
              alt="pay"
              className="mt-3 ml-4"
            />
            <Image 
              src="/icons/visa.svg"
              width={45}
              height={32}
              alt="visa"
              className="mt-28 ml-1 mr-5"

            />
          </div>

          <Image 
            src="/icons/card-texture.svg"
            width={316}
            height={190}
            alt="texture"
            className="absolute top-0 left-0"
          />
        </Link>

        {/* COPY FUNCTION */}
    </div>
  )
}

export default BankCard
