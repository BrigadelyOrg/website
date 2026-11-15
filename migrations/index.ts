import * as migration_20261113_193709_initial from './20261113_193709_initial';
import * as migration_20261113_222758_s3_storage_fields from './20261113_222758_s3_storage_fields';
import * as migration_20261114_195321_glossary from './20261114_195321_glossary';
import * as migration_20261115_124626_article_features from './20261115_124626_article_features';

export const migrations = [
  {
    up: migration_20261113_193709_initial.up,
    down: migration_20261113_193709_initial.down,
    name: '20261113_193709_initial',
  },
  {
    up: migration_20261113_222758_s3_storage_fields.up,
    down: migration_20261113_222758_s3_storage_fields.down,
    name: '20261113_222758_s3_storage_fields',
  },
  {
    up: migration_20261114_195321_glossary.up,
    down: migration_20261114_195321_glossary.down,
    name: '20261114_195321_glossary',
  },
  {
    up: migration_20261115_124626_article_features.up,
    down: migration_20261115_124626_article_features.down,
    name: '20261115_124626_article_features'
  },
];
