import { Navigation } from './components/Navigation'
import { DressCodeSection } from './components/sections/DressCodeSection'
import { HeroSection } from './components/sections/HeroSection'
import { LocationSection } from './components/sections/LocationSection'
import { ProgramSection } from './components/sections/ProgramSection'
import { RsvpSection } from './components/sections/RsvpSection'
import { StorySection } from './components/sections/StorySection'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <StorySection />
        <ProgramSection />
        <LocationSection />
        <DressCodeSection />
        <RsvpSection />
      </main>
    </>
  )
}

export default App
