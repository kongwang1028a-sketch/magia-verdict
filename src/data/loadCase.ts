import { assembleCase } from './stories/assemble'
import { DEFAULT_STORY_ID } from './stories/catalog'
import type { CaseData } from '../game/types'

export async function loadCase(storyId: string = DEFAULT_STORY_ID): Promise<CaseData> {
  switch (storyId) {
    case 'chapel-embers': {
      const mod = await import('./stories/chapel-embers/story')
      return assembleCase(mod)
    }
    case 'silent-bell':
    default: {
      const mod = await import('./stories/silent-bell/story')
      return assembleCase(mod)
    }
  }
}
