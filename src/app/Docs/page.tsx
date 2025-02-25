"use client"
import React from 'react'

function Docs() {

    const renderText = (text) => {
        return (
            <p className='text-themeWhite font-Pooppins text-sm font-normal'>
                {text}
            </p>
        )
    }
    const renderHeading = (text) => {
        return (
            <p className='text-themeWhite font-Pooppins uppercase text-lg tracking-widest font-semibold mt-5'>
                {text}
            </p>
        )
    }

    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-themeGreen/80 font-Pooppins uppercase text-xl tracking-widest font-semibold mb-6'>Documentation / Q&A</h1>
            {renderText(`
            
            `)}

            <h3 className='text-themeGreen/80 font-Pooppins uppercase text-xl tracking-widest font-semibold mb-6'>What is VaultFI.pro</h3>
            {renderText(`
            VaultFi acts as a delegator between 5 selected and modifiable lending pools or vaults. The goal is to always deposit your money in the best pool and thereby get the maximum return. VaultFI is a project that is constantly being improved. The design has been kept simple and straightforward for the beginning in order to make the functions available as quickly as possible.
            `)}
            <h4 className='text-themeGreen/80 font-Pooppins uppercase text-xl tracking-widest font-semibold mb-6'>Who is VaultFI.pro intended for?</h4>
            {renderText(`
            VaultFi is for everyone on the Base network who wants to invest their USDC as simply and quickly as possible over the long term. Since VaultFI only uses selected and verified pools, there is a high level of security.
            `)}
            <h5 className='text-themeGreen/80 font-Pooppins uppercase text-xl tracking-widest font-semibold mb-6'>How does VaultFI.pro work?</h5>
            {renderText(`
            Behind this web app is a complex SmartContract that delegates your investment. There are repeated test phases which test the return of the pools and then select the best pool in which the majority of the USDC are invested. A vault token is minted for all funds invested, which shows your vault volume. It also acts as a confirmation so that you can make a withdrawal. As withdrawals during the test phase would negatively affect the test, withdrawals are not possible during the test phases.
            `)}
            <h6 className='text-themeGreen/80 font-Pooppins uppercase text-xl tracking-widest font-semibold mb-6'>What is the fee structure of VaultFI.pro?</h6>
            {renderText(`
            VaultFI does not pursue any financial interest. 
            There are only one fee.
            `)}
            {renderText(`
            ○ The first is the performance fee of the external pools, which VaultFI cannot influence. Normally this is between 5/15%.
            `)}
             {renderText(`
            ○ The second fee is the performance fee of VaultFI, which is set at 5% at the start. The sole purpose of this fee is to offset the server and gas cost.
            `)}
            {renderText(`
            The motto of this fee is; the higher the volume the lower the fee! As soon as the costs are covered, the fee will be adjusted.
            `)}
        </div>
    )
}

export default Docs
