import { IndexData, ProjectData, ProjectDataParams } from '../types';
import {
  mockAllProjectMetas,
  mockNacosProjectData2025,
  mockNacosProjectData202501,
} from './mockData';
import request from './request';

const isDev = window.location.hostname === 'localhost';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * fetch all project metas
 */
export const fetchIndexData = async () => {
  if (isDev) {
    await sleep(1000);
    return mockAllProjectMetas;
  }
  return request<IndexData>('/index.json');
};

/**
 * fetch project data detail
 */
export const fetchProjectData = async ({ project, timeUnit, timeValue }: ProjectDataParams) => {
  if (isDev && timeUnit === 'month') {
    await sleep(1000);
    return mockNacosProjectData202501;
  }
  if (isDev && timeUnit === 'year') {
    await sleep(1000);
    return mockNacosProjectData2025;
  }
  const time = timeUnit === 'year' ? timeValue : `${timeValue.split('-').join('/')}`;
  return request<ProjectData>(`/${project}/${time}/data.json`);
};
