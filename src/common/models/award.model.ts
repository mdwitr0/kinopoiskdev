import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class NomitationAward {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  year: number;
}

export class Nomination {
  @ApiProperty()
  @Prop()
  award: NomitationAward;

  @ApiProperty()
  @Prop()
  title: string;
}

export class Award {
  @ApiProperty({ type: () => Nomination })
  @Prop()
  nomination: Nomination;

  @ApiProperty()
  @Prop()
  winning: boolean;
}
