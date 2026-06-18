export enum ReportProblemRouteName {
  reportProblem = 'ReportProblem',
  reportProblemWebView = 'ReportProblemWebView',
}

export type ModuleStackParams = {
  [ReportProblemRouteName.reportProblem]: undefined
  [ReportProblemRouteName.reportProblemWebView]: undefined
}

export enum ReportProblemModalName {}

export type ReportProblemModalParams = Record<string, never>
