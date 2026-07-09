import * as FileSystem from '../FileSystem/FileSystem.ts'

export const activate = () => {
  vscode.registerFileSystemProvider({
    id: 'fetch',
    pathSeparator: FileSystem.getPathSeparator(),
    isReadonly: () => true,
    readFile: FileSystem.readFile,
    readDirWithFileTypes: FileSystem.readDirWithFileTypes,
  })
}
