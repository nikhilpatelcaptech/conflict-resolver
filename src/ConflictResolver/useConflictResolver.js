// src/ConflictResolver/useConflictResolver.js
import { useState, useMemo } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

function pointerToSegments(pointer) {
  if (!pointer) return [];
  return pointer.split('/').filter(Boolean);
}

/**
 * Apply a value at a JSON-pointer-like path onto both:
 *  - workingDraft.blocksById.<blockId>...
 *  - workingDraft.blocks[blockIndex]...
 */
// function applyValueAtPointer(draft, pointer, value) {
//   const segments = pointerToSegments(pointer);
//   if (segments.length === 0) return;

//   // Apply to the path exactly as in the pointer
//   const fullPath = segments.join('.');
//   set(draft, fullPath, value);

//   // If path starts with /blocksById/<blockId>/..., mirror into blocks[]
//   if (segments[0] === 'blocksById' && segments.length > 2 && Array.isArray(draft.blocks)) {
//     const blockId = segments[1];
//     const restPath = segments.slice(2).join('.');

//     const idx = draft.blocks.findIndex(
//       (b) => b.blockId === blockId || b.nodeId === blockId
//     );

//     if (idx !== -1) {
//       set(draft.blocks[idx], restPath, value);
//     }
//   }
// }
function applyValueAtPointer(draft, pointer, value) {
  const segments = pointerToSegments(pointer);
  if (segments.length === 0) return;

  // 1️⃣ Apply to the exact path (works for all conflicts)
  const fullPath = segments.join('.');
  set(draft, fullPath, value);

  // 2️⃣ Mirror /blocksById/<blockId>/... into blocks[]
  if (segments[0] === 'blocksById' && segments.length > 2 && Array.isArray(draft.blocks)) {
    const blockId = segments[1];
    const restPath = segments.slice(2).join('.');

    const idx = draft.blocks.findIndex(
      (b) => b.blockId === blockId || b.nodeId === blockId
    );

    if (idx !== -1) {
      set(draft.blocks[idx], restPath, value);
    }
  }

  // 3️⃣ SPECIAL CASE: relation conflicts under _relationsById
  //
  // Path shape: /blocksById/<blockId>/_relationsById/<relationId>/...field...
  if (
    segments[0] === 'blocksById' &&
    segments[2] === '_relationsById' &&
    segments.length >= 5
  ) {
    const blockId = segments[1];
    const relationId = segments[3];
    const fieldPathFromRelation = segments.slice(4).join('.'); // e.g. "expression"

    // 3a) Update blocksById.<blockId>.relations[]
    const blockById =
      draft.blocksById && draft.blocksById[blockId]
        ? draft.blocksById[blockId]
        : null;

    if (blockById && Array.isArray(blockById.relations)) {
      const rel = blockById.relations.find(
        (r) => r.relationId === relationId
      );
      if (rel) {
        set(rel, fieldPathFromRelation, value);
      }
    }

    // 3b) Update blocks[].relations[]
    if (Array.isArray(draft.blocks)) {
      const idx = draft.blocks.findIndex(
        (b) => b.blockId === blockId || b.nodeId === blockId
      );
      if (idx !== -1) {
        const block = draft.blocks[idx];
        if (block && Array.isArray(block.relations)) {
          const rel = block.relations.find(
            (r) => r.relationId === relationId
          );
          if (rel) {
            set(rel, fieldPathFromRelation, value);
          }
        }
      }
    }
  }
}


export default function useConflictResolver(data) {
  const [workingDraft, setWorkingDraft] = useState(() =>
    cloneDeep(data.workingObject)
  );

  const [resolutions, setResolutions] = useState({});

  const conflicts = data.conflicts || [];

  const conflictById = useMemo(() => {
    const map = {};
    conflicts.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [conflicts]);

  const applyResolution = (id, choice, customValue) => {
    const conflict = conflictById[id];
    if (!conflict) return;

    let resolvedValue;
    if (choice === 'current') {
      resolvedValue = conflict.current;
    } else if (choice === 'incoming') {
      resolvedValue = conflict.incoming;
    } else if (choice === 'custom') {
      resolvedValue = customValue;
    } else {
      return;
    }

    // remember resolution choice
    setResolutions((prev) => ({
      ...prev,
      [id]: { choice, value: resolvedValue },
    }));

    // update workingDraft (both blocksById & blocks[])
    setWorkingDraft((prev) => {
      const draft = cloneDeep(prev);
      applyValueAtPointer(draft, conflict.path, resolvedValue);
      return draft;
    });
  };

  const isResolved = (id) => !!resolutions[id];

  const allResolved =
    conflicts.length > 0 && conflicts.every((c) => !!resolutions[c.id]);

  return {
    workingDraft,
    conflicts,
    applyResolution,
    isResolved,
    allResolved,
  };
}
