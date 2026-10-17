import { AnimatePresence, motion } from 'framer-motion'
import type { LoadedTrialGame } from '../game/useTrialGame'

interface Props {
  game: LoadedTrialGame
}

export function NotebookPanel({ game }: Props) {
  const { notebook, notebookOpen, toggleNotebook, phase } = game
  if (phase === 'title') return null

  return (
    <>
      <button
        type="button"
        onClick={toggleNotebook}
        className="fixed bottom-4 left-4 z-50 border border-[color-mix(in_srgb,var(--candle)_45%,transparent)] bg-[color-mix(in_srgb,var(--ink)_88%,transparent)] px-3 py-2 text-xs tracking-[0.18em] text-[var(--candle)] shadow-lg backdrop-blur-sm transition hover:border-[var(--candle)] sm:bottom-6 sm:left-6"
        aria-expanded={notebookOpen}
      >
        推理筆記 {notebook.length > 0 ? `· ${notebook.length}` : ''}
      </button>

      <AnimatePresence>
        {notebookOpen && (
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col border-r border-[color-mix(in_srgb,var(--candle)_30%,transparent)] bg-[color-mix(in_srgb,var(--ink)_96%,transparent)] shadow-2xl backdrop-blur-md"
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -16, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <header className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--parchment)_12%,transparent)] px-5 py-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.3em] text-[var(--candle)]">
                  NOTEBOOK
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-serif)] text-lg font-bold">
                  推理筆記
                </h2>
              </div>
              <button
                type="button"
                onClick={toggleNotebook}
                className="text-xs tracking-wider text-[var(--iron)] hover:text-[var(--parchment)]"
              >
                關閉
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {notebook.length === 0 ? (
                <p className="text-sm leading-7 text-[var(--parchment-dim)]">
                  探訪日常場景與搜證後，線索會記在這裡。可隨時翻閱。
                </p>
              ) : (
                notebook.map((entry) => (
                  <article
                    key={entry.id}
                    className="border border-[color-mix(in_srgb,var(--parchment)_14%,transparent)] bg-[color-mix(in_srgb,var(--ink-soft)_55%,transparent)] p-3"
                  >
                    <p className="text-[10px] tracking-[0.2em] text-[var(--iron)]">
                      {entry.kind === 'evidence' ? '證物' : '備註'}
                    </p>
                    <h3 className="mt-1 font-[family-name:var(--font-serif)] text-sm font-medium text-[var(--candle)]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--parchment-dim)]">
                      {entry.body}
                    </p>
                  </article>
                ))
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
