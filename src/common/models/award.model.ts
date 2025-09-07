import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ApiNullableProperty } from '../decorators/api-nullable-property.decorator';

export class NominationAward {
  @ApiNullableProperty()
  @Prop()
  title: string;

  @ApiNullableProperty()
  @Prop({ index: true })
  year: number;
}

export class Nomination {
  @ApiNullableProperty({ type: () => NominationAward })
  @Prop()
  award: NominationAward;

  @ApiNullableProperty()
  @Prop()
  title: string;
}

export class Award {
  @ApiNullableProperty({ type: () => Nomination })
  @Prop()
  nomination: Nomination;

  @ApiNullableProperty({ type: () => Boolean })
  @Prop()
  winning: boolean;

  @ApiNullableProperty()
  @Prop({ index: true })
  updatedAt: Date;
  @ApiNullableProperty()
  @Prop({ index: true })
  createdAt: Date;
}
