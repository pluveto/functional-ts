abstract class Maybe<T> {
    static just<T>(value: T): Maybe<T> {
      return new Just(value)
    }
  
    static nothing<T>(): Maybe<T> {
      return new Nothing()
    }
  
    abstract bind<U>(func: (value: T) => Maybe<U>): Maybe<U>
  }
  
  class Just<T> extends Maybe<T> {
    constructor(private value: T) {
      super()
    }
  
    bind<U>(func: (value: T) => Maybe<U>): Maybe<U> {
      return func(this.value)
    }
  }
  
  class Nothing<T> extends Maybe<T> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bind<U>(_: (value: T) => Maybe<U>): Maybe<U> {
      return new Nothing()
    }
  }
  
  function readArg(): Maybe<string> {
    const input = process.argv[2]
    return input ? Maybe.just(input) : Maybe.nothing()
  }
  
  function parseArg(arg: string): Maybe<number> {
    const n = parseInt(arg)
    return isNaN(n) ? Maybe.nothing() : Maybe.just(n)
  }
  
  function double(n: number): Maybe<number> {
    return Maybe.just(n * 2)
  }
  
  function print(n: number): Maybe<number> {
    console.log(n)
    return new Nothing()
  }
  
  readArg().bind(parseArg).bind(double).bind(double).bind(print)
  
  export default {}
  