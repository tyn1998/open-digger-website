/**
 * project meta
 */
export interface ProjectMeta {
  name: string;
  text: string;
  description: string;
  urls: Array<{
    type: string;
    url: string;
    text: string;
  }>;
  logo: string;
}

export interface IndexData {
  time: number;
  repos: ProjectMeta[];
}

/**
 * project data request params
 */
export interface ProjectDataParams {
  project: string;
  timeUnit: 'year' | 'month';
  timeValue: `${number}` | `${number}-${number}`;
}

/**
 * project data detail
 */
export interface ProjectData {
  name: string;
  text: string;
  /** developers in the project */
  details: Array<{
    l: string;
    o: string;
    a: string;
    r: string;
    od: string;
    rd: string;
    i?: boolean;
    b?: boolean;
  }>;
}
