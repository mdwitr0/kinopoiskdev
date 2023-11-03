type Sort = { [key: string]: 1 | -1 };

export class SortBuilder {
  private sort: Sort = {};

  public build(keys: string[], directions: string[]) {
    if (!keys?.length) return this.sort;

    for (let i = 0; i < keys.length; i++) {
      this.sort[keys[i]] = directions[i] === '1' ? 1 : -1;
    }

    return this.sort;
  }
}
