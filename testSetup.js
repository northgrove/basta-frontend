import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// "setupTestFrameworkScriptFile": "<rootDir>/testSetup.js",
// "moduleNameMapper": {
//   "\\.(css|jpg|png)$": "<rootDir>/empty-module.js"
// },
// "transformIgnorePatterns": [
//   "node_modules/(?!(react-native|lodash-es|react-redux)/)"
// ],
// "moduleFileExtensions": [
//   "js",
//   "jsx"
// ],
// "moduleDirectories": [
//   "node_modules"
// ]
