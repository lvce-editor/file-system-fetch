export const name = 'file-system-fetch'

export const test = async ({ Command, Main, Locator, expect }) => {
  await Command.execute('Workspace.setUri', 'fetch:///playground')

  const explorer = Locator('.Explorer')
  await expect(explorer).toBeVisible()
  await expect(explorer).toContainText('languages')

  await Main.openUri('fetch:///config/fileMap.json')

  const editor = Locator('.Viewlet.Editor')
  await expect(editor).toBeVisible()
  await expect(editor).toContainText('/playground/languages/index.ts')
}
