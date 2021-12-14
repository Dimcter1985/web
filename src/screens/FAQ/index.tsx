import Text from 'components/Text'
import Title from 'components/Title'
import stylesBlock from 'utils/stylesBlock'
import Link from 'components/Link'
import StaticPageWrapper from 'components/StaticPage/StaticPageWrapper'
import StaticPageSubtitle from 'components/StaticPage/StaticPageSubtitle'
import { CONTACT_EMAIL } from 'core/consts'
import styles from './FAQ.module.scss'

const b = stylesBlock(styles)

const FAQ: React.FC = () => {
  return (
    <StaticPageWrapper>
      <Title size='small'>FAQ</Title>
      <StaticPageSubtitle>What is Snailz?</StaticPageSubtitle>
      <Text>
        Snailz is a booking and payment platform for beauty salons available on both mobile apps and the web. Withhundreds of salons on the platform to choose from, it improves the salon experience by enabling onlinbooking   and contactless payments, along with verified reviews and digital loyalty rewards.
      </Text>
      <StaticPageSubtitle>Where is Snailz offered?</StaticPageSubtitle>
      <Text>
        Snailz currently has hundreds of salons across Manhattan, Brooklyn, and Northern New Jersey and we’rexpanding   into other areas. We are adding new salons every week.
      </Text>
      <StaticPageSubtitle>Do I need to download an app?</StaticPageSubtitle>
      <Text>
        While you can book salons on our website, snailzapp.com, we suggest using our apps for the best experience.
      </Text>
      <StaticPageSubtitle>What are Snailz Rewardz?</StaticPageSubtitle>
      <Text>
        Snailz Rewardz is the industry's first rewards program for nail and beauty salon bookings. Earn 1 point for every dollar of spend and redeem for salon services. We also digitize the loyalty programs at your favorite salons. You can check your points balance and loyalty cards on the homescreen of our iOS and Android apps.
      </Text>
      <StaticPageSubtitle>How do I sign-up?</StaticPageSubtitle>
      <Text>
        Signing up is free! Select the Sign Up button and enter your name, email, and password and start usinSnailz   right away. If you ever forget your login password, you can easily reset it by going to the bottom othe Log In  screen on our iOS or Android app.
      </Text>
      <StaticPageSubtitle>How do I book an appointment?</StaticPageSubtitle>
      <Text>
        You can book appointments in multiple ways. You can search by type of service or by salon, or scroll throughyour favorites. Select your service, date and time and then press Reserve at the bottom and you are booked.Also, you can use quick links to your most recently booked services and browse through our populacategories.   Utilize the map feature in search results to browse by location.
      </Text>
      <StaticPageSubtitle>How do I cancel or modify an appointment?</StaticPageSubtitle>
      <Text>
        In the appointments calendar, select cancel or modify from your upcoming appointments to change the desiretime or service. Cancellations must be made on the app or website; calling the salon does not guarantecancellation on the app and you risk being charged. Check with your salons regarding their cancellatiopolicies as they differ for each salon. If you don't cancel an appointment and are unable to make it, youcard on file will be charged at the start time of your scheduled appointment. At that point you can request credit to your account from Snailz or a refund from the salon. Snailz does not issue refunds; credits only.
      </Text>
      <StaticPageSubtitle>Why do I have to provide my payment information?</StaticPageSubtitle>
      <Text>
        Ensuring a completely cashless experience requires us to collect payment information upfront. However, Snailnever charges you until your scheduled appointment and you can modify or cancel your appointment should youschedule change. Snailz payments are powered by PayPal and Universal Processing.
      </Text>
      <StaticPageSubtitle>When does Snailz charge me?</StaticPageSubtitle>
      <Text>
        Your card on file will be charged at the start time of your scheduled appointment. By booking on Snailz yoacknowledge that your card will be charged unless you cancel within the cancellation period for the salonOnce your card is charged, Snailz cannot issue a refund. You must go directly to the salon for refunds.
      </Text>
      <StaticPageSubtitle>What happens if I miss an appointment?</StaticPageSubtitle>
      <Text>
        Snailz makes cancelling or modifying your appointment very easy. You will also be provided with an upcominappointment text alert at least an hour before your appointment. However, should you miss your appointmentthe salon may charge a no show fee, so please check the salon’s no show policies.
      </Text>
      <StaticPageSubtitle>Why did I get charged a service fee?</StaticPageSubtitle>
      <Text>
        In order to power new and innovative features that enable salons to offer cashless payments and other helpfufeatures, appointments booked through Snailz will include a small service fee. The fee will be a percentage othe total cost of the service, excluding tax and tip.
      </Text>
      <StaticPageSubtitle>How to tip?</StaticPageSubtitle>
      <Text>
        Tipping is accepted at most Snailz salons. Look for the "Tip in-app" label. If you want to add tip after thservice has begun at a tipping in-app salon, you may do so by modifying the appointment and adding a custoservice "tip" for the amount you choose.
      </Text>
      <StaticPageSubtitle>How do I get a refund?</StaticPageSubtitle>
      <Text>
        If you are requesting a refund for services rendered or for a charge associated with a no-show or latcanceled appointment, please contact the salon directly. Snailz is the software provider your salon uses tmanage their business and cannot process refunds.
      </Text>
      <StaticPageSubtitle>How do I contact Snailz?</StaticPageSubtitle>
      <Text>
        Contact Snailz anytime at
        <Link 
          className={b('link')}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          info@snailzapp.com
        </Link>
      </Text>
    </StaticPageWrapper>
  )
}

export default FAQ