import type { Events } from "../events";
import { Process, State } from "../types";
import { transitionToState, validStates } from "./decorators";
import {
  ErrorController,
  ConstructorOptions as ErrorControllerConstructorOptions,
  IErrorController
} from "./ErrorController";

export namespace Options {
  export interface Update {
    payload?: string;
  }

  export interface Resolve {
    resolution?: any;
    payload?: string;
  }

  export interface Extend {
    identifier: string;
    message?: string;
  }
}

export interface ConstructorOptions extends ErrorControllerConstructorOptions {}

export interface IValueResolutionController extends IErrorController {
  resolve(options: Options.Resolve): Process<void, Events.Resolve>;
  extend(options: Options.Extend): Process<IErrorController, Events.Declare>;
}

export class ValueResolutionController
  extends ErrorController
  implements IValueResolutionController {
  constructor(options: ConstructorOptions) {
    const { ...superOptions } = options;
    super(superOptions);

    // so we can pass these around as functions
    this.resolve = this.resolve.bind(this);
    this.extend = this.extend.bind(this);
  }

  @validStates([State.Active])
  async *update({ payload }: Options.Update = {}) {
    yield this.emit<Events.Update>({
      type: "update",
      payload
    });
  }

  @validStates([State.Active])
  @transitionToState(State.Done)
  async *resolve({ resolution, payload }: Options.Resolve = {}) {
    yield this.emit<Events.Resolve>({
      type: "resolve",
      resolution,
      payload
    });
  }

  @validStates([State.Active])
  async *extend({ identifier, message }: Options.Extend) {
    const parent = this;

    const child = new ValueResolutionController({
      scope: [...this.scope, identifier],
      parent,
      state: State.Active
    });

    this.children.push(child);

    yield child.emit<Events.Declare>({
      type: "declare",
      message: message || identifier
    });

    return child;
  }
}
