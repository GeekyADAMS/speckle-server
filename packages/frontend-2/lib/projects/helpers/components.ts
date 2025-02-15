import { Nullable, Roles, StreamRoles } from '@speckle/shared'
import { LimitedUserAvatarFragment } from '~~/lib/common/generated/gql/graphql'

export type ProjectCollaboratorListItem = {
  id: string
  title: string
  user: Nullable<LimitedUserAvatarFragment>
  role: string
  inviteId: Nullable<string>
}

export type SelectableStreamRole = StreamRoles | 'delete'

export const roleSelectItems: Record<
  SelectableStreamRole | string,
  { id: SelectableStreamRole; title: string }
> = {
  [Roles.Stream.Owner]: {
    id: Roles.Stream.Owner,
    title: 'Owner'
  },
  [Roles.Stream.Contributor]: {
    id: Roles.Stream.Contributor,
    title: 'Can edit'
  },
  [Roles.Stream.Reviewer]: {
    id: Roles.Stream.Reviewer,
    title: 'Can view'
  },
  ['delete']: {
    id: 'delete',
    title: 'Remove'
  }
}

export enum CommentPermissions {
  Anyone = 'anyone',
  TeamMembersOnly = 'team'
}

export const commentPermissionsSelectItems: Record<
  CommentPermissions,
  { id: CommentPermissions; title: string }
> = {
  [CommentPermissions.Anyone]: {
    id: CommentPermissions.Anyone,
    title: 'Anyone can comment'
  },
  [CommentPermissions.TeamMembersOnly]: {
    id: CommentPermissions.TeamMembersOnly,
    title: 'Only team members can comment'
  }
}

export enum VersionActionTypes {
  Delete = 'delete',
  MoveTo = 'move-to',
  EditMessage = 'edit-message',
  Select = 'select',
  Share = 'share'
}
