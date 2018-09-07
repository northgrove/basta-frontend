const msgraph = require('./msgraph.js')
const { defaultPhoto } = require('./defaultPhoto.js')

test('Simulerer getUserPhoto fra azure AD', async () => {
  const jau = await msgraph.getUserPhoto('tullebruker')
  expect(jau).toContain(defaultPhoto)
})
