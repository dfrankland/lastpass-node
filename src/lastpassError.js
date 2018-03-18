import ExtendableError from 'es6-error';

export default class LastpassError extends ExtendableError {
  constructor({ title, body } = {}) {
    super(title);
    this.name = 'LastpassError';
    this.title = title;
    this.body = body;
  }
}
