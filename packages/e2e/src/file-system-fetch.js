export const name = 'file-system-fetch'

export const test = async ({ Main, Locator, expect }) => {
  await Main.openUri('fetch:///config/fileMap.json')

  const editor = Locator('.Viewlet.Editor')
  await expect(editor).toBeVisible()
  await expect(editor).toContainText('/playground/languages/index.ts')
}
