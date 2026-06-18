export enum ReportProblemRouteName {
  reportProblem = 'ReportProblem',
  reportProblemWebView = 'ReportProblemWebView',
}

export type ModuleStackParams = {
  [ReportProblemRouteName.reportProblem]: undefined
  [ReportProblemRouteName.reportProblemWebView]: undefined
}
