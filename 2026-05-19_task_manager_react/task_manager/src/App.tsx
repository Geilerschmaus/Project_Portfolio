import './App.css'

import HeaderMainScreen from "./components/Header.tsx"
import FooterMainScreen from "./components/Footer.tsx"
import Taskcreator from "./components/Taskcreator.tsx"

function App() {
  return (
    <div className="App">
      <HeaderMainScreen />
      <Taskcreator></Taskcreator>
      <FooterMainScreen></FooterMainScreen>
    </div>
  )
}

export default App
