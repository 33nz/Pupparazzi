import type { PuppyData, Puppy } from '../models/Puppy.ts'
import initialData from '../example.json'
import * as fs from 'node:fs/promises' //fs short for file system
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

//UPDATING A PUPPY
export async function updatePuppy(id: number, data: PuppyData): Promise<void> {
  const puppyData = await getPuppies()
  const index = puppyData.puppies.findIndex((puppy: Puppy) => puppy.id === id)
  if (index !== -1) {
    puppyData.puppies[index] = data
    await writeDataToFile(puppyData, filePath)
  }
}

export async function writeDataToFile(data: PuppyData, filePath: string) {
  const stringData = JSON.stringify(data, null, 2)
  await fs.writeFile(filePath, stringData, (err: any) => {})
}

//   const currentPuppy = puppiesList.puppies.findIndex(
//     (puppy: Puppy, index: number) => (puppy.id === id) {
//   puppiesList.puppies.splice(index, 1, data)
//   fs.writeFile(Path.resolve(filePath), 'utf-8')
// }
// }
