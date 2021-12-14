export const API_URL = 'api/clients/v2'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://staging.snailzapp.com'
export const WEBSITE_URL = 'https://snailzapp.com'
export const SNAILZ_APP_URL = 'http://bit.ly/getsnailz'
export const CONTACT_EMAIL = 'info@snailzapp.com'

export const GEOCODE_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY!

export const FAQ_URL = `${WEBSITE_URL}/faq`
export const TERMS_URL = `${WEBSITE_URL}/terms`
export const POLICY_URL = `${WEBSITE_URL}/privacy`
export const ACCESSIBILITY_STATEMENT_URL = `${WEBSITE_URL}/accessibility-statement`
export const FACEBOOK_URL = 'https://www.facebook.com/snailzapp/'
export const INSTAGRAM_URL = 'https://www.instagram.com/snailzapp/'
export const APP_STORE_URL = 'https://itunes.apple.com/us/app/snailz/id1231545925?mt=8'
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.snailz.customer'

export const DEFAULT_POSITION = {
  lat: 40.7656251,
  lng: -73.9890711,
}

export const DEFAULT_POSITION_NAME = 'New York'

export const ONE_MINUTE_INTERVAL = 1000 * 60 // 1 min

export const PERCENT_TIPS = [20, 25, 30, 0]
export const CASH_TIPS = [3, 4, 5, 0]
export const MIN_TIPS_SUBTOTAL = 15

export const PROMO = 'PROMO'
export const REFERRAL = 'REFERRAL'

export const CANCELLATION_FEE_TYPE_CASH = 'cash'
export const CANCELLATION_FEE_TYPE_PERCENT = 'percent'

export const COOKIE_TOKEN_KEY = 'token'