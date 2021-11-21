import * as Preserve from "@truffle/preserve";
import CID from "cids";

export interface Test {
  name: string;
  target: Preserve.Target;
  events: (Preserve.Control.Event & any)[];
}

const happyPathEvents = [
  {
    type: "begin",
    scope: ["@truffle/preserve-to-filecoin"]
  },
  {
    type: "update",
    message: "Preserving to Filecoin...",
    scope: ["@truffle/preserve-to-filecoin"]
  },
  {
    type: "step",
    message: "Connecting to Filecoin node at http://localhost:7777/rpc/v0...",
    scope: [
      "@truffle/preserve-to-filecoin",
      "Connecting to Filecoin node at http://localhost:7777/rpc/v0..."
    ]
  },
  {
    type: "succeed",
    result: expect.any(String),
    message: "Connected to Filecoin node at http://localhost:7777/rpc/v0",
    scope: [
      "@truffle/preserve-to-filecoin",
      "Connecting to Filecoin node at http://localhost:7777/rpc/v0..."
    ]
  },
  {
    type: "step",
    message: "Retrieving miners...",
    scope: ["@truffle/preserve-to-filecoin", "Retrieving miners..."]
  },
  {
    type: "succeed",
    result: ["t01000"],
    scope: ["@truffle/preserve-to-filecoin", "Retrieving miners..."]
  },
  {
    type: "step",
    message: "Proposing storage deal...",
    scope: ["@truffle/preserve-to-filecoin", "Proposing storage deal..."]
  },
  {
    type: "declare",
    message: "Deal CID",
    scope: [
      "@truffle/preserve-to-filecoin",
      "Proposing storage deal...",
      "Deal CID"
    ]
  },
  {
    type: "resolve",
    payload: expect.any(String),
    resolution: expect.any(CID),
    scope: [
      "@truffle/preserve-to-filecoin",
      "Proposing storage deal...",
      "Deal CID"
    ]
  },
  {
    type: "succeed",
    scope: ["@truffle/preserve-to-filecoin", "Proposing storage deal..."]
  },
  {
    type: "step",
    message: "Waiting for deal to finish...",
    scope: ["@truffle/preserve-to-filecoin", "Waiting for deal to finish..."]
  },
  {
    type: "declare",
    message: "Deal State",
    scope: [
      "@truffle/preserve-to-filecoin",
      "Waiting for deal to finish...",
      "Deal State"
    ]
  },
  // There could be more than one update in here when using Lotus,
  // but for Ganache there should only be one.
  {
    type: "update",
    payload: "StorageDealActive",
    scope: [
      "@truffle/preserve-to-filecoin",
      "Waiting for deal to finish...",
      "Deal State"
    ]
  },
  {
    type: "resolve",
    resolution: "StorageDealActive",
    payload: "StorageDealActive",
    scope: [
      "@truffle/preserve-to-filecoin",
      "Waiting for deal to finish...",
      "Deal State"
    ]
  },
  {
    type: "succeed",
    scope: ["@truffle/preserve-to-filecoin", "Waiting for deal to finish..."]
  },
  {
    type: "succeed",
    result: { "filecoin-deal-cid": expect.any(CID) },
    scope: ["@truffle/preserve-to-filecoin"]
  }
];

export const tests: Test[] = [
  // Not supported yet!
  // {
  //   name: "single-source",
  //   target: {
  //     source: "a"
  //   }
  // },
  {
    name: "two-sources",
    target: {
      source: {
        entries: [
          {
            path: "a",
            source: "a"
          },
          {
            path: "b",
            source: "b"
          }
        ]
      }
    },
    events: happyPathEvents
  },
  {
    name: "wrapper-directory",
    target: {
      source: {
        entries: [
          {
            path: "directory",
            source: {
              entries: [
                {
                  path: "a",
                  source: "a"
                },
                {
                  path: "b",
                  source: "b"
                }
              ]
            }
          }
        ]
      }
    },
    events: happyPathEvents
  },
  {
    // foo/
    //  a/
    //   1
    //   2
    //  b/
    //   3
    //   4
    // bar/
    //  5
    name: "nested-directories",
    target: {
      source: {
        entries: [
          {
            path: "a",
            source: {
              entries: [
                {
                  path: "a",
                  source: "a/a"
                },
                {
                  path: "b",
                  source: "a/b"
                }
              ]
            }
          },
          {
            path: "b",
            source: "b"
          }
        ]
      }
    },
    events: happyPathEvents
  }
];
