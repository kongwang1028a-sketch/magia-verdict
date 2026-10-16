import { AnimatePresence, motion } from 'framer-motion'
import { AccusationScreen } from './components/AccusationScreen'
import { Atmosphere } from './components/Atmosphere'
import { BriefingScreen } from './components/BriefingScreen'
import { EndingScreen } from './components/EndingScreen'
import { InvestigationScreen } from './components/InvestigationScreen'
import { TitleScreen } from './components/TitleScreen'
import { TrialScreen } from './components/TrialScreen'
import { useTrialGame } from './game/useTrialGame'

export default function App() {
  const game = useTrialGame()
  const { phase, caseData } = game

  return (
    <div className="bg-chapel relative min-h-dvh overflow-x-hidden">
      <Atmosphere />
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {phase === 'title' && (
            <TitleScreen
              title={caseData.title}
              subtitle={caseData.subtitle}
              onStart={game.startBriefing}
            />
          )}
          {phase === 'briefing' && (
            <BriefingScreen caseData={caseData} onContinue={game.startInvestigation} />
          )}
          {phase === 'investigation' && <InvestigationScreen game={game} />}
          {phase === 'trial' && <TrialScreen game={game} />}
          {phase === 'accusation' && <AccusationScreen game={game} />}
          {phase === 'ending' && <EndingScreen game={game} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
