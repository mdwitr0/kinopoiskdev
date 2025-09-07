export type Pagination = { [key: string]: any };

export class PaginationBuilder {
  private skip = 0;

  public build(page: number, limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    this.skip = (page - 1) * limit;

    return { limit: limit, skip: this.skip };
  }
}
