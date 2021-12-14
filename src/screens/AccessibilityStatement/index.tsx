import Text from 'components/Text'
import Title from 'components/Title'
import stylesBlock from 'utils/stylesBlock'
import StaticPageWrapper from 'components/StaticPage/StaticPageWrapper'
import StaticPageSubtitle from 'components/StaticPage/StaticPageSubtitle'
import styles from './AccessibilityStatement.module.scss'

const b = stylesBlock(styles)

const AccessibilityStatement: React.FC = () => {
  return (
    <StaticPageWrapper>
      <Title className={b('title')} size='small'>Accessibility Statement</Title>
      <StaticPageSubtitle variant='underlined'>Our Commitment</StaticPageSubtitle>
      <Text>
        Snailz, Inc. is committed to making its website and mobile application usable by all people, including those with disabilities, by meeting or exceeding the requirements of the Web Content Accessibility Guidelines. We strive to make our site an equal experience for everyone.
      </Text>
      <StaticPageSubtitle variant='underlined'>Disclaimer</StaticPageSubtitle>
      <Text>
        It is important to note that efforts to remediate the website are ongoing as we work to implement the relevant improvements to meet WCAG guidelines over time.
      </Text>
      <StaticPageSubtitle variant='underlined'>Third-Party Content</StaticPageSubtitle>
      <Text>
        Our website and mobile application may contain links to external websites, such as Facebook and Instagram and links to independently owned salon websites, that are not within our control and may not follow the same accessibility policies and standards as Snailz. Snailz does not control the content or accessibility of the content on these third-party websites and platforms.
      </Text>
      <StaticPageSubtitle variant='underlined'>Contacting us</StaticPageSubtitle>
      <Text>
        If you would like to request accessibility-related assistance, report any accessibility problems, or request any information in accessible alternative formats including our Privacy Policy and Terms & Conditions of Use, please contact us directly at Snailz, Attn: Privacy Compliance Officer, 48 Wall St. 5th floor New York, NY 10005, or email us at info@snailzapp.com. We would be happy to assist in making your visits to our website as convenient as possible.
      </Text>
      <div className={b('update')}><Text>Last Updated: March 10, 2021</Text></div>
    </StaticPageWrapper>
  )
}

export default AccessibilityStatement