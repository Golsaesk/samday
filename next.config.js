const path = require('path');
const ms = require('ms');
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const moduleExports = withNextIntl({
  experimental: {
    webpackBuildWorker: true,
    serverActions: {
      allowedOrigins: ['*.shaparak.ir', 'sep.shaparak.ir', 'samdai.local:8414', 'samdai.local', 'samdai.gov.ir', 'sadad.shaparak.ir'],
      allowedForwardedHosts: ['*.shaparak.ir', 'sep.shaparak.ir', 'samdai.local:8414', 'samdai.local', 'samdai.gov.ir', 'sadad.shaparak.ir'],
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  reactStrictMode: false,
  env: {
    API_KEY: '2zkyeAP8QewWTYe5r642cyeA3fik9865',
    SITE_URL: 'https://samdai.local:8414',
    API_DOMAIN: 'https://api.samdai.ir',
    DOMAIN_DEVELOPMENT: 'https://samdai.local:8414',
    DOMAIN_PRODUCTION: 'https://samdai.local:8414',
    NESHAN_API_KEY_WEB: '',
    NESHAN_API_KEY_SERVICE: '',
    GA_MEASUREMENT_ID: '',
    LOGIN_TYPES: 'EMAIL',
    LOGIN_INFO_VERBOSE: '1',
    REFRESH_TOKEN: '614RT5557556A67FF327235753878CC',
    INSTALLED_MODULES: 'order,review,credit,ticket,member',
    SALT: 'Xj2_6Sfh',
    BOX_ID: '1',
    LATEST_LAW_MEDIA_ID: '16',
    ORGANIZATION_MAIN_ID: '1',
    BOX_HOME_ABOUT_FA: '2',
    BOX_HOME_ABOUT_EN: '3',
    IMAGE_HOME_ABOUT: '15',
    TYPE_SPECIAL_NEWS_FA: '4',
    TYPE_SPECIAL_NEWS_EN: '6',
    OUTPUT_NEWS: '2',
    TYPE_NORMAL_NEWS_FA: '1',
    TYPE_NORMAL_NEWS_EN: '2',
    TYPE_REPORT_NEWS_FA: '3',
    TYPE_REPORT_NEWS_EN: '5',
    CATEGORY_PARENT_LAW: '104',
    CATEGORY_PARENT_NEWS: '105',
    CATEGORY_PARENT_REPORT: '117',
    CATEGORY_PARENT_INFORMATION: '125',
    CATEGORY_EGOVERNMENT_LAW: '108',
    CATEGORY_CYBERSPACE_LAW: '111',
    BOX_HOME_PARALLAX_FA: '4',
    BOX_HOME_PARALLAX_EN: '5',
    BOX_ABOUT_EN: '6',
    BOX_ABOUT_MEMBER_FA: '7',
    BOX_ABOUT_MEMBER_EN: '8',
    BOX_ABOUT_DUTY_FA: '9',
    BOX_ABOUT_DUTY_EN: '10',
    BOX_ABOUT_DOCUMENT_FA: '11',
    BOX_ABOUT_DOCUMENT_EN: '12',
    BOX_ABOUT_NOTIFICATION_FA: '13',
    BOX_ABOUT_NOTIFICATION_EN: '14',
    BOX_ABOUT_COUNCIL_OBJECTIVE_FA: '15',
    BOX_ABOUT_COUNCIL_OBJECTIVE_EN: '16',
    BOX_ABOUT_COUNCIL_DUTY_FA: '17',
    BOX_ABOUT_COUNCIL_DUTY_EN: '18',
    BOX_ABOUT_COUNCIL_MEMBER_FA: '19',
    BOX_ABOUT_COUNCIL_MEMBER_EN: '20',
    BOX_ABOUT_COUNCIL_ENFORCEMENT_FA: '21',
    BOX_ABOUT_COUNCIL_ENFORCEMENT_EN: '22',
    BOX_ABOUT_COUNCIL_SECRETARY_FA: '23',
    BOX_ABOUT_COUNCIL_SECRETARY_EN: '24',
    BOX_ABOUT_COUNCIL_SECRETARY_MEMBERS_FA: '27',
    BOX_ABOUT_COUNCIL_SECRETARY_MEMBERS_EN: '28',
    BOX_ABOUT_COUNCIL_MEETING_FA: '25',
    BOX_ABOUT_COUNCIL_MEETING_EN: '26',
    BOX_ABOUT_COUNCIL_PERFORMANCE_GUARANTEE_FA: '29',
    BOX_ABOUT_COUNCIL_PERFORMANCE_GUARANTEE_EN: '33',
    BOX_ABOUT_COUNCIL_NIE_CENTER_FA: '30',
    BOX_ABOUT_COUNCIL_NIE_CENTER_EN: '34',
    ALBUM_ABOUT_TASKFORCE_FA: '2',
    ALBUM_ABOUT_TASKFORCE_EN: '3',
    IMAGE_HOME_PARALLAX_FA: '22',
    IMAGE_HOME_PARALLAX_EN: '29',
    IMAGE_ABOUT: '52',
    BOX_ABOUT_BASIC_DATABASE_FA: '31',
    BOX_ABOUT_BASIC_DATABASE_EN: '32',
  },
  sassOptions: { includePaths: [path.join(__dirname, 'styles'),], },
  poweredByHeader: false,
  images: {
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.samdai.gov.ir',
      },
      {
        protocol: 'https',
        hostname: '**.samdai.local',
      },
    ],
    minimumCacheTTL: 31536000,
  },
  headers() {
    return [
      {
        // Cache all content pages
        source: '/((?!_next|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: [
              `s-maxage=` + ms('14d') / 1000,
              `stale-while-revalidate=` + ms('1y') / 1000,
              `max-age=` + ms('14d') / 1000,
            ].join(', ')
          },
          {
            key: 'custom-header',
            value: 'my custom header value',
          },
        ],

        // If you're deploying on a host that doesn't support the `vary` header (e.g. Vercel),
        // make sure to disable caching for prefetch requests of Server Components.
        // https://github.com/vercel/vercel/discussions/7612#discussioncomment-2434736
        missing: [
          {
            type: 'header',
            key: 'Next-Router-Prefetch'
          }
        ]
      },
    ];
  }
});

module.exports = moduleExports;