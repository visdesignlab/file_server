export type DataShape = {
  rows: number;
  columns: number;
};

export type Metadata = {
  username: string;
  email: string;
  description: string;
  dataFilename: string;
  size: number;
  date: string;
  shape: DataShape;
};

export type StoredMetadata = Metadata & {
  secret: string;
};

export function ParseMetadata(
  data: any,
  fileinfo: Express.Multer.File
): StoredMetadata {
  return {
    username: data.username,
    email: data.email,
    description: data.description,
    dataFilename: fileinfo.filename,
    size: fileinfo.size,
    date: Date.now().toString(),
    shape: data.shape,
    secret: getSecret(
      data.username,
      data.email,
      data.description,
      fileinfo.filename
    )
  };
}

function getSecret(...args: string[]): string {
  return "";
}
