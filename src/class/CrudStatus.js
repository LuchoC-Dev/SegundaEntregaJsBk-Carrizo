class CrudStatus {
  static make(req, res, message) {
    return {
      status: 'success',
      message: message,
      req: req,
      res: res,
    };
  }
  static error(req, error) {
    return {
      status: 'error',
      message: error,
      req: req,
    };
  }
}

export default CrudStatus;
