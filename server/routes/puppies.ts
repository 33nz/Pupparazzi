import express from 'express'
import * as store from '../store.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await store.getPuppies()
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const data = await store.getPuppyById(id)
  if (data !== undefined) {
    res.json(data)
  } else {
    res.sendStatus(404)
  }
})

export default router
