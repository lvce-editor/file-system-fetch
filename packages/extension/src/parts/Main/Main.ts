import { activate as activateExtensionApi, registerFileSystemProvider } from '@lvce-editor/api'
import * as FileSystem from '../FileSystem/FileSystem.ts'

export const activate = async (): Promise<void> => {
  await activateExtensionApi()
  registerFileSystemProvider({
    id: 'fetch',
    isReadonly: () => true,
    readFile: FileSystem.readFile,
    readDirWithFileTypes: FileSystem.readDirWithFileTypes,
  })
}
