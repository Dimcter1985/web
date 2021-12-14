import Text from 'components/Text'
import Title from 'components/Title'
import stylesBlock from 'utils/stylesBlock'
import StaticPageWrapper from 'components/StaticPage/StaticPageWrapper'
import StaticPageSubtitle from 'components/StaticPage/StaticPageSubtitle'
import { LANDING_PATH } from 'consts/pages'
import Link from 'components/Link'
import styles from './Terms.module.scss'
import { terms } from './consts'

const b = stylesBlock(styles)

const Terms: React.FC = () => {
  return (
    <StaticPageWrapper>
      <Title className={b('title')} size='small'>Snailz Terms of Use</Title>
      <Text className={b('text')} >
        These Snailz Terms of Use (this <b>“Agreement”</b>) apply to your use of (1) the Snailz website at
        <Link 
          className={b('link')}
          href={LANDING_PATH}
        >
          http://www.snailzapp.com/ 
        </Link>
        and all related websites owned and operated solely by Snailz (collectively, the <b>“Snailz Site”</b>), (2) the salon appointment services made available by Snailz through the Snailz Site, any Snailz-branded application for your mobile or other device (collectively, the <b>“Snailz Application”</b>), and any other online properties of Snailz or third parties, as described in Part I below (the <>“Appointment Services”</>), (3) the payment services made available by Snailz through the Snailz Application as described in Part II below (the <b>“Payment Services”</b>), (4) any Snailz Application, and (5) any other services or features made available by Snailz through the Snailz Site or any Snailz Application. Together, the items in (1) through (5) are the <b>“Services”</b>.
      </Text>
      <Text className={b('text')}>
        In this Agreement, <b>“Snailz”</b> and <b>“we”</b>  mean Snailz, Inc., and <b>“User”</b> and <b>“you”</b> mean any user of the Services. This Agreement incorporates Snailz’s standard policies, procedures, and terms and conditions for use of the Services that are referenced by name or by links in this Agreement (collectively, the <b>“Snailz Policies”</b>).
      </Text>
      <Text className={b('text')}>
        By accessing or using the Services or clicking “accept” or “agree” to this Agreement, (1) you acknowledge that you have read, understand, and agree to be bound by this Agreement, and (2) you represent and warrant that you are of legal age and not prohibited by law from accessing or using the Services. THIS AGREEMENT CONTAINS, AMONG OTHER THINGS, AN ARBITRATION PROVISION CONTAINING A CLASS ACTION WAIVER.
      </Text>
      <Text className={b('text')}>
        Snailz may update or revise this Agreement (including any Snailz Polices) from time to time. You agree that you will review this Agreement periodically. You are free to decide whether or not to accept a modified version of this Agreement, but accepting this Agreement, as modified, is required for you to continue using the Services. You may have to click “accept” or “agree” to show your acceptance of any modified version of this Agreement. If you do not agree to the terms of this Agreement or any modified version of this Agreement, your sole recourse is to terminate your use of the Services, in which case you will no longer have access to your Account (as defined below). Except as otherwise expressly stated by Snailz, any use of the Services (e.g., the use of the Appointment Services or the Payment Services) is subject to the version of this Agreement in effect at the time of use.
      </Text>
      <StaticPageSubtitle variant='underlined'>Part I - Appointment Services</StaticPageSubtitle>
        <Text className={b('text')}>
          1. <b>Salon Appointments.</b> Snailz provides the Appointment Services to User for the purpose of assisting User insecuring salon appointments at participating third-party salons (each, a <b>“Salon”</b>). In response to a User’sonline request for a salon appointment through the Snailz Site or Snailz Application, Snailz directly contactsthe Salon’s computerized database of appointments. The availability of appointments is determined at the timeof User’s query. Once an appointment is made by User through the Snailz Site or Snailz Application, Snailzwill provide confirmation of the appointment to User by email and text reminders as the appointment nears. Byusing the Appointment Services, User agrees to receive appointment reminders and confirmations by text andemail after booking an appointment through the Appointment Services.
        </Text>
        <Text className={b('text')}>
          2. <b>No-Show Policy.</b> Snailz is committed to providing superior quality services to Users and Salons. To assist us in maintaining a consistently high level of service for the Salons and their patrons, Users must cancel or modify any appointments that they will be unable to honor up until the time of the appointment. You must cancel or modify your appointment via the Snailz Application.
        </Text>
        <Text className={b('text')}>
          If you are unable to keep your appointment and you fail to cancel or modify up until the time of the appointment, Snailz will send you an email letting you know that our records indicate that you were a no-show and you will be assessed a no-show fee. By using the Appointment Services, User agrees to receive no-show notifications by email after a report that your appointment was not honored, whether or not that was in fact the case. If you receive a no-show notification email in error, please contact Snailz to dispute it. User agrees that all final no-show determinations will be made by Snailz in its sole discretion.
        </Text>
        <Text className={b('text')}>
          3. <b>Usage Guidelines.</b> User agrees to use the Appointment Services to book appointments at Salons and then honor those appointments by arriving at the Salons on time. User further agrees not to book more than one appointment for User’s personal use during any one time. Resale or attempted resale of appointments is prohibited and is grounds for, among other things, cancellation of your appointments or termination of your access to the Services.
        </Text>
        <StaticPageSubtitle variant='underlined'>Part II – Payment Services</StaticPageSubtitle>
        <Text className={b('text')}>
          5. <b>General Description and Requirements.</b> The Payment Services allow Users to pay bills at Salons through the Snailz Application. In order to use the Payment Services at a Salon, you must: (1) install the Snailz Application on a compatible mobile device; (2) make an appointment for the Salon through the Appointment Services; (3) provide valid payment method information through or to the Snailz Application as further described below; (4) provide and verify your mobile phone number as further described below; and (5) have an Account in good standing. You are responsible for any fees charged by your mobile carrier in connection with your use of the Payment Services and Snailz Application. By using the Appointment Services, User agrees to use the Payment Services for all appointments booked through Snailz.
        </Text>
        <Text className={b('text')}>
          6. <b>Payment Method Information.</b> In order to use the Payment Services, you must provide account information for at least one valid debit or credit card or other payment method through or to the Snailz Application. Snailz uses this payment method account information as described in our privacy policy. If you provide account information for a debit or credit card to the Snailz Application via a third parties, your provision of such debit or credit card shall also be subject to the terms and conditions specified by such third party. Snailz takes no responsibility and assumes no liability for any actions or omissions of such third party. You may add, delete, and edit the payment method account information you have provided from time to time directly through the Snailz Application. If you provide account information in such manner for more than one valid debit or credit card, you must select which debit or credit card you want to use to pay your Salon bill.
        </Text>
        <Text className={b('text')}>
          To confirm that the payment method information you have provided through or to the Snailz Application is accurate, we may place a temporary authorization on your payment method at the time you provide your payment method information through or to the Snailz Application or when you make a appointment and opt in to use the Payment Services. After we verify that your payment method information is accurate, usually within a few days, the authorization will be removed.
        </Text>
        <Text className={b('text')}>
          To the extent permitted by applicable law and subject to our privacy policy, you acknowledge and agree that we may use certain third-party vendors and service providers to process payments, manage debit and credit card information and detect and prevent fraud.
        </Text>
        <Text className={b('text')}>
          By providing debit or credit card account information through or to the Snailz Application, you represent, warrant, and covenant that: (1) you are legally authorized to provide such information to us; (2) you are legally authorized to perform payments from the debit or credit card account(s); and (3) such action does not violate the terms and conditions applicable to your use of such debit or credit card account(s) or applicable law. When you authorize a payment using a debit or credit card account via the Snailz Application, you represent, warrant, and covenant that there are sufficient funds or credit available to complete a payment using the debit or credit card account.
        </Text>
        <Text className={b('text')}>
          7. <b>Account Settings.</b> You may establish certain default settings for your use of the Payment Services through the Snailz Application, such as your preferred payment card account if you provided debit or credit card information directly through the Snailz Application. You may change these settings through the Snailz Application.
        </Text>
        <Text className={b('text')}>
          8. <b>Payment Authorization and Settlement.</b> You authorize Snailz to charge your debit or credit card for the full amount of your final bill, which may include among other things a gratuity based on your selection, any applicable taxes, surcharges or fees and may include adjustments for any errors or omissions. You may only use the Payment Services to pay the full amount of the bill; no split checks or partial payments are permitted. This Agreement does not alter your payment obligations to Salons; you are responsible for timely payment of all amounts owed by you to any Salon. Depending on your payment method, you may be subject to certain minimum charges. Except to the extent otherwise required by applicable law, Snailz is not responsible or liable for any payments authorized through the Snailz Application using your payment method information. As a courtesy, we will email a receipt to the email address associated with your Account upon completion of a transaction using the Payment Services. You may print and save copies of these receipts. If you would like a paper receipt, you must request one from the Salon at the time of the transaction.
        </Text>
        <Text className={b('text')}>
          9. <b>Certain Limitations.</b> You acknowledge and agree that Snailz provides the Payment Services only as a convenience and is not a party to your payment transactions performed using the Payment Services. Snailz is an independent contractor for all purposes and is not your agent or trustee. Snailz is not responsible, and has no liability for, the products or services that are paid for with the Payment Services. Snailz is not responsible for any overcharges or other payment disputes with Salons. Users must resolve payment and other disputes directly with Salons.
        </Text>
        <Text className={b('text')}>
          Snailz is not liable for any payments that the Payment Services do not complete because: (1) your debit or credit card account does not contain sufficient funds to complete the transaction or the transaction would exceed the credit limit or overdraft protection of the debit or credit card account; (2) you have not provided us with correct payment account information; (3) your debit or credit card has expired; or (4) circumstances beyond our control (such as, but not limited to, power outages, interruptions of cellular service, or any other interferences from an outside force) prevent the execution of the transaction. To the extent that any amounts owed cannot be collected from your debit or credit card account through the Payment Services, you are solely responsible for paying the applicable Salons(s) by other means.
        </Text>
        <StaticPageSubtitle variant='underlined'>Part III – Terms for All Services</StaticPageSubtitle>
        <Text className={b('text')}>
          10. <b>Terms of Sale.</b> Our sites provide an interactive online service operated by Snailz, consisting primarily of promotion and marketing services on behalf of certain salons making appointments available to its users. Appointments may be booked by Snailz account holders and exchanged for goods and services from the issuing salons or other parties identified in the terms of the offer and subject to the Terms of Sale set forth below.
        </Text>
        <ul>
          {
            terms.map((term) => (
              <li><Text className={b('text')}>{term}</Text></li>
            ))
          }
        </ul>
        <Text className={b('text')}>
          11. <b>Privacy Policy.</b> Snailz is committed to helping you safeguard your privacy online. Please review our privacy policy for details about how we collect, use, and disclose information in connection with the Services.
        </Text>
        <Text className={b('text')}>
          12. <b>Your Account.</b> You may (but are not required to) create an account with Snailz through the Snailz Application (“Account”) in order to use the Appointment Services. However, you must have an Account in order to use the Payment Services. When registering for an Account, you must provide true, accurate, current, and complete data about yourself on the Snailz registration form (“Registration Data”). You also agree to promptly update the Registration Data to keep it true, accurate, current, and complete. You are solely responsible for maintaining the confidentiality of your Account and the information in your Account, and, except as otherwise required by applicable law, you are solely responsible for all use of your Account, whether or not authorized by you. You agree to immediately notify Snailz of any unauthorized use of your Account or any other breach of security related to your use of the Services.
        </Text>
        <Text className={b('text')}>
          13. <b>Communications from Snailz.</b> The Snailz Application may use GPS locator capabilities to identify your current location. If you provide a mobile phone number, you hereby expressly consent to receive SMS text messages from Snailz regarding the Services and as otherwise described in our privacy policy. The communication standards for the Services include, but are not limited to: SMS, GPS, and web-based browser technology. In order to use the SMS-based Services, you must maintain an active account with a carrier of electronic communications through mobile devices and you may not use a prepaid cellular phone to access the Services.
        </Text>
        <Text className={b('text')}>
          14. <b>Technical Requirements.</b> Use of the Services requires Internet access through your computer or mobile device. You are responsible for all mobile carrier charges resulting from your use of the Services, including from any notifications provided by the Services. Snailz does not guarantee that the Services will be compatible with all devices or will be supported by all mobile carriers. You may be required to have JavaScript (or similar technologies) enabled to use the Snailz Site, and some features and portions of the Snailz Site (including, but not limited to, making, modifying, or canceling appointments) may not be accessible with JavaScript disabled.
        </Text>
        <Text className={b('text')}>
          15. <b>Modifications to Services.</b> Snailz reserves the right, in its sole discretion, to modify the Services from time to time and without notice, including, without limitation, by removing, adding, or modifying portions of the Snailz Site, Snailz Application, Salons, and/or Merchants. Snailz shall have no liability to you for any of the foregoing actions. If you object to any such changes, your sole recourse shall be to cease using the Services. Continued use of the Services following any such changes shall indicate your acknowledgment of such changes and satisfaction with all the Services.
        </Text>
        <Text className={b('text')}>
          16. <b>Intellectual Property Rights and Grant of Rights to User.</b> The features, information, and materials provided and depicted through the Services are protected by copyright, trademark, patent, and other intellectual property laws. All text, graphical content, video, data, and other content made available through the Services (collectively, the “Snailz Content”) are provided to User by Snailz or its partners or licensors solely to support User’s permitted use of the Services. The Snailz Content may be modified from time to time by Snailz in its sole discretion. Except as expressly set forth herein, no license is granted to User for any other purpose, and any other use of the Services or the Snailz Content by User shall constitute a material breach of this Agreement. Snailz and its partners or licensors retain all rights in the Services and Snailz Content and any associated patents, trademarks, copyrights, mask work rights, trade secrets, or other intellectual property rights. No license, right, or interest in any trademarks of Snailz or any third party is granted under this Agreement.
        </Text>
        <Text className={b('text')}>
          17. <b>Application License.</b> Subject to the terms and conditions of this Agreement, Snailz grants User a non-exclusive, non-transferable, revocable license to use the Snailz Application, in object code form only, on User’s compatible mobile devices, solely to support User’s permitted use of the Services.
        </Text>
        <Text className={b('text')}>
          18. <b>Use Restrictions.</b> The Services and Snailz Content are offered solely for User’s personal use for the purposes described in this Agreement. Any and all other uses are prohibited. Snailz expressly reserves all its rights and remedies under applicable state and federal laws. Snailz reserves the right, in its sole discretion, to refuse service, terminate Accounts, remove or edit content, cancel appointments, or deny access to the Services. You agree not to (and not to allow any third party to): (1) use any deep-link, robot, spider, scraper, or other automatic or manual device, process, or means to access, copy, search, or monitor any portion of the Services or Snailz Content, except as expressly authorized by Snailz; (2) take any action that imposes or may impose (in Snailz’s sole determination) an unreasonable or a disproportionately large load on the Services or Snailz’s infrastructure; (3) utilize any device, software, or routine that will interfere or attempt to interfere with the functionality of the Services; (4) rent, lease, copy, provide access to or sublicense any portion of the Services or Snailz Content to a third party; (5) use any portion of the Services or Snailz Content to provide, or incorporate any portion of the Services or Snailz Content into, any product or service provided to a third party; (6) reverse engineer, decompile, disassemble, or otherwise seek to obtain the source code or non-public APIs to the Services, except to the extent expressly permitted by applicable law (and then only upon advance notice to Snailz); (7) modify any Services or Snailz Content or create any derivative product from any of the foregoing; (8) remove or obscure any proprietary or other notices contained in the Services or Snailz Content; (9) use the Services or Snailz Content for any illegal purpose; or (10) publicly disseminate information regarding the performance of the Services or Snailz Content or access or use the Services or Snailz Content for competitive analysis or benchmarking purposes.
        </Text>
        <Text className={b('text')}>
          19. <b>Government End Users.</b> The Services constitute a “commercial item” as defined at 48 C.F.R. 2.101, consisting of “commercial computer software” and “commercial computer software documentation” as such terms are used in 48 C.F.R. 12.212. Consistent with 48 C.F.R. 12.212 and 48 C.F.R. 227.7202-1 through 227.7202-4, all U.S. Government end users acquire any Snailz Application with only those rights set forth therein.
        </Text>
        <Text className={b('text')}>
          20. <b>Export Control.</b> You may not use, export, or re-export any Snailz Application or other aspects of the Services (or any copy or adaptation of the foregoing) in violation of applicable law, including, without limitation, United States and foreign export laws and regulations. You represent and warrant that you are not located in a country that is subject to a U.S. Government embargo or that has been designated by the U.S. Government as a “terrorist supporting” country and that you are not listed on any U.S. Government list of prohibited or restricted parties.
        </Text>
        <Text className={b('text')}>
          21. <b>Termination.</b> Snailz may suspend your ability to use all or any element of the Services or may terminate this Agreement effective immediately, without notice or explanation. Without limiting the foregoing, Snailz may suspend your access to the Services if we believe you to be in violation of any part of this Agreement and Users of the Payment Services, if we receive excessive chargebacks on the debit or credit card associated with your Account. After any suspension or termination, you may or may not be granted permission to use the Services or re-establish an Account. You agree that Snailz shall not be liable to you for any termination of this Agreement or for any effects of any termination of this Agreement. You are always free to discontinue your use of the Services at any time. You understand that any termination of your Account may involve deletion of any content stored in your Account for which Snailz will have no liability whatsoever.
        </Text>
        <Text className={b('text')}>
          22. <b>Reviews, Comments, Communications, and Other Content.</b> The Services may permit you to submit reviews, comments, and ratings; send emails and other communications; and submit suggestions, ideas, comments, questions, pictures, or other information for publication and distribution to salons and other third parties (<b>“User Content”</b>). Any such User Content must not be illegal, threatening, obscene, racist, defamatory, libelous, pornographic, infringing of intellectual property rights, promoting of illegal activity or harm to groups and/or individuals, invasive of privacy, purposely false or otherwise injurious to third parties, or objectionable and must not consist of or contain software, computer viruses, commercial solicitation, political campaigning, chain letters, mass mailings, any form of “spam” or references to illegal activity, malpractice, purposeful overcharging, false advertising, or health code violations. Your User Content should be unbiased and objective. You may not submit reviews, comments or ratings of your own salon, or any salon of your employer, friend, relative or a competitor. You may not use a false email address, impersonate any person or entity, or otherwise mislead as to the origin of User Content. Snailz reserves the right (but has no obligation) to monitor, remove, or edit User Content in Snailz’s sole discretion, including if User Content violates this Agreement (including any Snailz Policies), but you acknowledge that Snailz may not regularly review submitted User Content. If you do submit User Content, and unless we indicate otherwise, you grant Snailz a nonexclusive, perpetual, royalty-free, irrevocable, and fully sublicensable (through multiple tiers) right to use, modify, reproduce, adapt, translate, publish, create derivative works from, distribute, display, and otherwise exploit such User Content throughout the world in any media. Snailz takes no responsibility and assumes no liability for any User Content submitted by you or any other User or third party.
        </Text>
        <Text className={b('text')}>
          23. <b>Your Representations and Indemnity.</b> You represent and warrant that you own or otherwise control all of the rights to any User Content submitted by you; that all User Content submitted by you is accurate; and that exploitation of such User Content by Snailz and its other Users, partners, and licensees will not violate this Agreement, cause injury to any person or entity, or infringe any third-party rights (including, without limitation, intellectual property rights and rights of privacy or publicity). You will indemnify, hold harmless, and (at Snailz’s request) defend Snailz, its affiliates, and its and their representatives, agents, directors, managers, officers, employees, and shareholders (collectively, the <b>“Snailz Parties”</b>) from and against all claims resulting from (1) any User Content submitted by you, (2) your use of the Services, or (3) any breach or alleged breach by you of this Agreement.
        </Text>
        <Text className={b('text')}>
          24. Liability Limitations. TO THE MAXIMUM EXTENT PERMITTED BY LAW, , IN NO EVENT SHALL THE SNAILZ PARTIES BE LIABLE FOR ANY INJURIES, LOSSES, CLAIMS, OR DIRECT DAMAGES OR ANY SPECIAL, EXEMPLARY, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND, WHETHER BASED IN CONTRACT, TORT, OR OTHERWISE, AND EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, WHICH ARISE OUT OF OR ARE ANY WAY CONNECTED WITH (1) THIS AGREEMENT, (2) ANY USE OF THE SERVICES, THE SNAILZ CONTENT, OR THE USER CONTENT, (3) ANY FAILURE OR DELAY (INCLUDING, BUT NOT LIMITED TO, THE USE OR INABILITY TO USE ANY COMPONENT OF THE APPOINTMENT SERVICES OR PAYMENT SERVICES), OR (4) YOUR VISIT TO ANY SALON OR THE PERFORMANCE, NON-PERFORMANCE, CONDUCT, OR POLICIES OF ANY SALON OR MERCHANT IN CONNECTION WITH THE SERVICES. IN ADDITION, YOU SPECIFICALLY UNDERSTAND AND AGREE THAT ANY THIRD PARTY DIRECTING YOU TO THE SNAILZ SITE BY REFERRAL, LINK, OR ANY OTHER MEANS IS NOT LIABLE TO USER FOR ANY REASON WHATSOEVER, INCLUDING, BUT NOT LIMITED TO, DAMAGES OR LOSS ASSOCIATED WITH THE USE OF THE SERVICES OR THE SNAILZ CONTENT. SNAILZ IS NEITHER AN AGENT OF NOR OTHERWISE ASSOCIATED WITH ANY SALON FOR WHICH A USER HAS MADE AN APPOINTMENT OR PAID A BILL USING THE PAYMENT SERVICES.
        </Text>
        <Text className={b('text')}>
          You and Snailz understand and agree that the disclaimers, exclusions, and limitations in this Section 24 and in Section 25 are essential elements of this Agreement and that they represent a reasonable allocation of risk. In particular, you understand that Snailz would be unable to make the Services available to you except on these terms and agree that this Agreement will survive and apply even if any limited remedy specified in this Agreement is found to have failed of its essential purpose.
        </Text>
        <Text className={b('text')}>
          25. <b>Disclaimer of Warranties.</b> THE SERVICES, ALL SNAILZ CONTENT, AND ANY OTHER INFORMATION, PRODUCTS, AND MATERIALS CONTAINED IN OR ACCESSED THROUGH THE SERVICES, ARE PROVIDED TO USER ON AN “AS IS” BASIS AND WITHOUT WARRANTY OF ANY KIND. SNAILZ EXPRESSLY DISCLAIMS ALL REPRESENTATIONS, WARRANTIES, CONDITIONS, OR INDEMNITIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT, OR ANY WARRANTY ARISING FROM A COURSE OF DEALING, PERFORMANCE, OR TRADE USAGE. SNAILZ DOES NOT WARRANT THAT YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT SNAILZ WILL REVIEW THE INFORMATION OR MATERIALS MADE AVAILABLE THROUGH THE SERVICES FOR ACCURACY OR THAT IT WILL PRESERVE OR MAINTAIN ANY SUCH INFORMATION OR MATERIALS WITHOUT LOSS. SNAILZ SHALL NOT BE LIABLE FOR DELAYS, INTERRUPTIONS, SERVICE FAILURES, OR OTHER PROBLEMS INHERENT IN USE OF THE INTERNET AND ELECTRONIC COMMUNICATIONS OR OTHER SYSTEMS OUTSIDE THE REASONABLE CONTROL OF SNAILZ.
        </Text>
        <Text className={b('text')}>
          THE FOREGOING DISCLAIMERS APPLY TO THE MAXIMUM EXTENT PERMITTED BY LAW. YOU MAY HAVE OTHER STATUTORY RIGHTS. HOWEVER, THE DURATION OF STATUTORILY REQUIRED WARRANTIES, IF ANY, SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
        </Text>
        <Text className={b('text')}>
          26. <b>Links to Third-Party Websites.</b> The Services may contain hypertext links to websites operated by parties other than Snailz. Such hypertext links are provided for User’s reference only, and Snailz does not control such websites and is not responsible for their content. Snailz’s inclusion of any hypertext links to such websites does not imply any endorsement of the material on such websites or any association with their operators. Snailz assumes no liability whatsoever for any such third-party websites or any content, features, products, or services made available through such third-party websites.
        </Text>
        <Text className={b('text')}>
          27. <b>Release.</b> Salons and Merchants are solely responsible for their interactions with you and any and all claims, injuries, illnesses, damages, liabilities, and costs (“Claims”) suffered by you as a result of your (or such recipient’s) interaction with or visit to any Salon or Merchant or from any product or service of any Salon or Merchant. You hereby release the Snailz Parties from any and all such Claims
        </Text>
        <Text className={b('text')}>
          28. <b>Notify Us of Infringers.</b> If you believe any of the Services violate your copyright, notify our copyright agent in writing. The contact information for our copyright agent is at the bottom of this Section.
        </Text>
        <Text className={b('text')}>
          In order for us to take action, you must do the following in your notice:
        </Text>
        <Text className={b('text')}>
          (a) provide your physical or electronic signature;
        </Text>
        <Text className={b('text')}>
          (b) identify the copyrighted work that you believe is being infringed;
        </Text>
        <Text className={b('text')}>
          (c) identify the item that you think is infringing your work and include sufficient information about where the material is located so that we can find it;
        </Text>
        <Text className={b('text')}>
          (d) provide us with a way to contact you, such as your address, telephone number, or email;
        </Text>
        <Text className={b('text')}>
          (e) provide a statement that you believe in good faith that the item you have identified as infringing is not authorized by the copyright owner, its agent, or the law to be used in connection with the Services; and
        </Text>
        <Text className={b('text')}>
          (f) provide a statement that the information you provide in your notice is accurate, and that (under penalty of perjury) you are authorized to act on behalf of the copyright owner whose work is being infringed.
        </Text>
        <Text className={b('text')}>
          Again, we cannot take action unless you give us all the required information.
        </Text>
        <Text className={b('text')}>
          29. <b>Severability.</b> If any of the provisions, or portions thereof, of this Agreement are found to be invalid under any applicable statute or rule of law, then, that provision (or portion thereof) notwithstanding, this Agreement shall remain in full force and effect and such provision or portion thereof shall be deemed omitted.
        </Text>
        <Text className={b('text')}>
          30. <b>Assignment.</b> This Agreement and the rights granted and obligations undertaken hereunder may not be transferred, assigned, or delegated in any manner by User, but may be freely transferred, assigned, or delegated by Snailz.
        </Text>
        <Text className={b('text')}>
          31. <b>Waiver.</b> Any waiver of any provision of this Agreement, or a delay by any party in the enforcement of any right hereunder, shall neither be construed as a continuing waiver nor create an expectation of non-enforcement of that or any other provision or right.
        </Text>
        <Text className={b('text')}>
          32. <b>ARBITRATION AGREEMENT AND JURY TRIAL WAIVER, CLASS ACTION WAIVER, AND FORUM SELECTION CLAUSE.</b> Any and all controversies, disputes, demands, counts, claims, or causes of action (including the interpretation and scope of this clause, and the arbitrability of the controversy, dispute, demand, count, claim, or cause of action) between you and the Snailz Parties or their successors or assigns shall exclusively be settled through binding and confidential arbitration.
        </Text>
        <Text className={b('text')}>
          Arbitration shall be subject to the Federal Arbitration Act and not any state arbitration law. The arbitration shall be conducted before one commercial arbitrator with substantial experience in resolving commercial contract disputes from the American Arbitration Association (“AAA”). As modified by this Agreement, and unless otherwise agreed upon by the parties in writing, the arbitration will be governed by the AAA’s Commercial Arbitration Rules and, if the arbitrator deems them applicable, the Supplementary Procedures for Consumer Related Disputes (collectively, the <b>“Rules and Procedures”</b>).
        </Text>
        <Text className={b('text')}>
          You are thus GIVING UP YOUR RIGHT TO GO TO COURT to assert or defend your rights EXCEPT for matters that you file in small claims court. Your rights will be determined by a NEUTRAL ARBITRATOR and NOT a judge or jury. You are entitled to a <u>FAIR HEARING</u>, BUT the arbitration procedures are <u>SIMPLER AND MORE LIMITED</u> THAN RULES APPLICABLE IN COURT. Arbitrator decisions are as enforceable as any court order and are subject to <u>VERY LIMITED REVIEW</u> BY A COURT.
        </Text>
        <Text className={b('text')}>
          You and Snailz must abide by the following rules: (1) ANY CLAIMS BROUGHT BY YOU OR SNAILZ MUST BE BROUGHT IN THE PARTY’S INDIVIDUAL CAPACITY, AND <u>NOT AS A PLAINTIFF OR CLASS MEMBER</u> IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING; (2) THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING, AND MAY NOT AWARD CLASS-WIDE RELIEF; (3) in the event that you are able to demonstrate that the costs of arbitration will be prohibitive as compared to costs of litigation, Snailz will pay as much of your filing and hearing fees in connection with the arbitration as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive as compared to the cost of litigation, (4) Snailz also reserves the right in its sole and exclusive discretion to assume responsibility for all of the costs of the arbitration; (5) the arbitrator shall honor claims of privilege and privacy recognized at law; (6) the arbitration shall be confidential, and neither you nor we may disclose the existence, content or results of any arbitration, except as may be required by law or for purposes of enforcement of the arbitration award; (7) the arbitrator may award any individual relief or individual remedies that are permitted by applicable law; and (8) each side pays its own attorneys’ fees and expenses unless there is a statutory provision that requires the prevailing party to be paid its fees and litigation expenses, and, in such instance, the fees and costs awarded shall be determined by the applicable law.
        </Text>
        <Text className={b('text')}>
          Notwithstanding the foregoing, either you or Snailz may bring an individual action in small claims court. Further, claims of defamation, violation of the Computer Fraud and Abuse Act, and infringement or misappropriation of the other party’s patent, copyright, trademark, or trade secret shall not be subject to this arbitration agreement. Such claims shall be exclusively brought in the state or federal courts located in New York County, New York. Additionally, notwithstanding this agreement to arbitrate, either party may seek emergency equitable relief before the state or federal courts located in New York County, New York in order to maintain the status quo pending arbitration, and hereby agree to submit to the exclusive personal jurisdiction of the courts located within New York County, New York for such purpose. A request for interim measures shall not be deemed a waiver of the right to arbitrate.
        </Text>
        <Text className={b('text')}>
          With the exception of subparts (1) and (2) in this Section (prohibiting arbitration on a class or collective basis), if any part of this arbitration provision is deemed to be invalid, unenforceable, or illegal, or otherwise conflicts with the Rules and Procedures, then the balance of this arbitration provision shall remain in effect and shall be construed in accordance with its terms as if the invalid, unenforceable, illegal or conflicting part was not contained herein. If, however, either subpart (1) or (2) is found to be invalid, unenforceable, or illegal, then the entirety of this arbitration provision shall be null and void, and neither you nor Snailz shall be entitled to arbitration. If for any reason a claim proceeds in court rather than in arbitration, the dispute shall be exclusively brought in state or federal court located in New York County, New York.
        </Text>
        <Text className={b('text')}>
          For more information on AAA, the Rules and Procedures, or the process for filing an arbitration claim, you may call AAA at 800-778-7879 or visit the AAA website at
          <Link 
            className={b('link')}
            href='http://www.adr.org'
          >
            http://www.adr.org
          </Link> 
        </Text>
        <Text className={b('text')}>
          33. <b>Choice of Law.</b> This Agreement is made under and shall be governed by and construed in accordance with the laws of the State of New York, consistent with the Federal Arbitration Act, without giving effect to any principles that provide for the application of the law of another jurisdiction.
        </Text>
    </StaticPageWrapper>
  )
}

export default Terms