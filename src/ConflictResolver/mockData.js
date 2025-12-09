export const conflictResponse = {
  status: 'conflicted',
  sessionId: 'sess_4',
  conflictsCount: 5,
  conflicts: [
    {
      id: 'conf-1',
      path: '/blocksById/VrWjp41wgP/config/executionStrategy',
      current: 'or',
      incoming: 'xor',
      kind: 'scalar',
    },
    {
      id: 'conf-2',
      path:
        '/blocksById/UbZSRc1bVM/_relationsById/f0da4882-2a78-4a77-ad1d-63801be6523b/expression',
      current: 'hasError()',
      incoming: 'isSuccess() && cacheHit()',
      kind: 'scalar',
    },
    {
      id: 'conf-3',
      path: '/blocksById/tZza1QbtkY/config/headers',
      current: {
        HeadersKey: 't-5678',
      },
      incoming: {
        HeadersKey: 'i-9999',
      },
      kind: 'object',
    },
    {
      id: 'conf-4',
      path: '/blocksById/T4-9HLTIyg/config/script',
      current: '{\n  "name": "vk-target",\n  "v": 2\n}',
      incoming: '{\n  "name": "vk-incoming",\n  "v": 3\n}',
      kind: 'script',
    },
    {
      id: 'conf-5',
      path: '/blocksById/hY17brBpyq/config/script',
      current:
        'import dao from "neo/dao";\nimport logger from "neo/logger";\n// TARGET SCRIPT...\n',
      incoming:
        'import dao from "neo/dao";\nimport logger from "neo/logger";\n// INCOMING SCRIPT...\n',
      kind: 'script',
    },
  ],
  workingObject: {
    ruleId: 'demo-rule-1',
    method: 'GET',
    url: 'BlackOps7',
    isLive: false,
    status: 'DRAFT',

    // 🔹 blocks: array form (like your real API)
    blocks: [
      {
        nodeId: 'VrWjp41wgP',
        name: 'ApiRequest',
        config: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/comments',
          queryParams: {
            QueryParameters: 'abc',
          },
          pathParams: {
            PathParameters: 'xyz',
          },
          headers: {
            Headers: 'fbjrf',
          },
          executionStrategy: '@@CONFLICT{conf-1}@@',
          cachable: true,
          key: 'xyzz',
          ttl: 123,
        },
        position: { x: 142, y: -148 },
        relations: [
          {
            relationId: '87dcad09-2adb-46b6-856c-902f7b7f2167',
            name: 'DpZGMEBvP1',
            expression: 'isSuccess()',
            status: [],
            to: 'UbZSRc1bVM',
          },
        ],
        type: 'ApiRequest',
        source: true,
        blockId: 'VrWjp41wgP',
        _relationsById: {
          '87dcad09-2adb-46b6-856c-902f7b7f2167': {
            relationId: '87dcad09-2adb-46b6-856c-902f7b7f2167',
            name: 'DpZGMEBvP1',
            expression: 'isSuccess()',
            status: [],
            to: 'UbZSRc1bVM',
          },
        },
      },
      {
        nodeId: 'UbZSRc1bVM',
        name: 'CacheManager',
        config: {
          mode: 'Get',
          key: '95c4c740baf34b0',
          executionStrategy: 'and',
        },
        position: { x: 462, y: -148 },
        relations: [
          {
            relationId: 'f0da4882-2a78-4a77-ad1d-63801be6523b',
            name: '8INeQMxapu',
            expression: '@@CONFLICT{conf-2}@@',
            status: [],
            to: 'tZza1QbtkY',
          },
        ],
        type: 'CacheManager',
        source: false,
        blockId: 'UbZSRc1bVM',
        _relationsById: {
          'f0da4882-2a78-4a77-ad1d-63801be6523b': {
            relationId: 'f0da4882-2a78-4a77-ad1d-63801be6523b',
            name: '8INeQMxapu',
            expression: '@@CONFLICT{conf-2}@@',
            status: [],
            to: 'tZza1QbtkY',
          },
        },
      },
      {
        nodeId: 'tZza1QbtkY',
        name: 'Kafka',
        config: {
          topic: 'KafkaTopic',
          msgKey: 'KafkaKey',
          msgValue: '1000',
          headers: '@@CONFLICT{conf-3}@@',
          executionStrategy: 'or',
        },
        position: { x: 782, y: -148 },
        relations: [
          {
            relationId: '3909321b-f77f-4fbf-a0fb-32448f708c08',
            name: 'o1h6-2Fbz8',
            expression: 'isSuccess()',
            status: [],
            to: 'Ck55ocauva',
          },
        ],
        type: 'Kafka',
        source: false,
        blockId: 'tZza1QbtkY',
        _relationsById: {
          '3909321b-f77f-4fbf-a0fb-32448f708c08': {
            relationId: '3909321b-f77f-4fbf-a0fb-32448f708c08',
            name: 'o1h6-2Fbz8',
            expression: 'isSuccess()',
            status: [],
            to: 'Ck55ocauva',
          },
        },
      },
      {
        nodeId: 'T4-9HLTIyg',
        name: 'Schema',
        config: {
          script: '@@CONFLICT{conf-4}@@',
          executionStrategy: 'and',
        },
        position: { x: 2062, y: -148 },
        relations: [
          {
            relationId: 'f180f8f0-2799-4df1-8f59-03be73a2eb41',
            name: 'gK0kh0LPo2',
            expression: 'isSuccess()',
            status: [],
            to: '8uAnTSqMki',
          },
        ],
        type: 'Schema',
        source: false,
        blockId: 'T4-9HLTIyg',
        _relationsById: {
          'f180f8f0-2799-4df1-8f59-03be73a2eb41': {
            relationId: 'f180f8f0-2799-4df1-8f59-03be73a2eb41',
            name: 'gK0kh0LPo2',
            expression: 'isSuccess()',
            status: [],
            to: '8uAnTSqMki',
          },
        },
      },
      {
        nodeId: 'hY17brBpyq',
        name: 'Script',
        config: {
          script: '@@CONFLICT{conf-5}@@',
          executionStrategy: 'and',
        },
        position: { x: 4622, y: -148 },
        relations: [],
        type: 'Script',
        source: false,
        blockId: 'hY17brBpyq',
        _relationsById: {},
      },
    ],

    // 🔹 blocksById: object form (what the resolver logic uses)
    blocksById: {
      VrWjp41wgP: {
        nodeId: 'VrWjp41wgP',
        name: 'ApiRequest',
        config: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/comments',
          queryParams: {
            QueryParameters: 'abc',
          },
          pathParams: {
            PathParameters: 'xyz',
          },
          headers: {
            Headers: 'fbjrf',
          },
          executionStrategy: '@@CONFLICT{conf-1}@@',
          cachable: true,
          key: 'xyzz',
          ttl: 123,
        },
        position: { x: 142, y: -148 },
        relations: [
          {
            relationId: '87dcad09-2adb-46b6-856c-902f7b7f2167',
            name: 'DpZGMEBvP1',
            expression: 'isSuccess()',
            status: [],
            to: 'UbZSRc1bVM',
          },
        ],
        type: 'ApiRequest',
        source: true,
        blockId: 'VrWjp41wgP',
        _relationsById: {
          '87dcad09-2adb-46b6-856c-902f7b7f2167': {
            relationId: '87dcad09-2adb-46b6-856c-902f7b7f2167',
            name: 'DpZGMEBvP1',
            expression: 'isSuccess()',
            status: [],
            to: 'UbZSRc1bVM',
          },
        },
      },
      UbZSRc1bVM: {
        nodeId: 'UbZSRc1bVM',
        name: 'CacheManager',
        config: {
          mode: 'Get',
          key: '95c4c740baf34b0',
          executionStrategy: 'and',
        },
        position: { x: 462, y: -148 },
        relations: [
          {
            relationId: 'f0da4882-2a78-4a77-ad1d-63801be6523b',
            name: '8INeQMxapu',
            expression: '@@CONFLICT{conf-2}@@',
            status: [],
            to: 'tZza1QbtkY',
          },
        ],
        type: 'CacheManager',
        source: false,
        blockId: 'UbZSRc1bVM',
        _relationsById: {
          'f0da4882-2a78-4a77-ad1d-63801be6523b': {
            relationId: 'f0da4882-2a78-4a77-ad1d-63801be6523b',
            name: '8INeQMxapu',
            expression: '@@CONFLICT{conf-2}@@',
            status: [],
            to: 'tZza1QbtkY',
          },
        },
      },
      tZza1QbtkY: {
        nodeId: 'tZza1QbtkY',
        name: 'Kafka',
        config: {
          topic: 'KafkaTopic',
          msgKey: 'KafkaKey',
          msgValue: '1000',
          headers: '@@CONFLICT{conf-3}@@',
          executionStrategy: 'or',
        },
        position: { x: 782, y: -148 },
        relations: [
          {
            relationId: '3909321b-f77f-4fbf-a0fb-32448f708c08',
            name: 'o1h6-2Fbz8',
            expression: 'isSuccess()',
            status: [],
            to: 'Ck55ocauva',
          },
        ],
        type: 'Kafka',
        source: false,
        blockId: 'tZza1QbtkY',
        _relationsById: {
          '3909321b-f77f-4fbf-a0fb-32448f708c08': {
            relationId: '3909321b-f77f-4fbf-a0fb-32448f708c08',
            name: 'o1h6-2Fbz8',
            expression: 'isSuccess()',
            status: [],
            to: 'Ck55ocauva',
          },
        },
      },
      'T4-9HLTIyg': {
        nodeId: 'T4-9HLTIyg',
        name: 'Schema',
        config: {
          script: '@@CONFLICT{conf-4}@@',
          executionStrategy: 'and',
        },
        position: { x: 2062, y: -148 },
        relations: [
          {
            relationId: 'f180f8f0-2799-4df1-8f59-03be73a2eb41',
            name: 'gK0kh0LPo2',
            expression: 'isSuccess()',
            status: [],
            to: '8uAnTSqMki',
          },
        ],
        type: 'Schema',
        source: false,
        blockId: 'T4-9HLTIyg',
        _relationsById: {
          'f180f8f0-2799-4df1-8f59-03be73a2eb41': {
            relationId: 'f180f8f0-2799-4df1-8f59-03be73a2eb41',
            name: 'gK0kh0LPo2',
            expression: 'isSuccess()',
            status: [],
            to: '8uAnTSqMki',
          },
        },
      },
      hY17brBpyq: {
        nodeId: 'hY17brBpyq',
        name: 'Script',
        config: {
          script: '@@CONFLICT{conf-5}@@',
          executionStrategy: 'and',
        },
        position: { x: 4622, y: -148 },
        relations: [],
        type: 'Script',
        source: false,
        blockId: 'hY17brBpyq',
        _relationsById: {},
      },
    },
  },
};

