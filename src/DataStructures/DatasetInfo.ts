export type IMetaData = {
  type: string;
  index: number;
  name: string;
  min?: number;
  max?: number;
};

export type ISetInfo = {
  format: string;
  start: number;
  end: number;
};

export type DatasetInfo = {
  username: string;
  email: string;
  file: string;
  name: string;
  header: number;
  separator: string;
  skip: number;
  meta: Array<IMetaData>;
  sets: Array<ISetInfo>;
  author: string;
  description: string;
  source: string;
  text: string;
};

export function parseToDatasetInfo(info: any): DatasetInfo {
  return {
    username: info.username,
    email: info.email,
    file: info.file,
    name: info.name,
    header: info.header,
    separator: info.separator,
    skip: info.skip,
    meta: info.meta,
    sets: info.sets,
    author:  info.author,
    description: info.description,
    source: info.source,
    text: info.text,
  }
}

export function isValidDatasetInfo(info: any): boolean {
  let propsToHave = ["username","email","file","name","header","separator","skip","meta","sets","author","description","source","text"]
  let valid: number = 1; 
  propsToHave.forEach(p => {
    if (!(p in info))
      valid = valid * 0;
  })
  return valid > 0;
}