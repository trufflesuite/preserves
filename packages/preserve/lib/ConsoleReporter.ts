import chalk from "chalk";
import Spinnies from "spinnies";

import * as Control from "./control";

export interface ConsoleReporterConstructorOptions {
  console: Console;
}

export class ConsoleReporter {
  private spinners: Spinnies;
  private console: Console;

  constructor(options: ConsoleReporterConstructorOptions) {
    this.spinners = new Spinnies();
    this.console = options.console;
  }

  async report(events: AsyncIterable<Control.Event>) {
    for await (const event of events) {
      this[event.type].bind(this)(event);
    }
  }

  /*
   * Error events
   */

  private fail(event: Control.Events.Fail) {
    const { error } = event;

    const { key } = eventProperties(event);

    // get current text
    const { text, indent } = this.spinners.pick(key);

    const errorMessage = error.message ? `Error: ${error.message}` : error.toString();

    const options = error
      ? {
          text: `${text}\n${" ".repeat(indent)}${chalk.red(errorMessage)}`
        }
      : {};

    this.spinners.fail(key, options);
  }

  private abort(event: Control.Events.Abort) {
    const { key } = eventProperties(event);

    this.spinners.fail(key);
  }

  private stop(event: Control.Events.Stop) {
    const { key } = eventProperties(event);

    this.spinners.remove(key);
  }

  /*
   * Step events
   */

  private begin(event: Control.Events.Begin) {
    this.console.log();

    const { key, indent } = eventProperties(event);

    this.spinners.add(key, {
      succeedColor: "white",
      failColor: "white",
      indent: indent
    });
  }

  private succeed(event: Control.Events.Succeed) {
    const { message } = event;

    const { key } = eventProperties(event);

    const options = message ? { text: message } : {};

    this.spinners.succeed(key, options);
  }

  private step(event: Control.Events.Step) {
    const { key, indent } = eventProperties(event);

    const { message } = event;

    this.spinners.add(key, {
      text: message,
      indent,
      succeedColor: "white",
      failColor: "white"
    });
  }

  /*
   * Value resolution events
   */
  private declare(event: Control.Events.Declare) {
    const { key, indent } = eventProperties(event);

    const { message } = event;

    this.spinners.add(key, {
      text: chalk.cyan(message),
      indent,
      succeedColor: "white",
      failColor: "white"
    });
  }

  private resolve(event: Control.Events.Resolve) {
    const { payload } = event;

    const { key } = eventProperties(event);

    const { text } = this.spinners.pick(key);

    const [name] = text.split(":");

    const options = payload ? { text: `${name}: ${payload}` } : { text };

    this.spinners.update(key, {
      ...options,
      status: "stopped"
    });
  }

  private update(event: Control.Events.Update) {
    const { payload, message } = event;

    const { key } = eventProperties(event);

    const { text } = this.spinners.pick(key);

    if (!payload && !message) return;

    const [name] = text.split(":");

    // Update the value resolution with a payload or the step with message
    const options = message
      ? { text: message }
      : { text: `${name}: ${payload}` };

    this.spinners.update(key, options);
  }
}

const eventProperties = (event: Control.Event) => ({
  key: Control.Scopes.toKey(event.scope),
  indent: event.scope.length * 2
});
