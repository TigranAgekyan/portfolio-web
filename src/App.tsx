import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import { TracingBeam } from './components/ui/tracing-beam'

// The whole portfolio is one page. Sections are stacked top to bottom in the
// same order as the Stitch design (style/code.html, style/screen.png).
function App() {
  return (
    <>
      {/* Fixed top bar with name, section links, language and theme controls */}
      <Header />

      {/* pt-14 pushes content below the 56px fixed header */}
      <main className="w-full pt-14">
        <Hero />
        {/* Scroll-progress line from the Work heading down to Contact, with a
            checkpoint at each section's heading */}
        <TracingBeam>
          <Work />
          <About />
          <Experience />
          <Contact />
        </TracingBeam>
      </main>

      <Footer />
    </>
  )
}

export default App
