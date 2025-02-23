import { useHistory, useLocation } from '@docusaurus/router';
import { useCallback } from 'react';

import { IndexData, ProjectDataParams } from './types';

interface UseProjectDataParamsProps {
  indexData: IndexData | null;
}

/**
 * provide getter and setter for projectDataParams based on location
 */
const useProjectDataParams = ({ indexData }: UseProjectDataParamsProps) => {
  const location = useLocation();
  const history = useHistory();

  const buildPathWithParams = useCallback(
    (params: ProjectDataParams) => {
      const currentPathname = location.pathname;
      const searchParams = new URLSearchParams(location.search);
      Object.keys(params).forEach((key) => {
        searchParams.set(key, params[key]);
      });
      return `${currentPathname}?${searchParams.toString()}`;
    },
    [location.pathname, location.search],
  );

  const getProjectDataParams = useCallback(() => {
    if (!indexData) {
      return null;
    }
    const query = new URLSearchParams(location.search);
    const project = query.get('project') || indexData.repos[0].name;
    const timeUnit = query.get('timeUnit') || 'month';
    const indexTime = new Date(indexData.time);
    const timeValue =
      query.get('timeValue') ||
      (timeUnit === 'year'
        ? indexTime.getFullYear()
        : `${indexTime.getFullYear()}-${indexTime.getMonth() + 1}`);
    return {
      project,
      timeUnit: timeUnit as ProjectDataParams['timeUnit'],
      timeValue: timeValue as ProjectDataParams['timeValue'],
    };
  }, [indexData, location.search]);

  const setProjectDataParams = useCallback(
    (params: ProjectDataParams) => {
      const pathWithParams = buildPathWithParams(params);
      history.push(pathWithParams);
    },
    [history, buildPathWithParams],
  );

  return {
    projectDataParams: getProjectDataParams(),
    setProjectDataParams,
  };
};

export default useProjectDataParams;
