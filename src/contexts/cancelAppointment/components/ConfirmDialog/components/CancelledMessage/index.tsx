import React from 'react'
import money from 'core/utils/money'

interface IProps {
  penaltyFee: number;
}

const CancelledMessage: React.FC<IProps> = ({ penaltyFee }) => (
  penaltyFee === 0
    ? (
        <>
          Don’t worry <b>your card won’t be charged</b> and we hope to see you soon!
        </>
      )
    : (
      <>
        Your appointment has been cancelled.<br /> 
        The card will be <b>charged {money(penaltyFee)}.</b>
      </>
      )
)

export default CancelledMessage
