module.exports = {
    siteUrl: process.env.SITE_URL || 'https://samdai.gov.ir',
    generateRobotsTxt: true, 
    exclude: ['/dashboard/*', '/member/*', '/api/*'],
    // ...other options
}