import defaultSettings from '@/settings'

const title = defaultSettings.title || '总有刁民想害朕'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
