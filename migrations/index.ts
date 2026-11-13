import * as migration_20261113_193709_initial from './20261113_193709_initial';
import * as migration_20261113_222758_s3_storage_fields from './20261113_222758_s3_storage_fields';

export const migrations = [
  {
    up: migration_20261113_193709_initial.up,
    down: migration_20261113_193709_initial.down,
    name: '20261113_193709_initial',
  },
  {
    up: migration_20261113_222758_s3_storage_fields.up,
    down: migration_20261113_222758_s3_storage_fields.down,
    name: '20261113_222758_s3_storage_fields'
  },
];
