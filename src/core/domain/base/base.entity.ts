interface IdAutoIncrement {
  id?: number;
}

interface CreateUpdateTimeStampAt {
  createdAt?: Date;
  updatedAt?: Date;
}

interface DeleteTimeStampAt {
  deletedAt?: Date;
}

export class EntityWithIdAndTimeStamp
  implements IdAutoIncrement, CreateUpdateTimeStampAt, DeleteTimeStampAt
{
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
