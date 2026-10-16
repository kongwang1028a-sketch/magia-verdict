import { AnimatePresence, motion } from 'framer-motion'
import { AccusationScreen } from './components/AccusationScreen'
import { Atmosphere } from './components/Atmosphere'
import { DailyScreen } from './components/DailyScreen'
import { EndingScreen } from './components/EndingScreen'
import { IncidentScreen } from './components/IncidentScreen'
import { InvestigationScreen } from './components/InvestigationScreen'
import { PrologueScreen } from './components/PrologueScreen'
import { TitleScreen } from './components/TitleScreen'
import { TrialScreen } from './components/TrialScreen'
import { useTrialGame, type LoadedTrialGame } from './game/useTrialGame'

export default function App() {
  const game = useTrialGame()
  const { phase, caseData, loadError } = game

  if (loadError) {
    return (
      <div className="bg-chapel flex min-h-dvh items-center justify-center px-6 text-center">
        <p className="text-[var(--blood-bright)]">劇本載入失敗：{loadError}</p>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="bg-chapel relative flex min-h-dvh items-center justify-center overflow-hidden">
        <Atmosphere />
        <div className="relative z-10 text-center">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.35em] text-[var(--candle)]">
            LOADING
          </p>
          <p className="mt-3 font-[family-name:var(--font-serif)] text-xl text-[var(--parchment)]">
            正在開啟魔女島的卷宗……
          </p>
        </div>
      </div>
    )
  }

  const loaded = game as LoadedTrialGame

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
              onStart={game.startPrologue}
            />
          )}
          {phase === 'prologue' && <PrologueScreen game={loaded} />}
          {phase === 'daily' && <DailyScreen game={loaded} />}
          {phase === 'incident' && <IncidentScreen game={loaded} />}
          {phase === 'investigation' && <InvestigationScreen game={loaded} />}
          {phase === 'trial' && <TrialScreen game={loaded} />}
          {phase === 'accusation' && <AccusationScreen game={loaded} />}
          {phase === 'ending' && <EndingScreen game={loaded} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
