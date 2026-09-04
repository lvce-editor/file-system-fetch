import * as AssetDir from '../AssetDir/AssetDir.ts'
import type { Dirent } from '../Dirent/Dirent.ts'
import * as DirentType from '../DirentType/DirentType.ts'
import * as GetJson from '../GetJson/GetJson.ts'

// TODO move all of this to an extension

export const canBeRestored = true

export const name = 'Fetch'

export const state = {
  files: Object.create(null),
}

const getPath = (uri: string): string => {
  return new URL(uri).pathname
}

export const readFile = async (uri) => {
  const path = getPath(uri)
  const fetchUri = `${AssetDir.assetDir}${path}`
  const text = await GetJson.getJson(fetchUri)
  return text
}

export const writeFile = (uri, content) => {
  throw new Error('not implemented')
}

export const mkdir = (uri) => {
  throw new Error('not implemented')
}

export const remove = (uri) => {
  throw new Error('not implemented')
}

export const readDirWithFileTypes = async (uri: string) => {
  const path = getPath(uri)
  const fetchUri = `${AssetDir.assetDir}/config/fileMap.json`
  const fileList = await GetJson.getJson(fetchUri)
  const dirents: Dirent[] = []
  for (const fileUri of fileList) {
    if (fileUri.startsWith(path)) {
      const rest = fileUri.slice(path.length + 1)
      if (rest.includes('/')) {
        const name = rest.slice(0, rest.indexOf('/'))
        if (dirents.some((dirent) => dirent.name === name)) {
          continue
        }
        dirents.push({
          type: DirentType.Directory,
          name,
        })
      } else {
        dirents.push({
          type: DirentType.File,
          name: rest,
        })
      }
    }
  }
  return dirents
}

export const chmod = (path, permissions) => {
  throw new Error('[memfs] chmod not implemented')
}

export const getBlob = async (uri) => {
  const content = await readFile(uri)
  const blob = new Blob([content])
  return blob
}
