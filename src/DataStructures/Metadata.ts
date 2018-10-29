import { DatasetInfo, parseToDatasetInfo } from './DatasetInfo';
export type DataShape = {
  rows: number;
  columns: number;
};

export type Metadata =  {
  info: DatasetInfo;
  date: string;
  size: number;
};

export class StoredMetadata implements Metadata {
  info: DatasetInfo;
  date: string;
  size: number;
  secret: string;
};


export function ParseMetadata(
  fileinfo: Express.Multer.File,
  info: DatasetInfo
): StoredMetadata {
  return {
  info: info,
  date: Date.now().toString(),
  size: fileinfo.size,
  secret: getSecret(
    info.username,
    info.email,
    info.description,
    fileinfo.filename
  )
  };
}

function getSecret(...args: string[]): string {
  return "";
}

export function parseToStoredMetadata(data: any): StoredMetadata {
  if (typeof data === "string")
    data = JSON.parse(data as string);
  return {
    info: parseToDatasetInfo(data.info),
    date: data.date,
    size: data.size,
    secret: data.secret
  }
}

export function getMetadatafromStoredMetadata(data: StoredMetadata): Metadata {
  return {
    info: data.info,
    date: data.date,
    size: data.size
  }
}