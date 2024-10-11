export type CreateDesktopParams = {

  name: string;

  type: 'file' | 'folder';

  parent_id?: number;

  size?: number;

}

export type UpdateDesktopParams = {

  name: string;

  type: 'file' | 'folder';

  parent_id?: number;

  size?: number;

}