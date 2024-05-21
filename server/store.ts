import type { PuppyData, Puppy } from '../models/Puppy.ts'
import initialData from '../example.json'
import * as fs from 'node:fs/promises'
import * as Path from 'node:path'

const filePath = 'storage/data.json'

interface Data {
  puppies: Puppy[]
}

// export async function getPuppies(): Promise<Data> {
//   return initialData
// }

// // export async function getPuppies() {
//   return await readFile(Path.resolve('./storage/data.json'), {
//     encoding: 'UTF-8',
//   })
//     .then((result) => {
//       return JSON.parse('' + result)
//     })
//     .catch((error) => {
//       throw error
//     })
// }

export async function getPuppies() {
  try {
    const json = await fs.readFile(Path.resolve(filePath), 'utf-8')
    const data = JSON.parse(json)
    return data
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return initialData
    }
    throw error
  }
}

export async function getPuppyById(id: number): Promise<Puppy | undefined> {
  const data = await getPuppies()
  return data.puppies.find((puppy: Puppy) => puppy.id)
}
// try {
//     const json = await fs.readFile(Path.resolve(filePath), 'utf-8')
//     const data = JSON.parse(json)

//     return data.puppies.find((puppy: Puppy) => puppy.id === id)
// } catch (error: any) {
//   if (error.code === 'ENOENT') {
//     return undefined
//   }
//   throw error
// }
