import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { UsersBase, User } from './entities';

const options: Options = {
  type: 'mongo',
  entities: [User, UsersBase],
  dbName: 'Users',
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;