import { Router } from 'express'
import * as locationsCtrl from '../controllers/locations.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

router.get('/:id', locationsCtrl.show)
router.get('/', locationsCtrl.index)
router.get('/:`name', locationsCtrl.getLocation)
router.get('/:id/comments', locationsCtrl.show)

router.use(decodeUserFromToken)
router.post('/', checkAuth, locationsCtrl.create)
router.post('/:id/comments', checkAuth, locationsCtrl.createComment)
router.put('/:id', checkAuth, locationsCtrl.update)
router.delete('/:locationId/comments/:commentId', checkAuth, locationsCtrl.delete)



export {
  router
}

