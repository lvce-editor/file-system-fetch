import * as AssetDir from '../AssetDir/AssetDir.js'
import type { Dirent } from '../Dirent/Dirent.ts'
import * as DirentType from '../DirentType/DirentType.js'
import * as GetJson from '../GetJson/GetJson.js'

// TODO move all of this to an extension

export const canBeRestored = true

export const name = 'Fetch'

export const state = {
  files: Object.create(null),
}

export const readFile = async (uri) => {
  const fetchUri = `${AssetDir.assetDir}${uri}`
  const text = await GetJson.getJson(fetchUri)
  return text
}

export const writeFile = (uri, content) => {
  throw new Error('not implemented')
}

export const mkdir = (uri) => {
  throw new Error('not implemented')
}

export const getPathSeparator = () => {
  return '/'
}

export const remove = (uri) => {
  throw new Error('not implemented')
}

export const readDirWithFileTypes = async (uri: string) => {
  const fetchUri = `${AssetDir.assetDir}/config/fileMap.json`
  const fileList = await GetJson.getJson(fetchUri)
  const dirents: Dirent[] = []
  for (const fileUri of fileList) {
    if (fileUri.startsWith(uri)) {
      const rest = fileUri.slice(uri.length + 1)
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
