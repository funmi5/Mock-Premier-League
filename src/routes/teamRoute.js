import express from 'express';
import validate from '../middlewares/validator';
import TeamController from '../controllers/TeamController';
import Authentication from '../middlewares/Authentication';
import addTeamSchema from '../validation/teamSchema';

const router = express.Router();

// create a team route
router.post('/team', Authentication.verifyToken, validate(addTeamSchema), TeamController.addTeam);

// remove a team route
router.delete('/team/:teamId', Authentication.verifyToken, TeamController.removeTeam);

// edit a team route
router.put('/team/:teamId', Authentication.verifyToken, validate(addTeamSchema), TeamController.editTeam);

// view a team route
router.get('/team/:teamId', Authentication.verifyToken, TeamController.viewATeam);

// view all team route
router.get('/teams', Authentication.verifyToken, TeamController.viewAllTeam);

// search team robustly
router.post('/teams/search', TeamController.searchTeam);

export default router;
