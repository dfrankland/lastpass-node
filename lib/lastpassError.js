import ExtendableError from 'es6-error';

class LastpassError extends ExtendableError {
  constructor({ title, body } = {}) {
    super(title);
    this.name = 'LastpassError';
    this.title = title;
    this.body = body;
  }
}

export default LastpassError;
