/*export const conflictResponse = {
  status: 'conflicted',
  sessionId: 'sess_4',
  conflictsCount: 5,
  conflicts: [
    {
      id: 'conf-1',
      path: '/_blocksByName/VrWjp41wgP/config/executionStrategy',
      current: 'or',
      incoming: 'xor',
      kind: 'scalar',
    },
    {
      id: 'conf-2',
      path:
        '/_blocksByName/UbZSRc1bVM/_relationsByName/f0da4882-2a78-4a77-ad1d-63801be6523b/expression',
      current: 'hasError()',
      incoming: 'isSuccess() && cacheHit()',
      kind: 'scalar',
    },
    {
      id: 'conf-3',
      path: '/_blocksByName/tZza1QbtkY/config/headers',
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
      path: '/_blocksByName/T4-9HLTIyg/config/script',
      current: '{\n  "name": "vk-target",\n  "v": 2\n}',
      incoming: '{\n  "name": "vk-incoming",\n  "v": 3\n}',
      kind: 'script',
    },
    {
      id: 'conf-5',
      path: '/_blocksByName/hY17brBpyq/config/script',
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
        _relationsByName: {
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
        _relationsByName: {
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
        _relationsByName: {
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
        _relationsByName: {
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
        _relationsByName: {},
      },
    ],

    // 🔹 _blocksByName: object form (what the resolver logic uses)
    _blocksByName: {
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
        _relationsByName: {
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
        _relationsByName: {
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
        _relationsByName: {
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
        _relationsByName: {
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
        _relationsByName: {},
      },
    },
  },
};*/

/*export const conflictResponse = {
  "applyEventId": "ae_5",
  "status": "conflicted",
  "sessionId": "sess_4",
  "conflictsCount": 4,
  "conflicts": [
    {
      "id": "conf-1",
      "path": "/_blocksByName/74183d3c-8b96-43bb-a375-eab5f73a75ac/name",
      "current": "clientSecretResponse-edited-target",
      "incoming": "clientSecretResponse-edited",
      "kind": "scalar"
    },
    {
      "id": "conf-2",
      "path": "/_blocksByName/74183d3c-8b96-43bb-a375-eab5f73a75ac/config/script",
      "current": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        return {};\n\n    }\n}\n\nexport {\n    script as default\n}",
      "incoming": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const clientKey = await getValueByKey('nd_org_oauth_client_key');\n        const clientSecret = await getValueByKey('nd_org_oauth_client_secret');\n        logger.info('Retrieved OAuth credentials');\n        return {\n            clientKey: clientKey,\n            clientSecret: clientSecret,\n            timestamp: Date.now()\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
      "kind": "script"
    },
    {
      "id": "conf-3",
      "path": "/_blocksByName/c220b66b-5206-4e10-905e-eef483d1accd/name",
      "current": "oAuthResponse-1234",
      "incoming": "oAuthResponse-stashed",
      "kind": "scalar"
    },
    {
      "id": "conf-4",
      "path": "/_blocksByName/c220b66b-5206-4e10-905e-eef483d1accd/_relationsByName/5dbd3189-9141-41ef-be1c-d55d513aee16",
      "current": {
        "relationId": "5dbd3189-9141-41ef-be1c-d55d513aee16",
        "name": "xYzAbC123",
        "expression": "isSuccess()",
        "status": [],
        "to": "QwErTy456"
      },
      "incoming": {
        "relationId": "5dbd3189-9141-41ef-be1c-d55d513aee16",
        "name": "xYzAbC123",
        "expression": "isSuccess()&& false",
        "status": [],
        "to": "QwErTy456"
      },
      "kind": "object"
    }
  ],
  "workingObject": {
    "ruleId": "072bd99f-2456-4416-b169-208db032d55f",
    "useOriginal": true,
    "blocks": [
      {
        "nodeId": "84LBD4SzWg",
        "blockId": "d592c178-70c6-40e9-bc2d-0e1ed0db05fe",
        "name": "getAuthPrefAndSecrets",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n    execute: async () => {\n        const authPref = await getValueByKey('nd_org_auth_preference');        \n        if (authPref === 'basic') {\n            return 'basic auth flow detected';\n        } else if (authPref === 'oauth') {\n            throw new Error('oauth auth flow detected');\n        } else {\n            throw new Error('unknown auth preference');\n        }\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": false
        },
        "position": {
          "x": 310.5,
          "y": -55
        },
        "relations": [
          {
            "relationId": "0c1abd5f-b51b-4463-a8ca-bcbe188433f5",
            "name": "NxDVEANvsD",
            "expression": "hasError()",
            "status": [],
            "to": "MrmEknPvxc"
          },
          {
            "relationId": "4b99874b-4200-46a2-8c71-e328757e8c65",
            "name": "wySvfb020v",
            "expression": "isSuccess()",
            "status": [],
            "to": "ciPlbaJKf4"
          }
        ],
        "type": "Script",
        "source": true
      },
      {
        "nodeId": "MrmEknPvxc",
        "blockId": "74183d3c-8b96-43bb-a375-eab5f73a75ac",
        "name": "@@CONFLICT{conf-1}@@",
        "config": {
          "script": "@@CONFLICT{conf-2}@@",
          "executionStrategy": "and",
          "cachable": true,
          "key": "oauth_client_creds",
          "ttl": 3600
        },
        "position": {
          "x": 604.5,
          "y": 33
        },
        "relations": [
          {
            "relationId": "89ab3496-62ce-433c-96bb-204e7da92c2c",
            "name": "7ZKEPGX0y1",
            "expression": "isSuccess()",
            "status": [],
            "to": "fwZ87DeYaD"
          }
        ],
        "type": "Script",
        "source": false
      },
      {
        "nodeId": "ciPlbaJKf4",
        "blockId": "51b55ed0-737a-4fe4-aeb7-44c742db757c",
        "name": "basicResponse",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const orgId = getEffectiveHeaders()?.['x-cap-api-auth-org-id'];\n        return {\n            authPref: await getValueByKey('nd_org_auth_preference'),\n            token: await getValueByKey('nd_org_basic_auth_token'),\n            orgId: orgId,\n            source: 'basic_auth_flow'\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": true,
          "key": "neo_debugger_org_auth_preference",
          "ttl": 120000
        },
        "position": {
          "x": 590.5,
          "y": -158
        },
        "relations": [],
        "type": "Script",
        "source": false
      },
      {
        "nodeId": "vJYwypzwIG",
        "blockId": "c220b66b-5206-4e10-905e-eef483d1accd",
        "name": "@@CONFLICT{conf-3}@@",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const oauthToken = getBody(\"getOauthToken\")?.data?.accessToken;\n        const orgId = getEffectiveHeaders()?.['x-cap-api-auth-org-id'];\n        return {\n            orgId: orgId,\n            authPref: await getValueByKey('nd_org_auth_preference'),\n            token: oauthToken,\n            expiresIn: getBody(\"getOauthToken\")?.data?.expiresIn || 3600\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": true,
          "key": "neo_debugger_org_auth_preference",
          "ttl": 120000
        },
        "position": {
          "x": 1139.5,
          "y": 28
        },
        "relations": [
          "@@CONFLICT{conf-4}@@"
        ],
        "type": "Script",
        "source": false
      },
      {
        "nodeId": "fwZ87DeYaD",
        "blockId": "c293241e-e5ef-49f5-af53-d9311fc2d5cf",
        "name": "fetchCustomer",
        "config": {
          "method": "GET",
          "url": "https://nightly.api.capillarytech.com/api_gateway/neo/api/v1/configs/getConfig/{configName}/{orgId}",
          "executionStrategy": "and"
        },
        "position": {
          "x": 924.5,
          "y": 193
        },
        "relations": [
          {
            "name": "d_3UKDdO6P",
            "relationId": "33bd6d57-21c4-4e0b-b3fb-c7cb46209385",
            "expression": "isSuccess()",
            "status": [],
            "to": "vJYwypzwIG"
          }
        ],
        "type": "ApiRequest",
        "source": false
      },
      {
        "nodeId": "QwErTy456",
        "blockId": "df6de638-ae4b-49c6-b304-e44183036ba8",
        "name": "validateToken",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const token = getBody(\"oAuthResponse\")?.token;\n        if (!token) {\n            throw new Error('Token validation failed: no token found');\n        }\n        return {\n            valid: true,\n            token: token,\n            validatedAt: Date.now()\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": false
        },
        "position": {
          "x": 1349.5,
          "y": 28
        },
        "type": "Script",
        "source": false,
        "relations": []
      }
    ],
    "method": "GET",
    "url": "base",
    "isLive": false,
    "status": "DRAFT",
    "blockLibraryTypeVersions": {},
    "currentVersion": null,
    "isEditable": true,
    "usePreview": false,
    "previewBlocks": [],
    "previewDagId": null
  }
}
*/

export const conflictResponse = {
  "applyEventId": "ae_5",
  "status": "conflicted",
  "sessionId": "sess_4",
  "conflictsCount": 2,
  "conflicts": [
    {
      "id": "conf-1",
      "path": "/_blocksByName/clientSecretResponse/config/script",
      "current": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        return {};\n\n    }\n}\n\nexport {\n    script as default\n}",
      "incoming": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const clientKey = await getValueByKey('nd_org_oauth_client_key');\n        const clientSecret = await getValueByKey('nd_org_oauth_client_secret');\n        logger.info('Retrieved OAuth credentials');\n        return {\n            clientKey: clientKey,\n            clientSecret: clientSecret,\n            timestamp: Date.now()\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
      "kind": "script"
    },
    {
      "id": "conf-2",
      "path": "/_blocksByName/oAuthResponse/_relationsByName/xYzAbC123",
      "current": {
        "name": "xYzAbC123",
        "expression": "isSuccess()",
        "status": [],
        "to": "QwErTy456"
      },
      "incoming": {
        "name": "xYzAbC123",
        "expression": "isSuccess()&& false",
        "status": [],
        "to": "QwErTy456"
      },
      "kind": "object"
    }
  ],
  "workingObject": {
    "ruleId": "072bd99f-2456-4416-b169-208db032d55f",
    "useOriginal": true,
    "blocks": [
      {
        "nodeId": "84LBD4SzWg",
        "name": "getAuthPrefAndSecrets",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n    execute: async () => {\n        const authPref = await getValueByKey('nd_org_auth_preference');        \n        if (authPref === 'basic') {\n            return 'basic auth flow detected';\n        } else if (authPref === 'oauth') {\n            throw new Error('oauth auth flow detected');\n        } else {\n            throw new Error('unknown auth preference');\n        }\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": false
        },
        "position": {
          "x": 310.5,
          "y": -55
        },
        "relations": [
          {
            "name": "NxDVEANvsD",
            "expression": "hasError()",
            "status": [],
            "to": "MrmEknPvxc"
          },
          {
            "name": "wySvfb020v",
            "expression": "isSuccess()",
            "status": [],
            "to": "ciPlbaJKf4"
          }
        ],
        "type": "Script",
        "source": true
      },
      {
        "nodeId": "MrmEknPvxc",
        "name": "clientSecretResponse",
        "config": {
          "script": "@@CONFLICT{conf-1}@@",
          "executionStrategy": "and",
          "cachable": true,
          "key": "oauth_client_creds",
          "ttl": 3600
        },
        "position": {
          "x": 604.5,
          "y": 33
        },
        "relations": [
          {
            "name": "7ZKEPGX0y1",
            "expression": "isSuccess()",
            "status": [],
            "to": "fwZ87DeYaD"
          }
        ],
        "type": "Script",
        "source": false
      },
      {
        "nodeId": "ciPlbaJKf4",
        "name": "basicResponse",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const orgId = getEffectiveHeaders()?.['x-cap-api-auth-org-id'];\n        return {\n            authPref: await getValueByKey('nd_org_auth_preference'),\n            token: await getValueByKey('nd_org_basic_auth_token'),\n            orgId: orgId,\n            source: 'basic_auth_flow'\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": true,
          "key": "neo_debugger_org_auth_preference",
          "ttl": 120000
        },
        "position": {
          "x": 590.5,
          "y": -158
        },
        "relations": [],
        "type": "Script",
        "source": false
      },
      {
        "nodeId": "vJYwypzwIG",
        "name": "oAuthResponse",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const oauthToken = getBody(\"getOauthToken\")?.data?.accessToken;\n        const orgId = getEffectiveHeaders()?.['x-cap-api-auth-org-id'];\n        return {\n            orgId: orgId,\n            authPref: await getValueByKey('nd_org_auth_preference'),\n            token: oauthToken,\n            expiresIn: getBody(\"getOauthToken\")?.data?.expiresIn || 3600\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": true,
          "key": "neo_debugger_org_auth_preference",
          "ttl": 120000
        },
        "position": {
          "x": 1139.5,
          "y": 28
        },
        "relations": [
          "@@CONFLICT{conf-2}@@"
        ],
        "type": "Script",
        "source": false
      },
      {
        "nodeId": "fwZ87DeYaD",
        "name": "fetchCustomer",
        "config": {
          "method": "GET",
          "url": "https://nightly.api.capillarytech.com/api_gateway/neo/api/v1/configs/getConfig/{configName}/{orgId}",
          "executionStrategy": "and"
        },
        "position": {
          "x": 924.5,
          "y": 193
        },
        "relations": [
          {
            "name": "d_3UKDdO6P",
            "expression": "isSuccess()",
            "status": [],
            "to": "vJYwypzwIG"
          }
        ],
        "type": "ApiRequest",
        "source": false
      },
      {
        "nodeId": "QwErTy456",
        "name": "validateToken",
        "config": {
          "script": "import dao from \"neo/dao\";\nimport logger from \"neo/logger\";\n//These are some dao methods already imported. \n//Other methods on dao you can use by typing `dao.` and editor will suggest few available methods.\nconst {\n    getBody,\n    getEffectiveHeaders,\n    getIn,\n    getApiRequest,\n    getOut,\n    getValueByKey,\n} = dao;\n\n\nconst script = {\n\n    execute: async () => {\n        const token = getBody(\"oAuthResponse\")?.token;\n        if (!token) {\n            throw new Error('Token validation failed: no token found');\n        }\n        return {\n            valid: true,\n            token: token,\n            validatedAt: Date.now()\n        };\n\n    }\n}\n\nexport {\n    script as default\n}",
          "executionStrategy": "and",
          "cachable": false
        },
        "position": {
          "x": 1349.5,
          "y": 28
        },
        "type": "Script",
        "source": false,
        "relations": []
      }
    ],
    "method": "GET",
    "url": "base",
    "isLive": false,
    "status": "DRAFT",
    "blockLibraryTypeVersions": {},
    "currentVersion": null,
    "isEditable": true,
    "usePreview": false,
    "previewBlocks": [],
    "previewDagId": null
  }
}