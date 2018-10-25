[![CircleCI](https://circleci.com/gh/navikt/basta-frontend.svg?style=svg)](https://circleci.com/gh/navikt/basta-frontend)
[![Known Vulnerabilities](https://snyk.io/test/github/navikt/basta-frontend/badge.svg?targetFile=package.json)](https://snyk.io/test/github/navikt/basta-frontend?targetFile=package.json)
[![](https://codescene.io/projects/3541/status.svg) Get more details at **codescene.io**.](https://codescene.io/projects/3541/jobs/latest-successful/results)

# Basta frontend

Basta er en selvbetjent bestillingsportal for bestilling og opprettelse av ting som virtuell maskiner, databaser, køer, brukere osv.
Dette er frontend til basta som kaller Basta APIet internt.

## Utvikling lokalt

Kjør

```console
npm install
npm run api
npm run frontend
```

### Offline modus

Basta frontend krever innlogging via Azure AD. For utvikling lokalt er det ofte ikke ønskelig med en slik integrasjon.
Det finnes en offline modus som mocker ut Azure AD.
For offline modus kjør:

```console
npm run offline
```

Api gir det et mock api som simulerer basta backend

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til Team Aura.

For eksterne kontakt en av følgende:

- Frode Sundby (frode.sundby@nav.no)
- Mats Byfuglien (mats.byfuglien@nav.no)
- Even Haasted (even.haasted@nav.no)

For NAV-ansatte kan henvendelser sendes via slack i kanalen #aura
