
export const defaultRanges =
   {
      time: { min: 1, max: 15 },
      difficulty: { min: 1, max: 10 },
   }

export const defaultConfigs = {
   entrances: 0,
   difficulty: Math.trunc(defaultRanges.difficulty.max / 2),
   time: Math.trunc(defaultRanges.time.max / 2),
   selectedOperators: ['+'],
}