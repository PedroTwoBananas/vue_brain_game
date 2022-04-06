import { ConfigsInterface } from '@/components/interfaces/ConfigsInterface'

export const defaultRanges =
   {
      time: { min: 1, max: 15 },
      difficulty: { min: 1, max: 10 },
   }

export const defaultConfigs: ConfigsInterface = {
   entrances: 0,
   difficulty: (Math.trunc(defaultRanges.difficulty.max / 2)).toString(),
   time: (Math.trunc(defaultRanges.time.max / 2)).toString(),
   selectedOperators: ['+'],
}