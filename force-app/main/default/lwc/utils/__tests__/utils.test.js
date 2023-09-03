import { timeout } from '../utils'

it('timeout', async () => {
  await expect(timeout()).resolves
})
