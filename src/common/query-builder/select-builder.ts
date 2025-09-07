export type Select = { [key: string]: 1 };

export class SelectBuilder {
  private select: Select = {};

  public build(keys: string[], defaultSelect?: string[]): Select {
    if (!keys?.length && defaultSelect?.length) keys = defaultSelect;
    if (!keys?.length) return this.select;

    for (const key of keys) {
      if (key) this.select[key] = 1;
    }

    return this.select;
  }
}
