import * as migration_20261113_193709_initial from './20261113_193709_initial';

export const migrations = [
  {
    up: migration_20261113_193709_initial.up,
    down: migration_20261113_193709_initial.down,
    name: '20261113_193709_initial'
  },
];
