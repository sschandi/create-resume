export const shrinkTransitionConfig = {
  keys: (item: { id: string | number }) => item.id,
  from: { maxHeight: 0, opacity: 0 },
  enter: () => async (next: any) => {
    await next({ maxHeight: 10000, opacity: 1 })
    await next({ maxHeight: 'auto' })
  },
  leave: { maxHeight: 0, opacity: 0.5 },
  config: { mass: 1, tension: 140, friction: 20 }
}

export const sectionShrinkTransitionConfig = {
  ...shrinkTransitionConfig,
  from: { maxHeight: 10000, opacity: 0 },
}