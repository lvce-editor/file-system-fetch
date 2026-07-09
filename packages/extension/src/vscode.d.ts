interface FileSystemProvider {
  readonly id: string
  readonly pathSeparator: string
  readonly isReadonly: () => boolean
  readonly readFile: (uri: string) => Promise<string>
  readonly readDirWithFileTypes: (uri: string) => Promise<readonly unknown[]>
}

declare const vscode: {
  readonly registerFileSystemProvider: (provider: FileSystemProvider) => void
}
