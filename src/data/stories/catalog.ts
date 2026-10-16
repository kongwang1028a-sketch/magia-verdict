import type { StoryPackInfo } from '../../game/types'

/** 可切換文本一覽（不含兇手劇透） */
export const STORY_CATALOG: StoryPackInfo[] = [
  {
    id: 'silent-bell',
    title: '無聲的鐘樓',
    subtitle: '第一審 · 重寫稿',
    blurb: '鐘聲停在不該停的時候。全新撰寫的短案，十三人皆會登場。',
    tag: '現行',
  },
  {
    id: 'chapel-embers',
    title: '祈禱堂的餘燼',
    subtitle: '封存稿 · 可回看',
    blurb: '先前版本的祈禱堂事件全文，完整保留供對照與重玩。',
    tag: '封存',
  },
]

export const DEFAULT_STORY_ID = 'silent-bell'
export const STORY_STORAGE_KEY = 'witch-trial-story-id'
