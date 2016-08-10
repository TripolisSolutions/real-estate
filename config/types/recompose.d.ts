declare module 'recompose/withReducer' {
  namespace withReducer {}

  interface reducer<S, A> {
    (state: S, action: A): S
  }

  interface HOC<P> {
    (component: __React.Component<any, void>): __React.Component<P, void>
  }

  function withReducer<S, A, P>(
    stateName: string,
    dispatchName: string,
    reducer: reducer<S, A>,
    initialState: S
  ): <C extends Function>(WrappedComponent: C) => C;

  export default withReducer
}