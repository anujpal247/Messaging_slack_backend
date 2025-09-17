import { IWorkspace, Workspace } from "../models/workspace.model";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";


export interface IWorkspaceRepository {
  createWorkspace(workspaceData: Partial<IWorkspace>): Promise<IWorkspace>;
  getWorkspaceById(id: string): Promise<IWorkspace | null>;
  getWorkspaceByJoinCode(joinCode: string): Promise<IWorkspace | null>;
  getWorkspaceByName(name: string): Promise<IWorkspace | null>;
  getWorkspaceByMember(member: string): Promise<IWorkspace | null>;
  getAllWorkspaces(): Promise<IWorkspace[]>;
  updateWorkspace(id: string, workspaceData: Partial<IWorkspace>): Promise<IWorkspace | null>;
  deleteWorkspace(id: string): Promise<boolean>;
  addMemberToWorkspace(workspaceId: string, memberId: string): Promise<IWorkspace | null>;
  addChannelToWorkspace(workspaceId: string, channelId: string): Promise<IWorkspace | null>;
}

export class WorkspaceRepository implements IWorkspaceRepository {
  constructor() {
    console.log("Workspace repository initialized");
  }

  async createWorkspace(workspaceData: Partial<IWorkspace>): Promise<IWorkspace> {
    const workspace = await Workspace.create(workspaceData);

    if (!workspace){
      throw new BadRequestError("Workspace not created");
    }

    return workspace;
  }

  async getWorkspaceById(id: string): Promise<IWorkspace | null> {
    const workspace = await Workspace.findById(id);

    if (!workspace){
      throw new NotFoundError(`Workspace not found with id ${id}`);
    }

    return workspace;
  }

  async getWorkspaceByJoinCode(joinCode: string): Promise<IWorkspace | null> {
    const workspace = await Workspace.findOne({ joinCode });

    if (!workspace){
      throw new NotFoundError(`Workspace not found with join code ${joinCode}`);
    }

    return workspace;
  }

  async getWorkspaceByName(name: string): Promise<IWorkspace | null> {
    const workspace = await Workspace.findOne({ name });

    if (!workspace){
      throw new NotFoundError(`Workspace not found with name ${name}`);
    }
    return workspace;
  }

  async getWorkspaceByMember(member: string): Promise<IWorkspace | null> {
    const workspace = await Workspace.findOne({ members: member });

    if (!workspace){
      throw new NotFoundError(`Workspace not found with member ${member}`);
    }

    return workspace;
  }

  async getAllWorkspaces(): Promise<IWorkspace[]> {
    const workspaces = await Workspace.find();

    if (!workspaces){
      throw new NotFoundError("No workspaces found");
    }

    return workspaces;
  }

  async updateWorkspace(id: string, workspaceData: Partial<IWorkspace>): Promise<IWorkspace | null> {
    const workspace = await Workspace.findByIdAndUpdate(id, workspaceData, { new: true });

    if (!workspace){
      throw new NotFoundError(`Workspace not found with id ${id}`);
    }

    return workspace;
  }

  async deleteWorkspace(id: string): Promise<boolean> {
    const workspace = await Workspace.findByIdAndDelete(id);
    if (workspace) return true;
    return false;
  }

  async addMemberToWorkspace(workspaceId: string, memberId: string): Promise<IWorkspace | null> {
    const workspace = await Workspace.findByIdAndUpdate(workspaceId, { $addToSet: { members: memberId } }, { new: true });

    if (!workspace){
      throw new NotFoundError(`Workspace not found with id ${workspaceId}`);
    }

    return workspace;
  }

  async addChannelToWorkspace(workspaceId: string, channelId: string): Promise<IWorkspace | null> {
    const workspace = await Workspace.findByIdAndUpdate(workspaceId, { $addToSet: { channels: channelId } }, { new: true });

    if (!workspace){
      throw new NotFoundError(`Workspace not found with id ${workspaceId}`);
    }
    return workspace;
  }
}