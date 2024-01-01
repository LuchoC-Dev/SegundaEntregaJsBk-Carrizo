class ResponseStatus {
  static make(data) {
    return {
      status: 'Success',
      message: 'Datos obtenidos con exito',
      totalDocs: data.totalDocs,
      totalPages: data.totalPages,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.prevLink,
      nextLink: data.nextLink,
      payload: data.docs,
    };
  }
  static error(error) {
    return {
      status: 'Error',
      message: error,
      payload: null,
      totalPages: null,
      prevPage: null,
      nextPage: null,
      page: null,
      hasPrevPage: null,
      hasNextPage: null,
      prevLink: null,
      nextLink: null,
    };
  }
}

export default ResponseStatus;
