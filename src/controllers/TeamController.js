import mongoose from 'mongoose';
import TeamModel from '../models/teamModel';
import response from '../utils/response';
import messages from '../utils/messages';

/** *
   * @exports {class} Users
   */
class TeamController {
  /**
     *  admin can add team
     * @param {object} req - response object
     * @param {object} res - response object
     * @param {number} status - http status code
     * @param {string} statusMessage - http status message
     * @param {object} data - response data
     *
     * @returns {object} returns response
     *
     * @example
     *
     */
  static async addTeam(req, res) {
    const {
      teamName, teamMembers, description
    } = req.body;
    try {
      if (!req.user.isAdmin) {
        return response(res, 404, 'error', {
          message: messages.unAuthorizedRoute
        });
      }
      const teams = new TeamModel({
        _id: new mongoose.Types.ObjectId(),
        teamName,
        teamMembers,
        description
      });
      const team = await teams.save();
      if (team) {
        return response(res, 201, 'success', { team });
      }
    } catch (error) {
      error.errors.teamName.name === 'ValidatorError'
        ? response(res, 409, 'error', {
          message: messages.duplicateName
        })
        : response(res, 400, 'error', {
          message: messages.error
        });
    }
  }
}

export default TeamController;
