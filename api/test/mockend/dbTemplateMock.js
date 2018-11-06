exports.getTemplates = () => {
  return (req, res) => {
    res.status(200).send([
      {
        uri: '/em/cloud/dbaas/pluggabledbplatformtemplate/24',
        description:
          'Standard Production Oracle Pluggable Database, Oracle Dataguard, Backup enabled',
        name: 'p_st_rhel_fss'
      }
    ])
  }
}
