import Text from 'components/Text'
import Title from 'components/Title'
import stylesBlock from 'utils/stylesBlock'
import StaticPageWrapper from 'components/StaticPage/StaticPageWrapper'
import StaticPageSubtitle from 'components/StaticPage/StaticPageSubtitle'
import { LANDING_PATH } from 'consts/pages'
import { CONTACT_EMAIL } from 'core/consts'
import Link from 'components/Link'
import styles from './Privacy.module.scss'
import {
  info,
  useInfo,
  shareInfo,
  choicesInfo,
} from './consts'

const b = stylesBlock(styles)

const Privacy: React.FC = () => {
  return (
    <StaticPageWrapper>
      <Title className={b('title')} size='small'>Privacy Policy</Title>
      <Text className={b('text')} >
        This privacy policy (this “Policy”) explains how personal information is collected, used, and disclosed by Snailz, Inc. (“Snailz” or “we”). This Policy applies to consumer users (individually referred to as “you”) of Snailz’s websites, applications, and other online services (collectively, our “Sites”).
      </Text>
      <Text className={b('text')} >
        Other third parties, such as salons at which you make bookings through our Sites, salons that you pay through our Sites, and social networks that you use in connection with our Sites, may also collect, use, and share information about you. This Policy does not cover such third parties or their services. For information about third-party privacy practices, please consult with them directly.
      </Text>
      <StaticPageSubtitle variant='underlined'>INFORMATION WE COLLECT</StaticPageSubtitle>
      <Text className={b('text')} >
        We collect information about you in various ways when you use our Sites. We use this information to, among other things, provide the functionality and improve the quality of our Sites and personalize your experience. For example, we may collect your name, email address, postal address, phone number (including your mobile phone number), billing information, survey responses, demographics, primary city, current and prior salon booking details, favorite salons, special salon requests, passwords, contact information of people you add to, or notify of, your salon bookings through our Sites, and other information you provide on our Sites. If you use our mobile application, we may also collect your mobile device ID, your precise location data, and the salon search locations you select. For certain services on our Sites, credit or debit card account information may be required. We may also obtain information from other sources, such as third-party websites, applications, and services (each, a “Third-Party Platform”), through which you connect with our Sites and combine that with information we collect on our Sites.
      </Text>
      <Text className={b('text')} >
        When you visit our Sites, some information is automatically collected. For example, when you visit our Sites, we may automatically collect your location, computer operating system, Internet Protocol (IP) address, access times, browser type and language, and the website you visited before our Sites. We also collect information about your usage and activity on our Sites using certain technologies, such as:
      </Text>
      <ul>
        {
          info.map((el) => (
            <li><Text className={b('text')}>{el}</Text></li>
          ))
        }
      </ul>
      <Text className={b('text')}>
        Do-Not-Track Signals. We currently do not employ technology that recognizes “do-not-track” signals from your browser. We may engage third parties, such as marketing or analytics partners, who may collect information about your online activities over time and across different websites when you use our Sites.
      </Text>
      <StaticPageSubtitle variant='underlined'>HOW WE USE INFORMATION WE COLLECT</StaticPageSubtitle>
      <Text className={b('text')} >
        We use personal information collected through our Sites for the purposes described in this Policy or disclosed to you on our Sites or otherwise in connection with our services. For example, we may use your information to:
      </Text>
      <ul>
        {
          useInfo.map((el) => (
            <li><Text className={b('text')}>{el}</Text></li>
          ))
        }
      </ul>
      <Text className={b('text')}>
        By providing your mobile phone number, you expressly consent to receive direct dial calls, autodialed and prerecorded message calls, and text messages from us relating to our product and services at that number.
      </Text>
      <Text className={b('text')}>
        Snailz may store and process personal information in the United States and other countries.
      </Text>
      <StaticPageSubtitle variant='underlined'>HOW WE SHARE INFORMATION</StaticPageSubtitle>
      <StaticPageSubtitle variant='underlined'>Information Shared With Salons</StaticPageSubtitle>
      <Text className={b('text')}>
        When you make a salon appointment through our Sites, your information is provided to us and to the salons with whom you choose to book. In order to facilitate your booking, your information is provided to that salon, just as it would if you made an appointment by calling the salon, emailing the salon, or using the salon’s website. When you make a salon appointment through our Sites and make a payment to a salon through our Sites, we may also share with the salons additional information, such as information about your booking preferences and history or information that we collect via Third-Party Platforms. You also have the option of indicating special preferences or providing comments about your appointment that Snailz will pass on to that salon.
      </Text>
      <Text className={b('text')}>
        We may share with salons summary reports of feedback from users. If you provide comments about a salon through our Sites, these comments may be shared with that salon. We will not tie your comments with other information that can identify you, but a salon may be able to tell who you are from your comments, particularly if you give your name in the comments or provide contact information, such as an email address.
      </Text>
      <Text className={b('text')}>
        Information you choose to share with a salon when you make an appointment and pay a salon through our Sites may be used by the salon for its own purposes. Snailz does not control, and is not responsible for, the privacy practices of salons. Please contact the salon directly if you want to learn about its privacy practices.
      </Text>
      <StaticPageSubtitle variant='underlined'>Information You Share Socially</StaticPageSubtitle>
      <Text className={b('text')}>
        Our Sites may allow you to connect and share your actions, comments, content, and information publicly or with friends. Our Sites may also allow you to connect with us on, share on, and use Third-Party Platforms, including those on which Snailz has a presence.
      </Text>
      <Text className={b('text')}>
        Please be mindful of your personal privacy needs and the privacy needs of others as you choose whom to connect with and what to share and make public. We cannot control the privacy or security of information you choose to make public or share with others. Snailz also does not control the privacy practices of Third-Party Platforms. Please contact those sites and services directly if you want to learn about their privacy practices.
      </Text>
      <StaticPageSubtitle variant='underlined'>Sharing with Others</StaticPageSubtitle>
      <Text className={b('text')}>
        We do not share your personal information with third parties other than as described above and as follows:
      </Text>
      <ul>
        {
          shareInfo.map((el) => (
            <li><Text className={b('text')}>{el}</Text></li>
          ))
        }
      </ul>
      <StaticPageSubtitle variant='underlined'>SECURITY OF YOUR PERSONAL INFORMATION</StaticPageSubtitle>
      <Text className={b('text')}>
        Snailz takes reasonable steps to help protect your personal information in an effort to prevent loss, misuse, unauthorized access, disclosure, alteration, and destruction. When your credit or debit card account information is being transmitted to our Sites or through our Sites, it will be protected by encryption technology, such as Secure Sockets Layer (SSL).
      </Text>
      <Text className={b('text')}>
        To be clear, Snailz does not itself store your credit or debit card account information, and we do not have direct control over or responsibility for your credit or debit card account information. Our contracts with third parties that receive your credit or debit card account information require them to keep it secure and confidential.
      </Text>
      <Text className={b('text')}>
        Nonetheless, we cannot guarantee that transmissions of your credit or debit card account information or personal information will always be secure or that unauthorized third parties will never be able to defeat the security measures taken by Snailz or our third-party service providers. We assume no liability or responsibility for disclosure of your information due to errors in transmission, unauthorized third-party access, or other causes beyond our control. You play an important role in keeping your personal information secure. You should not share your user name, password, or other security information for your Snailz account with anyone. If we receive instructions using your user name and password, we will consider that you have authorized the instructions.
      </Text>
      <StaticPageSubtitle variant='underlined'>ELECTRONIC COMMUNICATIONS</StaticPageSubtitle>
      <Text className={b('text')}>
        We may communicate with you via electronic messages, including email, text message, or mobile push notification to, for example: send you information relating to our products and services, including appointment confirmations, receipts, technical notices, updates, security alerts, and support and administrative messages; and/or, subject to the Your Information Choices section, below, and/or applicable law, communicate with you about contests, offers, promotions, rewards, upcoming events, and other news about products and services offered by Snailz, our parent companies, our subsidiaries, our affiliates, salons, and other business partners. With your consent, we may contact you at the mobile phone number that you provide to us by way of direct dial calls, autodialed and prerecorded message calls, and text messages in connection with salon bookings.
      </Text>
      <StaticPageSubtitle variant='underlined'>YOUR INFORMATION CHOICES AND CHANGES</StaticPageSubtitle>
      <Text className={b('text')}>
        You may opt out of receiving promotional emails from Snailz by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as emails about your Snailz account or our ongoing business relations. You may also send requests about your contact preferences or changes to your information, including requests to opt out of sharing your personal information with third parties, to our contact information below.
      </Text>
      <Text className={b('text')}>
        Mobile Push Notifications. You can use the settings on your mobile device to enable or turn off mobile push notifications from Snailz .
      </Text>
      <Text className={b('text')}>
        Text Messages. If you no longer want to receive text messages from Snailz, reply STOP (or as otherwise instructed) in the text message. Alternatively, to the extent that applicable law requires your prior opt-in consent to receive text messages, you can choose not to opt-in.
      </Text>
      <Text className={b('text')}>
        Cookie choices. Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Sites.
      </Text>
      <Text className={b('text')}>
        Application location choices. Most mobile devices allow you to turn off location services. For more information about how to do this, please contact your mobile service carrier or your device manufacturer. If you choose to turn off location services, this could affect certain features or services of our Sites.
      </Text>
        {
          choicesInfo.map((el) => (
            <>
              <Text>{el.title}</Text>
              <ul>
                {
                  el.list.map((item) => (
                    <li><Text className={b('text')}>{item}</Text></li>
                  ))
                }
              </ul>
            </>
          ))
        }
      <Text className={b('text')}>
        Unsubscribe. If you do not wish to receive marketing-related emails from us, you may unsubscribe from receiving them by sending "unsubscribe"to info@snailzapp.com.
      </Text>
      <Text className={b('text')}>
        Changing Personal Information. You may review, correct and/or update certain elements of your Personal Information by adjusting your preferences in your Snailz profile. We and our third party service providers are not responsible for altering Personal Information from the databases and/or other records of third parties with whom we and our third party service providers have shared your Personal Information.
      </Text>
      <Text className={b('text')}>
        Retention Period. We and our third party service providers will retain Personal Information for the period reasonably necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
      </Text>
      <Text className={b('text')}>
        The failure of Snaiz to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision. In the event that any provision of these Terms is held to be invalid or unenforceable, the remaining provisions of these Terms will remain in full force and effect.
      </Text>
      <StaticPageSubtitle variant='underlined'>CONTACTING SNAILZ</StaticPageSubtitle>
      <Text className={b('text')}>
        For questions about accessing, changing, or deleting your personal information, please visit
        <Link 
          className={b('link')}
          href={LANDING_PATH}
        >
          http://www.snailzapp.com/
        </Link>
        or contact customer support at 646-876-2459 or via email at
        <Link 
          className={b('link')}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          info@snailzapp.com
        </Link>
        .
      </Text>
      <Text className={b('text')}>
        For questions or opinions on this Policy, please contact Snailz via email at 
        <Link 
          className={b('link')}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          info@snailzapp.com
        </Link>
        or by postal mail at: Snailz, Attn: Legal Department, 530 Seventh Avenue, New York, NY 10018.
      </Text>
      <StaticPageSubtitle variant='underlined'>CHANGES TO THIS POLICY</StaticPageSubtitle>
      <Text className={b('text')}>
        Snailz may update or revise this Policy from time to time. You agree that you will review this Policy periodically. If we make any changes to this Policy, we will change the “Last Updated” date above. You are free to decide whether or not to accept a modified version of this Policy, but accepting this Policy, as modified, is required for you to continue using our Sites. If you do not agree to the terms of this Policy or any modified version of this Policy, your sole recourse is to terminate your use of our Sites.
      </Text>
    </StaticPageWrapper>
  )
}

export default Privacy