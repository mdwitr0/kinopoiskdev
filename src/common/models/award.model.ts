import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class NominationAward {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  year: number;
}

export class Nomination {
  @ApiProperty({ type: () => NominationAward })
  @Prop()
  award: NominationAward;

  @ApiProperty()
  @Prop()
  title: string;
}

export class Award {
  @ApiProperty({ type: () => Nomination })
  @Prop()
  nomination: Nomination;

  @ApiProperty({ type: () => Boolean })
  @Prop()
  winning: boolean;

  @ApiProperty()
  @Prop()
  updatedAt: Date;
  @ApiProperty()
  @Prop()
  createdAt: Date;
}
