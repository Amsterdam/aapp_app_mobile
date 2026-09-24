import {Slice, type SliceCaseReducers} from '@reduxjs/toolkit'
import {MigrationManifest} from 'redux-persist'
import {ReduxKey} from '@/store/types/reduxKey'

type SliceCaseReducersWithReset<T> = SliceCaseReducers<T> & {reset: () => void}

export type ReduxConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CaseReducers extends SliceCaseReducersWithReset<any> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SliceCaseReducersWithReset<any>,
> = {
  /**
   * Key for the Redux state.
   */
  key: ReduxKey
  /**
   * Configuration to transform the persisted state of a module, if any, based on the app or module version
   */
  migrations?: MigrationManifest
  /**
   * The version of the persisted state of this module; we increment this version when we add new migrations for backward compatibility.
   * A module's state will only be persisted if persist version is defined.
   */
  persistVersion?: number
  /**
   * Whitelist with the keys of the data in the redux state that should be persisted (leave undefined to persist the complete state).
   */
  persistWhitelist?: string[]
  /**
   * A redux slice for this module.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice: Slice<any, CaseReducers>
}
