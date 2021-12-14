import React from 'react'
import money from 'core/utils/money'

interface IProps {
  penaltyFee: number;
}

const CancellationMessage: React.FC<IProps> = ({ penaltyFee }) => (
  penaltyFee === 0
    ? (
        <>
          We get it, things happen. Don’t worry <b>your card won’t be charged</b> if you cancel your appointment.
        </>
      )
    : (
      <>
        You are outside of the cancellation period and<br /> will be <b>charged {money(penaltyFee)}.</b>
      </>
      )
)

export default CancellationMessage
