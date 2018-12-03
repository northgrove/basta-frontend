const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const returnRandomVm = (hostname, it) => {
  const seraMockData = [
    {
      _id: '5bfd428cc2c29f28bd14191f',
      hostname: hostname,
      os: 'Red Hat Enterprise Linux 6 (64-bit)',
      uuid: 'VMware-42 0f b9 9f 91 41 5f ef-ff 33 ff 30 6b 55 92 a7',
      environmentClass: 'q',
      type: 'jboss',
      site: 'so8',
      memory: 2,
      cpu: 1,
      disk: 76,
      status: 'poweredOff',
      custom: false,
      owner: 'b123034',
      application: 'signering',
      environment: 'q2',
      created: '2018-01-08T09:36:22.468Z',
      environmentName: 'n/a',
      rpm_time: '2018-01-08T09:45:29Z',
      rpm_version: '7.0.4.2-1',
      rpm_rpm: 'jboss-eap7',
      unit: 'kes'
    },
    {
      _id: '5bfd428cc2c29f3ed1143002',
      hostname: hostname,
      os: 'Red Hat Enterprise Linux 7 (64-bit)',
      uuid: 'VMware-42 1a c7 8e 37 95 a5 4f-ca 37 77 4b 4c 82 28 23',
      environmentClass: 'p',
      type: 'jboss',
      site: 'u89',
      memory: 4,
      cpu: 2,
      disk: 56,
      status: 'poweredOn',
      ipAddress: '10.184.128.79',
      custom: false,
      owner: 'b123034',
      application: 'frikortborger',
      environment: 'p',
      created: '2018-03-27T13:42:28.678Z',
      environmentName: 'n/a',
      rpm_time: '2018-02-15T08:35:37Z',
      rpm_version: '7.0.4.2-1',
      rpm_rpm: 'jboss-eap7',
      unit: 'foreldreløse fasitapps'
    },
    {
      _id: '5bfd428cc2c29fbbdf141b5f',
      hostname: hostname,
      os: 'Red Hat Enterprise Linux 7 (64-bit)',
      uuid: 'VMware-42 0f 70 af 16 9c c7 51-e2 68 42 4a bf 2f 79 ee',
      environmentClass: 'p',
      type: 'jboss',
      site: 'so8',
      memory: 4,
      cpu: 2,
      disk: 56,
      status: 'poweredOn',
      ipAddress: '10.184.0.18',
      custom: false,
      owner: 'w120329',
      application: 'ereg',
      environment: 'p',
      created: '2018-11-23T12:49:27.192Z',
      environmentName: 'n/a',
      rpm_time: '2018-11-23T12:58:45Z',
      rpm_version: '11.0.0.5-1',
      rpm_rpm: 'jboss-wildfly',
      unit: 'edag'
    },
    []
  ]
  return seraMockData[it]
}

exports.getVmInfo = () => {
  return (req, res) => {
    const it = getRandomInt(0, 3)
    res.status(200).send(returnRandomVm(req.query.hostname, it))
  }
}
