export interface Actions {
  fetchData: Function;
  download: Function;
}

export interface State {
  loading: boolean;
  dataSource: Array<any>;
}